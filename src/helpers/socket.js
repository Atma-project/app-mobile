import io from 'socket.io-cleint'

export default class Socket {
    constructor() {
        console.log('socket')

        this.host = 'http://172.18.34.209:3000'
        this.socket = io(this.host)

        this.init()
    }

    init() {

    }
}
