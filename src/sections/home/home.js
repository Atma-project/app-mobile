import './home.scss'

import Vue from 'vue'

import SocketHandler from 'helpers/sockets/socket-handler'

export default Vue.extend({
    template: require('./home.html'),

    ready() {
        // SocketHandler.init()
        // SocketHandler.sendDeviceMotion()
        // SocketHandler.sendDeviceOrientation()
    }
})
