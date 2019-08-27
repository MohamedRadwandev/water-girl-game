import Controller from './Controller'
import Player from './Player'
import Display from './Display'
import Collision from './Collision'
import world from './world'

const game = {
    world: world,
    players: [
        new Player(120, 120, 'blue', new Controller(37, 39, 38)),
        new Player(240, 120, 'red', new Controller(65, 68, 87)),
    ],
    sprit_image: '',
    start() {
        this.sprit_image = new Image();
        this.sprit_image.src = 'images/heros.png';
        this.sprit_image.addEventListener('load', (e) => {
            this.display.render(this.players[0], this.players[1])
        })

    },
    update() {
        this.players.forEach((player) => {
            if (player.status === "die") {
                return;
            }
            if (player.controller.up && !player.jumping) {
                player.jump();
            }

            if (player.controller.left) {
                player.moveLeft();
            }
            if (player.controller.right) {
                player.moveRight();
            }

            player.old_x = player.x;
            player.old_y = player.y;

            player.x += player.velocity_x;
            player.y += player.velocity_y;

            if (player.y < 0) {
                player.velocity_y = .5;
                player.y = 0;
            }
            if (player.x < 0) {
                player.velocity_x = 0;
                player.x = 0;
            }

            if ((player.x + player.width) > this.display.buffer.canvas.width) {
                player.velocity_x = 0;
                player.x = this.display.buffer.canvas.width - player.width;
            }
            if ((player.y + player.height) > this.display.buffer.canvas.height) {
                player.velocity_y = 0;
                player.y = this.display.buffer.canvas.height - player.height;
                player.jumping = false;
            }

            player.velocity_y += .8; // gravity

            this.collision.run(player); // collision

            player.collecting(game);

            player.velocity_x *= 0.9;
            player.velocity_y *= 0.9;
        });
    },
    render() {
        this.update();
        this.display.render(this.players[0], this.players[1]);
    },
    setMapIndex(index, value) {
        this.world.map[index] = value;
        this.display._mapCached = false;
    }
}


game.display = new Display(game);
game.collision = new Collision(game);
export default game;