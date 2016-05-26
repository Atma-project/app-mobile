import Socket from './socket'
let socket = null

export default (function() {
    return socket != null ? socket : socket = new Socket()
})()
