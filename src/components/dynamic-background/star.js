import PIXI from 'pixi.js'
import 'gsap'

export class Star extends PIXI.Sprite {
    constructor(texture) {
        super(texture)
    }

    blink() {
        TweenMax.to(this, 1, {
            alpha: 0,
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2
        })
    }

    update(frame) {

    }
}

export default Star
