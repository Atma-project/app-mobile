import io from 'socket.io-client'

const MAX_POOL_SIZE = 2000
const THRESHOLD = 1000

export default class Socket {
    constructor() {

        // this.host = 'http://172.18.33.63:3000'
        this.host = 'http://192.168.1.84:3000'

        this.reference = {x: 0, y:0, z:0}

        this.movementPool = []
        this.rotationPool = []
    }

    init() {
        this.socket = io(this.host)

        this.socket.on('newConnection', (data) => {
            this.socket.emit('mobile-connected', data)
        })

        this.socket.on('disconnect', (data) => {
            this.listening = false
            this.socket.emit('disconnect', data)
        })
    }

    listenDeviceMotion() {
        window.addEventListener('devicemotion', (event) => {
            let movementObject = {

                x: Math.abs(Math.trunc(event.accelerationIncludingGravity.x * 10000)) - this.reference.x,
                y: Math.abs(Math.trunc(event.accelerationIncludingGravity.y * 10000)) - this.reference.y,
                z: Math.abs(Math.trunc(event.accelerationIncludingGravity.z * 10000)) - this.reference.z
            }

            this.movementPool.unshift(movementObject)
            this.movementPool.slice(MAX_POOL_SIZE, this.movementPool.length)

            if (!this.reference.x && this.movementPool.length >= 11) {
                let i = 0,
                notSoFar = true
                while(++i < 11 && notSoFar) {
                    let currentObj = this.movementPool[i]
                    notSoFar = currentObj.x - movementObject.x < THRESHOLD
                        && currentObj.y - movementObject.y < THRESHOLD
                        && currentObj.z - movementObject.z < THRESHOLD
                }

                if (notSoFar) {
                    this.reference = movementObject
                }
            } else {
                this.socket.emit('motion', movementObject)
                this.socket.emit('ref', this.reference)
            }
        })

        window.addEventListener('deviceorientation', (event) => {
            let rotationObject = {
                alpha: Math.abs(Math.trunc(event.alpha)),
                beta: Math.abs(Math.trunc(event.beta)),
                gamma: Math.abs(Math.trunc(event.gamma)),
                timeStamp: event.orientationTs
            }

            this.rotationPool.unshift(rotationObject)
            this.rotationPool.slice(MAX_POOL_SIZE, this.rotationPool.length)

            this.socket.emit('rotation', this.rotationPool)
        })
    }

    disconnect() {
        this.listening = false
        this.socket.emit('disconnect')
    }

    pauseGame() {
        this.socket.emit('game-paused')
    }

    activateCoach() {
        this.socket.emit('coach-acvtivated')
    }

    deactivateCoach() {
        this.socket.emit('coach-deactivated')
    }
}
