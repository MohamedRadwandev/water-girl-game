function Player(x, y, type, controller) {
    this.height = 60;
    this.width = 40;
    this.jumping = false;

    this.old_x = 160;// used for tracking last position for collision detection
    this.old_y = 160;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x = x;
    this.y = y;
    this.controller = controller;
    this.type = type;
    this.status = 'alive'
    this.scores = 0
}

Player.prototype.jump = function () {
    this.jumping = true;
    this.velocity_y = -35;
}

Player.prototype.moveLeft = function () {
    this.velocity_x -= .7;
};

Player.prototype.moveRight = function () {
    this.velocity_x += .7;
}

Player.prototype.render = function (buffer, image) {
    if (this.status === "alive") {
        buffer.drawImage(image, this.type === 'blue' ? image.width / 2 : 0, 0, image.width / 2, image.height, this.x, this.y, this.width, this.height)
    }
}

Player.prototype.die = function () {
    this.status = 'die';
    this.controller.release();
}

Player.prototype.collecting = function (game) {
    let rightNumber = this.type === "blue" ? 6 : 7;
    let tile_x = Math.floor(this.x / game.world.tile_size);
    let tile_y = Math.floor(this.y / game.world.tile_size);
    let containerTiles = [
        tile_y * game.world.columns + tile_x,
        (tile_y + 1) * game.world.columns + tile_x,
        (tile_y + 2) * game.world.columns + tile_x,
        tile_y * game.world.columns + tile_x + 1,
        (tile_y + 1) * game.world.columns + tile_x + 1,
        (tile_y + 2) * game.world.columns + tile_x + 1,
    ];

    for (var tileIndex of containerTiles) {
        if (game.world.map[tileIndex] === rightNumber) {
            this.scores++;
            game.setMapIndex(tileIndex, 0);
        }
    }
}
export default Player;