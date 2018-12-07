// Model <- View : reads
// Model <- Controller : updates
// View -> Controller : writes/manipulates
// Controller --> View : notifies/warns of changes (events)
// User -> View : sees
// User -> Controller : uses

//
//     A  B  C  D  E  F  G  H  I
//     |  |  |  |  |  |  |  |  |
//      6\    7\    8\    9\
// 5\  __    __    __    __    __
//    /A5\__/C6\__/E7\__/G8\__/I9\__
// 4\ \__/B5\__/D6\__/F7\__/H8\__/  
//    /A4\__/C5\__/E6\__/G7\__/I8\__
// 3\ \__/B4\__/D5\__/F6\__/H5\__/  
//    /A3\__/C4\__/E5\__/G6\__/I7\__
// 2\ \__/B3\__/D4\__/F5\__/H6\__/  
//    /A2\__/C3\__/E4\__/G5\__/I6\__
// 1\ \__/B2\__/D3\__/E5\__/H5\__/  
//    /A1\__/C2\__/E3\__/G6\__/I5\__
//    \__/  \__/  \__/  \__/  \__/  

// Neighbors of [LETTER/NUMBER] are [LETTER/NUMBER+1], [LETTER+1/NUMBER+1], [LETTER+1/NUMBER], [LETTER/NUMBER-1], [LETTER-1/NUMBER-1], [LETTER-1/NUMBER]
// - North neighbor delta is [0,+1]
// - North East neighbor delta is [+1,+1]
// - South East neighbor delta is [+1,0]
// - South neighbor delta is [0,-1]
// - South West neighbor delta is [-1,-1]
// - North West neighbor delta is [-1,0]

//      A  B  C  D  E  F  G  H  I
//      |  |  |  |  |  |  |  |  |
//
//     +--+--+--+--+--+--+--+--+--+
// 9-  |  |  |  |  |  |  |  |  |I9|
//     +--+--+--+--+--+--+--+--+--+
// 8-  |  |  |  |  |  |  |G8|H8|I8|
//     +--+--+--+--+--+--+--+--+--+
// 7-  |  |  |  |  |E7|F7|G7|H7|I7|
//     +--+--+--+--+--+--+--+--+--+
// 6-  |  |  |C6|D6|E6|F6|G6|H6|I6|
//     +--+--+--+--+--+--+--+--+--+
// 5-  |A5|B5|C5|D5|E5|F5|G5|H5|I5|
//     +--+--+--+--+--+--+--+--+--+
// 4-  |A4|B4|C4|D4|E4|F4|G4|  |  |
//     +--+--+--+--+--+--+--+--+--+
// 3-  |A3|B3|C3|D3|E3|  |  |  |  |
//     +--+--+--+--+--+--+--+--+--+
// 2-  |A2|B2|C2|  |  |  |  |  |  |
//     +--+--+--+--+--+--+--+--+--+
// 1-  |A1|  |  |  |  |  |  |  |  |
//     +--+--+--+--+--+--+--+--+--+

// Thank to a modulo on row index we can compress the array: (row-1)%5+1

//      A  B  C  D  E  F  G  H  I
//      |  |  |  |  |  |  |  |  |
//
//     +--+--+--+--+--+--+--+--+--+
// 5-  |A5|B5|C5|D5|E5|F5|G5|H5|I5|
//     +--+--+--+--+--+--+--+--+--+
// 4-  |A4|B4|C4|D4|E4|F4|G4|  |I9|
//     +--+--+--+--+--+--+--+--+--+
// 3-  |A3|B3|C3|D3|E3|  |G8|H8|I8|
//     +--+--+--+--+--+--+--+--+--+
// 2-  |A2|B2|C2|  |E7|F7|G7|H7|I7|
//     +--+--+--+--+--+--+--+--+--+
// 1-  |A1|  |C6|D6|E6|F6|G6|H6|I6|
//     +--+--+--+--+--+--+--+--+--+


class CardModel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // hittest(ctx: CanvasRenderingContext2D, x: number, y: number): boolean {
    //     ctx.save();
    //     this.applyTransform(ctx);
    //     var result: boolean = ctx.isPointInPath(Card.path_s, x, y);
    //     ctx.restore();
    //     return result;
    // }

    // click()
    // {
    //     //this.x += 25;
    //     this.turn += 0.25;
    // }
    
    x: number;
    y: number;
    turn: number = 0;
};

