import io from 'socket.io-client'

export default class Socket {
    constructor() {

        this.host = 'http://172.18.33.63:3000'
        // this.host = 'http://192.168.1.84:3000'

        this.sending = false
        this.reference = null
        this.timer = null

        this.movementObject = null
        this.prevMovementObject = null

        this.rotationObject = null
        this.prevRotationObject = null

        this.difMovementObject = null
        this.prevDifMovementObject = null

        this.difRotationObject = null
        this.prevDifRotationObject = null
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
            this.movementObject = {
                'aX': Math.abs(Math.trunc(event.acceleration.x * 10000)),
                'aY': Math.abs(Math.trunc(event.acceleration.y * 10000)),
                'aZ': Math.abs(Math.trunc(event.acceleration.z * 10000)),

                'aGravityX': Math.abs(Math.trunc(event.accelerationIncludingGravity.x * 10000)),
                'aGravityY': Math.abs(Math.trunc(event.accelerationIncludingGravity.y * 10000)),
                'aGravityZ': Math.abs(Math.trunc(event.accelerationIncludingGravity.z * 10000)),
            }
            this.socket.emit('motion', this.movementObject)

            if (!this.prevMovementObject) {
                this.prevMovementObject = {
                    prevDeltaAX: Math.abs(Math.trunc(event.acceleration.x * 10000)),
                    prevDeltaAY: Math.abs(Math.trunc(event.acceleration.y * 10000)),
                    prevDeltaAZ: Math.abs(Math.trunc(event.acceleration.z * 10000))
                }
            }

            if(this.reference) {
                this.difMovementObject = {
                    daX: this.reference.ax - this.movementObject.aX,
                    daY: this.reference.ay - this.movementObject.aY,
                    daZ: this.reference.az - this.movementObject.aZ,
                    dagY: this.reference.agy - this.movementObject.aGravityY
                }
                this.socket.emit('motion-dif', this.difMovementObject)
            }
        })
        window.addEventListener('deviceorientation', (event) => {
            this.rotationObject = {
                'alpha': Math.abs(Math.trunc(event.alpha)),
                'beta': Math.abs(Math.trunc(event.beta)),
                'gamma': Math.abs(Math.trunc(event.gamma)),
                'timeStamp': event.orientationTs
            }
            this.socket.emit('rotation', this.rotationObject)

            if(this.reference) {
                this.difRotationObject = {
                    da: this.reference.a - this.rotationObject.alpha,
                    db: this.reference.b - this.rotationObject.beta,
                    dg: this.reference.g - this.rotationObject.gamma
                }
                this.socket.emit('rotation-dif', this.difRotationObject)
            }
        })
    }

    getReferencePosition() {
        this.timer = window.setInterval(() => {
            if(!this.reference) {
                if(this.movementObject.aGravityY > 10000 && this.movementObject.aGravityZ > 15000 && this.movementObject.aGravityX < 11000) {
                    this.reference = {
                        ax: Math.abs(Math.trunc(this.movementObject.aX)),
                        ay: Math.abs(Math.trunc(this.movementObject.aY)),
                        az: Math.abs(Math.trunc(this.movementObject.aZ)),
                        agy: Math.abs(Math.trunc(this.movementObject.aGravityY)),
                        a: Math.abs(Math.trunc(this.rotationObject.alpha)),
                        b: Math.abs(Math.trunc(this.rotationObject.beta)),
                        g: Math.abs(Math.trunc(this.rotationObject.gamma))
                    }

                    this.socket.emit('referencePosition', this.reference)
                    this.stopReferencePosition()
                }
            }
        }, 3000)

    }

    stopReferencePosition() {
        console.log('clear')
        clearInterval(this.timer)
        this.timer = null
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
