import PIXI from 'pixi.js'
import $ from 'chirashi-imports'
import World from './world'

export class Worlds extends PIXI.Container {
    constructor(width, height, data) {
        super()

        this.worldsData = data
        this.worlds     = []

        this.createWorlds()
        this.dispatchWorldsOnMap()
    }

    createWorlds() {
        for (let worldName in this.worldsData) {
            let currentData = this.worldsData[worldName]
            let texture, world

            if (currentData.locked)
                texture = PIXI.Texture.fromImage(currentData.lockedTexture)
            else
                texture = PIXI.Texture.fromImage(currentData.texture)

            world            = new World(texture)
            world.width      = currentData.size.width / currentData.mapIndex
            world.height     = currentData.size.height / currentData.mapIndex
            world.position.x = currentData.position.x
            world.position.y = currentData.position.y
            world.mapIndex   = currentData.mapIndex

            this.worlds.push(world)
        }
    }

    dispatchWorldsOnMap() {
        let i = this.worlds.length - 1
        for (i; i >= 0; i--) {
            // this.worlds[i].scale.x = this.worlds[i].width / this.worlds[i].mapIndex
            // this.worlds[i].scale.y = this.worlds[i].height / this.worlds[i].mapIndex
            // console.log(this.worlds[i].scale);
            this.addChild(this.worlds[i])
        }
    }
}

export default Worlds