class CardView
{
    static StaticInit(ctx: CanvasRenderingContext2D) {
        var path = new Path2D();
        path.arc(-Card.width_s/2 + Card.cornerRadius_s, -Card.height_s/2 + Card.cornerRadius_s, Card.cornerRadius_s, 2 * Math.PI / 2, 3 * Math.PI / 2);
        path.arc(Card.width_s/2 - Card.cornerRadius_s, -Card.height_s/2 + Card.cornerRadius_s, Card.cornerRadius_s, 3 * Math.PI / 2, 0);
        path.arc(Card.width_s/2 - Card.cornerRadius_s, Card.height_s/2 - Card.cornerRadius_s, Card.cornerRadius_s, 4 * Math.PI / 2, Math.PI / 2);
        path.arc(-Card.width_s/2 + Card.cornerRadius_s, Card.height_s/2 - Card.cornerRadius_s, Card.cornerRadius_s, 1 * Math.PI / 2, 2 * Math.PI / 2);
        path.closePath();
        Card.path_s = path;
        
        var gradient : CanvasGradient= ctx.createLinearGradient(0,0,Card.width_s,Card.height_s);
        gradient.addColorStop(0,'rgba(250, 250, 250, 1)');
        gradient.addColorStop(1,'rgba(120, 120, 180, 1)');
        Card.gradient_s = gradient;
    }
    
    draw(ctx: CanvasRenderingContext2D, highlight:boolean) {
        ctx.save();
        this.applyTransform(ctx);
        
        ctx.fillStyle = Card.gradient_s;
        ctx.fill(Card.path_s);
        
        if (highlight)
        {
            ctx.fillStyle = 'rgba(0, 250, 0, 0.5)';
            ctx.fill(Card.path_s);
        }
        
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 2;
        ctx.stroke(Card.path_s);
        
        ctx.restore();
    }

    applyTransform(ctx: CanvasRenderingContext2D)
    {
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.PI*2*this.turn)
    }
    
    static cornerRadius_s: number = 10;
    static width_s: number = 88;
    static height_s: number = 63;
    static path_s: Path2D;
    static gradient_s: CanvasGradient;
    
};

class CardController
{

};

// switch to Model-View-Controller : put draw (path,gradient,cornerRadius,...) out of "CardModel"

class CardCollection {
    constructor() {
        
    }
    
    AddCard(x: number, y: number): Card {
        var card = new Card(x, y);
        this.cards.push(card);
        return card;
    }

    draw(ctx: CanvasRenderingContext2D) : void {
        this.cards.forEach(card => {
            card.draw(ctx, this.selected==card);
        });
    }

    hittest(ctx: CanvasRenderingContext2D, x: number, y: number) : void {
        this.selected = this.cards.slice().reverse().find(card => card.hittest(ctx, x, y));
    }

    cards: Card[] = [];
    selected: Card = null;
};

// Concepts:
// - Slot: a place to snap a card or a pile of cards
// - CardArea: an area for bulk card 
// - Board
// - Deck
// - Draw Pile
// - Discard Pile
// - Hand

/* CANVAS CREATION */

var canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 640;
document.body.appendChild(canvas);

/* MOUSE HANDLING - BEGIN */

var mouse_x: number = null;
var mouse_y: number = null;

// 'mouseup', 'mousedown'
canvas.addEventListener('mousemove', onMouseUpdate, false);
canvas.addEventListener('mouseenter', onMouseUpdate, false);
canvas.addEventListener('click', onMouseClick, false);

function onMouseUpdate(e: MouseEvent) {
    mouse_x = e.offsetX;
    mouse_y = e.offsetY;
}

function onMouseClick(e:MouseEvent) {
    if (cardCollection.selected)
    {
        cardCollection.selected.click();
    }
}

function getMouseX() {
    return mouse_x;
}

function getMouseY() {
    return mouse_y;
}

/* MOUSE HANDLING - END */

var ctx = canvas.getContext("2d");

// eager "static" construction
Card.StaticInit(ctx);

ctx.strokeStyle = 'rgb(200,0,0)';
const width = canvas.width;

const cols_by_row = [4, 5, 6, 7, 6, 5, 4];
const offset_y = (canvas.height + ( 1 - cols_by_row.length ) * Card.height_s) / 2;

var cardCollection = new CardCollection();

for (var row = 0; row < cols_by_row.length; ++row) {
    const cards_by_row = cols_by_row[row];
    const offset_x = (width + ( 1 - cards_by_row ) * Card.width_s) / 2;
    for (var col_into_row = 0; col_into_row < cards_by_row; ++col_into_row) {
        cardCollection.AddCard(offset_x + col_into_row * Card.width_s, offset_y + row * Card.height_s);
    }
}

cardCollection.AddCard(50, 50);
cardCollection.AddCard(54, 54);
cardCollection.AddCard(57, 57);

setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cardCollection.hittest(ctx, mouse_x, mouse_y);
    cardCollection.draw(ctx);
}, 33);


