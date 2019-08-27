import game from "./Game";

function Display(game) {
    this.buffer = document.createElement("canvas").getContext("2d");
    this._map = document.createElement("canvas").getContext("2d");
    this.context = document.querySelector("canvas").getContext("2d");

    this.buffer.canvas.height = this.context.canvas.height = this._map.canvas.height = game.world.rows * game.world.tile_size;
    this.buffer.canvas.width = this.context.canvas.width = this._map.canvas.width = game.world.columns * game.world.tile_size;
    this.output = document.querySelector("p");
    this._game = game;
    // map
    this._mapCached = false;

    this.blueHeart = this.renderHeart(game.world.tile_size, game.world.tile_size, '#34bffc')
    this.redHeart = this.renderHeart(game.world.tile_size, game.world.tile_size, '#ef472b')
}

Display.prototype.colors = {
    0: "#ffffff",
    1: "#9acd30",
    4: "#34bffc",
    5: "#ef472b",

};

Display.prototype.render = function (...args) {

    // Clear
    this.buffer.strokeStyle = '#000';
    this.buffer.strokeRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);


    // Maps repaint
    if (!this._mapCached) {
        this.renderMap(this._map, game.world.map)
        this._mapCached = true;
    }

    this.buffer.drawImage(this._map.canvas
        , 0, 0, this._map.canvas.width, this._map.canvas.height
        , 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);


    var html = '';
    // Render Players
    for (var object of  args) {
        object.render(this.buffer, this._game.sprit_image)
        html += `<p>Hero: <span style="color:${object.type} ">${object.type}</span> | Status : ${object.status} | Scores : ${object.scores}</p>`;
    }
    this.output.innerHTML = html;

    this.context.drawImage(this.buffer.canvas
        , 0, 0, this.buffer.canvas.width, this.buffer.canvas.height
        , 0, 0, this.context.canvas.width, this.context.canvas.height)
};

// 1: Normal background

Display.prototype.renderMap = function (buffer, map) {
    let size = this._game.world.tile_size;
    for (var index = 0; index < map.length; index++) {

        if (map[index] === 6) {
            buffer.drawImage(this.blueHeart.canvas
                , 0, 0, this.blueHeart.canvas.width, this.blueHeart.canvas.width
                , (index % this._game.world.columns) * size, Math.floor(index / this._game.world.columns) * size, size, size);
            continue;
        }

        if (map[index] === 7) {
            buffer.drawImage(this.redHeart.canvas
                , 0, 0, this.redHeart.canvas.width, this.redHeart.canvas.width
                , (index % this._game.world.columns) * size, Math.floor(index / this._game.world.columns) * size, size, size);
            continue;
        }

        buffer.fillStyle = this.colors[map[index]];

        buffer.fillRect((index % this._game.world.columns) * size, Math.floor(index / this._game.world.columns) * size, size, size);

        if (map[index] > 0) {
            buffer.strokeStyle = '#000000'
            buffer.strokeRect((index % this._game.world.columns) * size, Math.floor(index / this._game.world.columns) * size, size, size);
        }
    }
}

Display.prototype.renderHeart = function (w, h, color) {
    let buffer = document.createElement("canvas").getContext("2d");

    buffer.canvas.width = w;
    buffer.canvas.height = h;
    buffer.fillStyle = '#ffffff';
    buffer.fillRect(0, 0, w, h);


    var k = 1;
    let d = Math.min(w-2, h);
    buffer.fillStyle = color
    buffer.moveTo(k, k + d / 4);
    buffer.quadraticCurveTo(k, k, k + d / 4, k);
    buffer.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
    buffer.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k);
    buffer.quadraticCurveTo(k + d, k, k + d, k + d / 4);
    buffer.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4);
    buffer.lineTo(k + d / 2, k + d);
    buffer.lineTo(k + d / 4, k + d * 3 / 4);
    buffer.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
    buffer.stroke();
    buffer.fill();
    return buffer;
}

export default Display;