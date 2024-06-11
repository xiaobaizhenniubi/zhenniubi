var draw = function (ctx, x, y, size) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.size = size;
  var y1 = this.y;
  this.drawText = function () {
    var str = Math.ceil(Math.random() * 10000).toString(2);
    var grd = this.ctx.createLinearGradient(
      this.x,
      this.y,
      this.x,
      this.y - this.ctx.measureText(str).width
    );
    grd.addColorStop(0, "#00FF00");
    grd.addColorStop(1, "#004400");
    this.ctx.fillStyle = grd;
    this.ctx.font = this.size + "px Arial";
    for (var i = str.length - 1; i >= 0; i--) {
      this.ctx.fillText(str.charAt(i), this.x, (y1 -= 15));
    }
    y1 = this.y += 10;
    if (y1 - 720 + this.ctx.measureText(str).width > 0) {
      this.x = Math.ceil(Math.random() * 1000);
      y1 = this.y = Math.ceil(Math.random() * 100);
    }
  };
};

var rain = function (ctx, length) {
  this.length = length;
  this.ctx = ctx;
  var x = [];
  var y = [];
  var size = [];
  var texts = [];
  var i = 0;
  for (; i < length; i++) {
    x[i] = Math.ceil(Math.random() * 1000);
    y[i] = Math.ceil(Math.random() * 500);
    size[i] = Math.ceil(Math.random() * 15);
    texts[i] = new draw(this.ctx, x[i], y[i], size[i]);
  }
  this.run = function () {
    ctx.clearRect(0, 0, 1000, 600);
    for (var j = 0; j < length; j++) {
      texts[j].drawText();
    }
  };
};

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rain0 = new rain(ctx, 100);
setInterval(rain0.run, 50);
