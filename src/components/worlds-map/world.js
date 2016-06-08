import PIXI from 'pixi.js'
import 'gsap'

export class World extends PIXI.Sprite {
    constructor(texture) {
        super(texture)
        this.mapIndex = null
    }

    update(frame) {

    }
}

export default World
