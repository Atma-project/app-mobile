import PIXI from 'pixi.js'
import $ from 'chirashi-imports'
import Stars from './stars'
import 'gsap'

export class StarScene {
    constructor(view) {
        this.width = $.width(view)
        this.height = $.height(view)

        this.renderer = new PIXI.autoDetectRenderer(this.width, this.height, {
            scale: window.devicePixelRatio,
            view: view,
            backgroundColor: 0x0000ff,
            transparent: true
        })

        this.starSystem = new Stars(this.width, this.height)
        this.starSystem.setProperties({
            alpha: true
        })

        this.stage = new PIXI.Container()
        this.stage.addChild(this.starSystem)

        TweenMax.ticker.addEventListener('tick', ::this.update)
    }

    render() {
        this.renderer.render(this.stage)
    }

    update() {
        this.frame += 0.1
        this.render()
    }
}

export default StarScene
