import io from 'socket.io-client'

const MAX_POOL_SIZE          = 2000
const THRESHOLD_ACCELERATION = 1200
const THRESHOLD_ROTATION     = 20
const REFERENCE_MESURE_RANGE = 20

export default class Socket {
    constructor() {

        // this.host = 'http://172.18.33.63:3000'
        this.host = 'http://192.168.1.84:3000'

        this.motionReference    = {x: 0, y:0, z:0}
        this.rotationReference  = {alpah: 0, beta:0, gamma:0}

        this.prevMovementValue  = {x: 0, y:0, z:0}

        this.prevRotationValue  = {alpha: 0, beta:0, gamma:0}
        this.deltaRotationValue = {alpha: 0, beta:0, gamma:0}
        this.rotationValue      = {alpha: 0, beta:0, gamma:0}

        this.movementRefPool    = []
        this.rotationRefPool    = []
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

    handleMovementReference() {
        window.addEventListener('devicemotion', (event) => {

            let movementRefObject = {
                x: Math.abs(Math.trunc(event.accelerationIncludingGravity.x * 10000)) - this.motionReference.x,
                y: Math.abs(Math.trunc(event.accelerationIncludingGravity.y * 10000)) - this.motionReference.y,
                z: Math.abs(Math.trunc(event.accelerationIncludingGravity.z * 10000)) - this.motionReference.z
            }
            this.movementRefPool.unshift(movementRefObject)
            this.movementRefPool.slice(MAX_POOL_SIZE, this.movementRefPool.length)

            if (!this.motionReference.x) {
                if (this.movementRefPool.length >= REFERENCE_MESURE_RANGE) {

                    let i = 0,
                    notSoFar = true
                    while(++i < REFERENCE_MESURE_RANGE && notSoFar) {
                        let currentObj = this.movementRefPool[i]
                        notSoFar = Math.abs(currentObj.x - movementRefObject.x) < THRESHOLD_ACCELERATION
                            && Math.abs(currentObj.y - movementRefObject.y) < THRESHOLD_ACCELERATION
                            && Math.abs(currentObj.z - movementRefObject.z) < THRESHOLD_ACCELERATION
                    }

                    if (notSoFar) {
                        this.motionReference = movementRefObject
                    }
                }
            } else {
                let deltaMovementValue = {
                    x: movementRefObject.x - this.movementRefPool[MAX_POOL_SIZE - 2].x,
                    y: movementRefObject.y - this.movementRefPool[MAX_POOL_SIZE - 2].y,
                    z: movementRefObject.z - this.movementRefPool[MAX_POOL_SIZE - 2].z
                }

                this.socket.emit('motion', movementRefObject)
                this.socket.emit('ref-motion', this.motionReference)
                this.socket.emit('delta-motion', deltaMovementValue)
            }
        })
    }

    handleRotationReference() {
        window.addEventListener('deviceorientation', (event) => {

            let rotationRefObject = {
                alpha: Math.abs(Math.trunc(event.alpha)) - this.rotationReference.alpha,
                beta: Math.abs(Math.trunc(event.beta)) - this.rotationReference.beta,
                gamma: Math.abs(Math.trunc(event.gamma)) - this.rotationReference.gamma
            }

            this.rotationRefPool.unshift(rotationRefObject)
            this.rotationRefPool.slice(MAX_POOL_SIZE, this.rotationRefPool.length)

            if (!this.rotationReference.x && this.rotationRefPool.length >= REFERENCE_MESURE_RANGE) {
                let i = 0,
                notSoFar = true
                while(++i < REFERENCE_MESURE_RANGE && notSoFar) {
                    let currentObj = this.rotationRefPool[i]
                    notSoFar = (rotationRefObject.alpha > 200 - THRESHOLD_ROTATION && rotationObject.alpha < 200 + THRESHOLD_ROTATION)
                        // && (rotationRefObject.beta > 90 - THRESHOLD_ROTATION && rotationObject.beta < 90 + THRESHOLD_ROTATION)
                        // && (rotationRefObject.gamma > 50 - THRESHOLD_ROTATION && rotationObject.gamma < 50 + THRESHOLD_ROTATION)
                }

                if (notSoFar) {
                    this.rotationReference = rotationRefObject
                    this.socket.emit('ref-rotation', this.rotationReference)
                }
            }

            this.socket.emit('rotation', rotationRefObject)
        })
    }
}
