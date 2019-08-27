function Collision(game) {
    this.game = game;
    this.world = game.world;
}


Collision.prototype.leftCollision = function (object, column) {
    if (object.velocity_x > 0) {// If the object is moving right
        var left = (column + 2) * this.game.world.tile_size;// calculate the left side of the collision tile
        if (object.x + object.width > left && object.old_x <= left) {// If the object was to the right of the collision object, but now is to the left of it
            object.velocity_x = 0;// Stop moving
            object.x = object.old_x = left - (object.width + 0.001);// place object outside of collision
            return true;
        }
    }
    return false;

};


Collision.prototype.rightCollision = function (object, column) {

    if (object.velocity_x < 0) {
        var right = (column + 1) * this.game.world.tile_size;
        if (object.x < right && object.old_x >= right) {
            object.velocity_x = 0;
            object.old_x = object.x = right + .5;

            return true;

        }
    }
    return false;

}

Collision.prototype.topCollision = function (object, row) {
    if (object.velocity_y > 0) {

        var top = (row + 3) * this.game.world.tile_size;
        if (object.y + object.height > top) {
            object.jumping = false;
            object.velocity_y = 0;
            object.old_y = object.y = top - (object.height - 1);
            return true;
        }
    }
    return false;
}

Collision.prototype.bottomCollision = function (object, row) {
    if (object.velocity_y < 0) {
        var top = (row) * this.game.world.tile_size + 10;
        if (object.y < top + 5) {
            object.velocity_y = 0;
            object.old_y = object.y = top;
            return true;
        }
    }
    return false;
}


Collision.prototype.run = function (player) {
    let tile_x = Math.floor(player.x / this.world.tile_size);
    let tile_y = Math.floor(player.y / this.world.tile_size);
    let offsetTopIndex = tile_y * this.world.columns + tile_x;

    // top left
    if (this.world.map[(tile_y + 3) * this.world.columns + (tile_x)] > 0) {
        this.topCollision(player, tile_y)
        this.trapCollision(player, this.world.map[(tile_y + 3) * this.world.columns + (tile_x)]);

    }
    // top right
    if (this.world.map[(tile_y + 3) * this.world.columns + (tile_x + 1)] > 0) {
        this.topCollision(player, tile_y)
        this.trapCollision(player, this.world.map[(tile_y + 3) * this.world.columns + (tile_x + 1)]);
    }

    // bottom left
    if (this.world.map[offsetTopIndex] > 0) {
        this.bottomCollision(player, tile_y)
    }

    // bottom right
    if (this.world.map[tile_y * this.world.columns + tile_x + 1] > 0) {
        (this.bottomCollision(player, tile_y));
        (this.leftCollision(player, tile_x));
    }

    // left top
    if (this.world.map[tile_y * this.world.columns + tile_x + 2] > 0) {
        (this.leftCollision(player, tile_x));
    }
    // left bottom
    if (this.world.map[tile_y + 2 * this.world.columns + tile_x + 2] > 0) {
        (this.leftCollision(player, tile_x));
    }

    if (this.world.map[tile_y * this.world.columns + tile_x] > 0) {
        (this.rightCollision(player, tile_x));
    }


}
Collision.prototype.trapCollision = function (player, value) {
    if (value === 4 && player.type === "red") {
        player.die();
    }

    if (value === 5 && player.type === "blue") {
        player.die();
    }
}
export default Collision;