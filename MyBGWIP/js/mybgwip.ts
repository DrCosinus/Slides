class Card {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(250, 250, 250, 1)';

        ctx.translate(this.x, this.y);

        ctx.beginPath();
        ctx.arc(this.radius, this.radius, this.radius, 2 * Math.PI / 2, 3 * Math.PI / 2);
        ctx.arc(card_width - this.radius, this.radius, this.radius, 3 * Math.PI / 2, 0);
        ctx.arc(card_width - this.radius, card_height - this.radius, this.radius, 4 * Math.PI / 2, Math.PI / 2);
        ctx.arc(this.radius, card_height - this.radius, this.radius, 1 * Math.PI / 2, 2 * Math.PI / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    radius: number = 10;
    x: number;
    y: number;
};



var canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 640;
document.body.appendChild(canvas);

var div = document.createElement("div");
div.innerHTML = "plop";
document.body.appendChild(div);

var ctx = canvas.getContext("2d");

const card_width = 88;
const card_height = 63;
ctx.strokeStyle = 'rgb(200,0,0)';
const width = canvas.width;

const cols_by_row = [4, 5, 6, 7, 6, 5, 4];
const offset_y = (canvas.height - cols_by_row.length * card_height) / 2;

var cards : Card[] = [];

for (var row = 0; row < cols_by_row.length; ++row) {
    const cards_by_row = cols_by_row[row];
    const offset_x = (width - cards_by_row * card_width) / 2;
    for (var col_into_row = 0; col_into_row < cards_by_row; ++col_into_row) {
        cards.push(new Card(offset_x + col_into_row * card_width, offset_y + row * card_height));
        //ctx.strokeRect(offset_x + col_into_row * card_width, offset_y + row * card_height, card_width, card_height);
        //console.log(offset_x + col_into_row * card_width);
    }
}


cards.push(new Card(50, 50));
cards.push(new Card(54, 54));

// var card = new Card(50, 50);
// card.draw(ctx);
// var card2 = new Card(54, 54);
// card2.draw(ctx);

cards.forEach(card => {
    card.draw(ctx);
});