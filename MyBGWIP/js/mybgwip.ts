class Card {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static makePath() {
        var path = new Path2D();
        path.arc(Card.radius, Card.radius, Card.radius, 2 * Math.PI / 2, 3 * Math.PI / 2);
        path.arc(Card.width - Card.radius, Card.radius, Card.radius, 3 * Math.PI / 2, 0);
        path.arc(Card.width - Card.radius, Card.height - Card.radius, Card.radius, 4 * Math.PI / 2, Math.PI / 2);
        path.arc(Card.radius, Card.height - Card.radius, Card.radius, 1 * Math.PI / 2, 2 * Math.PI / 2);
        path.closePath();

        Card.path_s = path;
    }

    draw(ctx: CanvasRenderingContext2D, selected:boolean) {
        ctx.save();
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 2;
        if (selected)
            ctx.fillStyle = 'rgba(0, 250, 0, 1)';
        else
            ctx.fillStyle = 'rgba(250, 250, 250, 1)';

        ctx.translate(this.x, this.y);

        ctx.fill(Card.path_s);
        ctx.stroke(Card.path_s);

        ctx.restore();
    }

    hittest(ctx: CanvasRenderingContext2D, x: number, y: number): boolean {
        var result: boolean = ctx.isPointInPath(Card.path_s, x - this.x, y - this.y);
        return result;
    }

    static radius: number = 10;
    static width: number = 88;
    static height: number = 63;
    static path_s: Path2D;
    x: number;
    y: number;
};

// eager "static" construction
Card.makePath();

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

/* CANVAS CREATION */

var canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 640;
document.body.appendChild(canvas);

/* MOUSE HANDLING - BEGIN */

var mouse_x: number = null;
var mouse_y: number = null;

canvas.addEventListener('mousemove', onMouseUpdate, false);
canvas.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e: MouseEvent) {
    mouse_x = e.offsetX;
    mouse_y = e.offsetY;
    console.log(mouse_x, mouse_y);
}

function getMouseX() {
    return mouse_x;
}

function getMouseY() {
    return mouse_y;
}

/* MOUSE HANDLING - END */

var ctx = canvas.getContext("2d");

ctx.strokeStyle = 'rgb(200,0,0)';
const width = canvas.width;

const cols_by_row = [4, 5, 6, 7, 6, 5, 4];
const offset_y = (canvas.height - cols_by_row.length * Card.height) / 2;

var cardCollection = new CardCollection();

for (var row = 0; row < cols_by_row.length; ++row) {
    const cards_by_row = cols_by_row[row];
    const offset_x = (width - cards_by_row * Card.width) / 2;
    for (var col_into_row = 0; col_into_row < cards_by_row; ++col_into_row) {
        cardCollection.AddCard(offset_x + col_into_row * Card.width, offset_y + row * Card.height);
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
//cardCollection.hittest(mouse_x, mouse_y);

