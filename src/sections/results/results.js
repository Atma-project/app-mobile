import './results.scss'

import Vue from 'vue'

import SocketHandler from 'helpers/sockets/socket-handler'


export default Vue.extend({
    template: require('./results.html'),

    data() {
        return {}
    },

    ready() {
    },

    methods: {
      goToWorlds() {
        if (SocketHandler.listening) {
            SocketHandler.socket.emit('go-back-to-worlds')

        } else {
          SocketHandler.init()
          SocketHandler.socket.emit('go-back-to-worlds')
        }
        document.body.classList.add('unlocked')
        this.$route.router.go('/worlds')
      },
    }
})
