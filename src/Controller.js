function Controller(left, up, right) {
    this.leftCode = left;
    this.rightCode = up;
    this.upCode = right;

    this.left = false;
    this.right = false;
    this.up = false;

    this.func = this.keyUpDown.bind(this);
    window.addEventListener("keydown", this.func);
    window.addEventListener("keyup", this.func);
}

Controller.prototype.keyUpDown = function (event) {
    var key_state = (event.type == "keydown") ? true : false;
    switch (event.keyCode) {
        case this.leftCode:
            this.left = key_state;
            break; // left key
        case this.upCode:
            this.up = key_state;
            break; // up key
        case this.rightCode:
            this.right = key_state;
            break; // right key
    }
}
Controller.prototype.release = function () {
    window.removeEventListener('keydown',this.func);
    window.removeEventListener('keyup',this.func);
}
export default Controller;