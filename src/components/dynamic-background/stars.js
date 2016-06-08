import PIXI from 'pixi.js'
import $ from 'chirashi-imports'
import Star from './star'

const NB_STARS         = 100
const STAR_BASE_RADIUS = 1

export class Stars extends PIXI.ParticleContainer {
    constructor(width, height) {
        super()

        this.stars      = []
        this.starAlphas = [0.2, 0.5, 0.7, 0.6, 0.4, 1]

        this.drawStars(width, height)

        for (let i = 0; i < NB_STARS; i++) {
            if (Math.random() > 0.6) {
                this.stars[i].blink()
            }
        }
    }

    drawStars(width, height) {
        let starTexture = this.createTexture()

        for (var i = 0; i < NB_STARS; i++) {
            let star = new Star(starTexture)

            star.alpha = this.starAlphas[Math.floor(Math.random() * this.starAlphas.length)]
            star.position.x = Math.random() * width
            star.position.y = Math.random() * height

            this.addChild(star)
            this.stars.push(star)
        }
    }

    createTexture() {
        let graphics = new PIXI.Graphics()
    	graphics.lineStyle(0)
    	graphics.beginFill(0xffffff)
    	graphics.drawCircle(0, 0, STAR_BASE_RADIUS)
    	graphics.endFill()
    	graphics.boundsPadding = 0
    	return graphics.generateTexture()
    }
}

export default Stars
