import io from 'socket.io-client'

const MAX_POOL_SIZE = 2000
const THRESHOLD_ACCELERATION = 1200
const THRESHOLD_ROTATION = 20
const THRESHOLD_ROTATION_STILL = 5
const REFERENCE_MESURE_RANGE = 20

export default class Socket {
    constructor() {

        //   this.host = 'http://172.18.33.23:3000'
        this.host = 'http://172.18.33.95:3000'
        //   this.host = 'http://192.168.1.84:3000'  //appart

        //reference objects
        this.motionReference = {x: 0, y: 0, z: 0}
        this.rotationReference = {alpha: 0, beta: 0, gamma: 0}

        //pools to temporary store real time data
        this.motionRefPool = []
        this.rotationRefPool = []

        this.listening = false
    }

    init() {
        this.socket = io(this.host)
        this.listening = true
    }

    handleMotion() {
        window.addEventListener('devicemotion', (event) => {
            // On movement detection clean the data and subtract the reference (0 if not defined yet)
            let motionRefObject = {
                x: Math.abs(Math.trunc(event.acceleration.x * 10000)) - this.motionReference.x,
                y: Math.abs(Math.trunc(event.acceleration.y * 10000)) - this.motionReference.y,
                z: Math.abs(Math.trunc(event.acceleration.z * 10000)) - this.motionReference.z
            }

            //handle the motion pool as data flows
            this.motionRefPool.unshift(motionRefObject)
            this.motionRefPool.slice(MAX_POOL_SIZE, this.motionRefPool.length)

            if (!this.motionReference.x) {
                if (this.motionRefPool.length >= REFERENCE_MESURE_RANGE) {

                    //Use threshold constants to detect a reference position
                    let i = 0, notSoFar = true
                    while (++i < REFERENCE_MESURE_RANGE && notSoFar) {
                        let currentObj = this.motionRefPool[i]
                        notSoFar = Math.abs(currentObj.x - motionRefObject.x) < THRESHOLD_ACCELERATION &&
                            Math.abs(currentObj.y - motionRefObject.y) < THRESHOLD_ACCELERATION &&
                            Math.abs(currentObj.z - motionRefObject.z) < THRESHOLD_ACCELERATION
                    }

                    if (notSoFar) {
                        this.motionReference = motionRefObject
                    }
                }
            } else {
                let currentMotionPoolLength = this.motionRefPool.length
                let deltaMovementValue = {
                    x: motionRefObject.x - this.motionRefPool[currentMotionPoolLength - 2].x,
                    y: motionRefObject.y - this.motionRefPool[currentMotionPoolLength - 2].y,
                    z: motionRefObject.z - this.motionRefPool[currentMotionPoolLength - 2].z
                }

                //Emit necessary events
                this.socket.emit('motion', motionRefObject)
                this.socket.emit('ref-motion', this.motionReference)
                this.socket.emit('delta-motion', deltaMovementValue)
            }
        })
    }

    //Same method for rotation
    handleRotation() {
        window.addEventListener('deviceorientation', (event) => {

            let rotationRefObject = {
                alpha: Math.abs(Math.trunc(event.alpha)) - this.rotationReference.alpha,
                beta: Math.abs(Math.trunc(event.beta)) - this.rotationReference.beta,
                gamma: Math.abs(Math.trunc(event.gamma)) - this.rotationReference.gamma
            }

            this.rotationRefPool.unshift(rotationRefObject)
            this.rotationRefPool.slice(MAX_POOL_SIZE, this.rotationRefPool.length)

            if (!this.rotationReference.alpha) {
                if (this.rotationRefPool.length >= REFERENCE_MESURE_RANGE) {

                    let j = 0,
                        notTooFar = true
                    while (++j < REFERENCE_MESURE_RANGE && notTooFar) {
                        let currentObj = this.rotationRefPool[j]
                        notTooFar = (rotationRefObject.beta > 90 - THRESHOLD_ROTATION && rotationRefObject.beta < 90 + THRESHOLD_ROTATION) &&
                            (rotationRefObject.alpha > 200 - THRESHOLD_ROTATION && rotationRefObject.alpha < 200 + THRESHOLD_ROTATION) &&
                            (rotationRefObject.gamma > 50 - THRESHOLD_ROTATION && rotationRefObject.gamma < 50 + THRESHOLD_ROTATION) &&
                            (Math.abs(currentObj.beta - rotationRefObject.beta) < THRESHOLD_ROTATION_STILL)
                    }

                    if (notTooFar) {
                        this.rotationReference = rotationRefObject
                    }
                }
            } else {
                let currentRotationPoolLength = this.rotationRefPool.length
                let deltaRotationValue = {
                    alpha: rotationRefObject.alpha - this.rotationRefPool[currentRotationPoolLength - 2].alpha,
                    beta: rotationRefObject.beta - this.rotationRefPool[currentRotationPoolLength - 2].beta,
                    gamma: rotationRefObject.gamma - this.rotationRefPool[currentRotationPoolLength - 2].gamma,
                }

                this.socket.emit('rotation', rotationRefObject)
                this.socket.emit('ref-rotation', this.rotationReference)
                this.socket.emit('delta-rotation', deltaRotationValue)
            }
        })
    }
}
