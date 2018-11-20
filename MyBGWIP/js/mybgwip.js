var Card = /** @class */ (function () {
    function Card(x, y) {
        this.turn = 0;
        this.x = x;
        this.y = y;
    }
    Card.StaticInit = function (ctx) {
        var path = new Path2D();
        path.arc(-Card.width / 2 + Card.cornerRadius_s, -Card.height / 2 + Card.cornerRadius_s, Card.cornerRadius_s, 2 * Math.PI / 2, 3 * Math.PI / 2);
        path.arc(Card.width / 2 - Card.cornerRadius_s, -Card.height / 2 + Card.cornerRadius_s, Card.cornerRadius_s, 3 * Math.PI / 2, 0);
        path.arc(Card.width / 2 - Card.cornerRadius_s, Card.height / 2 - Card.cornerRadius_s, Card.cornerRadius_s, 4 * Math.PI / 2, Math.PI / 2);
        path.arc(-Card.width / 2 + Card.cornerRadius_s, Card.height / 2 - Card.cornerRadius_s, Card.cornerRadius_s, 1 * Math.PI / 2, 2 * Math.PI / 2);
        path.closePath();
        Card.path_s = path;
        var gradient = ctx.createLinearGradient(0, 0, Card.width, Card.height);
        gradient.addColorStop(0, 'rgba(250, 250, 250, 1)');
        gradient.addColorStop(1, 'rgba(120, 120, 180, 1)');
        Card.gradient_s = gradient;
    };
    Card.prototype.draw = function (ctx, highlight) {
        ctx.save();
        this.applyTransform(ctx);
        ctx.fillStyle = Card.gradient_s;
        ctx.fill(Card.path_s);
        if (highlight) {
            ctx.fillStyle = 'rgba(0, 250, 0, 0.5)';
            ctx.fill(Card.path_s);
        }
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 2;
        ctx.stroke(Card.path_s);
        ctx.restore();
    };
    Card.prototype.applyTransform = function (ctx) {
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.PI * 2 * this.turn);
    };
    Card.prototype.hittest = function (ctx, x, y) {
        ctx.save();
        this.applyTransform(ctx);
        var result = ctx.isPointInPath(Card.path_s, x, y);
        ctx.restore();
        return result;
    };
    Card.prototype.click = function () {
        //this.x += 25;
        this.turn += 0.25;
    };
    Card.cornerRadius_s = 10;
    Card.width = 88;
    Card.height = 63;
    return Card;
}());
;
var CardCollection = /** @class */ (function () {
    function CardCollection() {
        this.cards = [];
        this.selected = null;
    }
    CardCollection.prototype.AddCard = function (x, y) {
        var card = new Card(x, y);
        this.cards.push(card);
        return card;
    };
    CardCollection.prototype.draw = function (ctx) {
        var _this = this;
        this.cards.forEach(function (card) {
            card.draw(ctx, _this.selected == card);
        });
    };
    CardCollection.prototype.hittest = function (ctx, x, y) {
        this.selected = this.cards.slice().reverse().find(function (card) { return card.hittest(ctx, x, y); });
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
// 'mouseup', 'mousedown'
canvas.addEventListener('mousemove', onMouseUpdate, false);
canvas.addEventListener('mouseenter', onMouseUpdate, false);
canvas.addEventListener('click', onMouseClick, false);
function onMouseUpdate(e) {
    mouse_x = e.offsetX;
    mouse_y = e.offsetY;
}
function onMouseClick(e) {
    if (cardCollection.selected) {
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
var width = canvas.width;
var cols_by_row = [4, 5, 6, 7, 6, 5, 4];
var offset_y = (canvas.height + (1 - cols_by_row.length) * Card.height) / 2;
var cardCollection = new CardCollection();
for (var row = 0; row < cols_by_row.length; ++row) {
    var cards_by_row = cols_by_row[row];
    var offset_x = (width + (1 - cards_by_row) * Card.width) / 2;
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
//# sourceMappingURL=mybgwip.js.map