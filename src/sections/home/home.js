import './home.scss'

import Vue from 'vue'

import SocketHandler from 'helpers/sockets/socket-handler'

export default Vue.extend({
    template: require('./home.html'),

    data() {
        return {
            'reference': null,
            'timer': null
        }
    },

    ready() {
        // SocketHandler.init()
        // SocketHandler.handleMotion()
        // SocketHandler.handleRotation()
    },

    methods: {

    }
})
