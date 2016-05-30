import PIXI from 'pixi.js'
import $ from 'chirashi-imports'
import gui from 'helpers/app/gui'

export class Stars extends PIXI.Container {
    constructor(world, width, height) {
        super()

        this.tWidth = width
        this.tHeight = height

        this.generateTexture()
    }

    resetPools() {
        for(let i = 0; i < this.stripePool.length ; i++) {
            this.removeChild(this.stripePool[i])
        }

        for(let j = 0; j < this.recyclePool.length ; j++) {
            this.removeChild(this.recyclePool[j])
        }

        this.recyclePool = []
        this.stripePool = []
    }

    reset() {
        if (this.currentSprite)
            this.removeChild(this.currentSprite)

        if (this.interval)
            window.clearInterval(this.interval)
    }

    initGhostCanvas() {
        this.backgroundCanvas = document.createElement('canvas')
        this.backgroundCanvas.width = this.tWidth
        this.backgroundCanvas.height = this.tHeight
        this.ctx = this.backgroundCanvas.getContext('2d')
    }

    buildGradient() {
        this.gradientBackground = this.ctx.createRadialGradient(this.tWidth / 2, this.tHeight / 2, this.tHeight / 2, this.tWidth / 2, this.tHeight / 2, 0)
        this.gradientBackground.addColorStop(0, this.topColor)
        this.gradientBackground.addColorStop(1, this.bottomColor)
        this.ctx.fillStyle = this.gradientBackground
        this.ctx.fillRect(0, 0, this.tWidth, this.tHeight)
    }

    generateTexture() {
        this.resetPools()
        this.reset()

        this.initGhostCanvas()
        this.buildGradient()

        let backgroundTexture = new PIXI.Texture.fromCanvas(this.backgroundCanvas)
        let backgroundSprite = new PIXI.Sprite(backgroundTexture)
        this.currentSprite = backgroundSprite
        this.addChildAt(this.currentSprite, 0)

        this.interval = window.setInterval(() => {
            this.createStripe()
        }, this.range)
    }

    createStripe() {
        let stripe = this.recyclePool.shift()

        if (!stripe) {
            stripe = new PIXI.Graphics()
            stripe.lineStyle(this.strokeWidth, this.strokeColor)
            stripe.drawCircle(this.tWidth / 2, this.tHeight / 2, this.tWidth / 2)
            this.addChild(stripe)
        }

        stripe.scale.set(0)

        this.stripePool.push(stripe)
    }

    initGUI(gui) {
        this.soul4Folder = gui.addFolder('Soul4')
        gui.add(this, 'range', 0, 500)
        gui.add(this, 'strokeWidth', 0, 200)
        gui.addColor(this, 'strokeColor')
        gui.addColor(this, 'topColor')
        gui.addColor(this, 'bottomColor')
        gui.add(this, 'generateTexture')
    }

    update(frame) {
        for(let stripe of this.stripePool) {
            let scale = stripe.scale.x + 0.05

            stripe.scale.set(scale)

            if (scale > 1.8) {
                this.recyclePool.push(this.stripePool.shift())
            } else {
                stripe.position.set((this.tWidth / 2) * (1 - scale), (this.tHeight / 2) * (1 - scale))
            }
        }
    }
}

export default ZebraScene
