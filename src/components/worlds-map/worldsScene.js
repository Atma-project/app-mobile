import PIXI from 'pixi.js'
import $ from 'chirashi-imports'
import Worlds from './worlds'
import 'gsap'

export class WorldsScene {
    constructor(view, data) {
        this.width = $.width(view)
        this.height = $.height(view)

        this.renderer = new PIXI.autoDetectRenderer(this.width, this.height, {
            scale: window.devicePixelRatio,
            view: view,
            backgroundColor: 0x0000ff,
            transparent: true
        })

        this.worldSystem = new Worlds(this.width, this.height, data)
        // this.starSystem.setProperties({
        //     scale: true
        // })

        this.stage = new PIXI.Container()
        this.stage.addChild(this.worldSystem)

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

export default WorldsScene
