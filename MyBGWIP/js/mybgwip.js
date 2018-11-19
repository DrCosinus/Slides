var Card = /** @class */ (function () {
    function Card(x, y) {
        this.x = x;
        this.y = y;
    }
    Card.makePath = function () {
        var path = new Path2D();
        path.arc(Card.radius, Card.radius, Card.radius, 2 * Math.PI / 2, 3 * Math.PI / 2);
        path.arc(Card.width - Card.radius, Card.radius, Card.radius, 3 * Math.PI / 2, 0);
        path.arc(Card.width - Card.radius, Card.height - Card.radius, Card.radius, 4 * Math.PI / 2, Math.PI / 2);
        path.arc(Card.radius, Card.height - Card.radius, Card.radius, 1 * Math.PI / 2, 2 * Math.PI / 2);
        path.closePath();
        Card.path_s = path;
    };
    Card.prototype.draw = function (ctx) {
        ctx.save();
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 2;
        if (this.hittest(ctx, mouse_x, mouse_y))
            ctx.fillStyle = 'rgba(0, 250, 0, 1)';
        else
            ctx.fillStyle = 'rgba(250, 250, 250, 1)';
        ctx.translate(this.x, this.y);
        ctx.fill(Card.path_s);
        ctx.stroke(Card.path_s);
        ctx.restore();
    };
    Card.prototype.hittest = function (ctx, x, y) {
        ctx.save();
        ctx.translate(this.x, this.y);
        var result = ctx.isPointInPath(Card.path_s, x, y);
        ctx.restore();
        return result;
    };
    Card.radius = 10;
    Card.width = 88;
    Card.height = 63;
    return Card;
}());
;
// eager "static" construction
Card.makePath();
var CardCollection = /** @class */ (function () {
    function CardCollection() {
        this.cards = [];
    }
    CardCollection.prototype.AddCard = function (x, y) {
        var card = new Card(x, y);
        this.cards.push(card);
        return card;
    };
    CardCollection.prototype.draw = function (ctx) {
        this.cards.forEach(function (card) {
            card.draw(ctx);
        });
    };
    return CardCollection;
}());
;
/* CANVAS CREATION */
var canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 640;
document.body.appendChild(canvas);
/* MOUSE HANDLING - BEGIN */
var mouse_x = null;
var mouse_y = null;
canvas.addEventListener('mousemove', onMouseUpdate, false);
canvas.addEventListener('mouseenter', onMouseUpdate, false);
function onMouseUpdate(e) {
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
var width = canvas.width;
var cols_by_row = [4, 5, 6, 7, 6, 5, 4];
var offset_y = (canvas.height - cols_by_row.length * Card.height) / 2;
var cardCollection = new CardCollection();
for (var row = 0; row < cols_by_row.length; ++row) {
    var cards_by_row = cols_by_row[row];
    var offset_x = (width - cards_by_row * Card.width) / 2;
    for (var col_into_row = 0; col_into_row < cards_by_row; ++col_into_row) {
        cardCollection.AddCard(offset_x + col_into_row * Card.width, offset_y + row * Card.height);
    }
}
cardCollection.AddCard(50, 50);
cardCollection.AddCard(54, 54);
cardCollection.AddCard(57, 57);
//cardCollection.hittest(mouse_x, mouse_y);
cardCollection.draw(ctx);
//# sourceMappingURL=mybgwip.js.map