import io from 'socket.io-client'

export default class Socket {
    constructor() {

        // this.host = 'http://172.18.33.150:3000'
        this.host = 'http://192.168.1.83:3000'

        this.listening = false
        this.sending = false

        this.currentXAccel = undefined
        this.currentYAccel = undefined
        this.currentZAccel = undefined

        this.previousXAccel = undefined
        this.previousYAccel = undefined
        this.previousZAccel = undefined
    }

    init() {
        this.socket = io(this.host)
        this.listening = true

        this.socket.on('newConnection', (data) => {
            console.log('connected')
            this.socket.emit('mobile-connected', data)
        })

        this.socket.on('disconnect', (data) => {
            console.log('disconnected')
            this.listening = false
            this.socket.emit('disconnect', data)
        })
    }

    sendDeviceOrientation() {
        window.addEventListener('deviceorientation', (event) => {
            this.socket.emit('orientation', {
                'alpha': event.alpha,
                'beta': event.beta,
                'gamma': event.gamma,
                'timeStamp': event.orientationTs
            })
        })
    }

    sendDeviceMotion() {
        window.addEventListener('devicemotion', (event) => {

            if(this.currentXAccel) {
                this.previousXAccel = this.currentXAccel
            }

            if(this.currentYAccel) {
                this.previousYAccel = this.currentYAccel
            }

            if(this.currentZAccel) {
                this.previousZAccel = this.currentZAccel
            }

            this.currentXAccel = event.acceleration.x
            this.currentYAccel = event.acceleration.y
            this.currentZAccel = event.acceleration.z

            this.socket.emit('acceleration', {

                'aX': this.currentXAccel,
                'aY': this.currentYAccel,
                'aZ': this.currentZAccel,

                'prevAX': this.previousXAccel,
                'prevAY': this.previousYAccel,
                'prevAZ': this.previousZAccel,

                'aGravityX': event.accelerationIncludingGravity.x,
                'aGravityY': event.accelerationIncludingGravity.y,
                'aGravityZ': event.accelerationIncludingGravity.z,

                'rRateX': event.rotationRate.beta,
                'rRateY': event.rotationRate.gamma,
                'rRateZ': event.rotationRate.alpha,

                'interval': event.interval,
                'timeStamp': event.accelerationTs
            })
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
