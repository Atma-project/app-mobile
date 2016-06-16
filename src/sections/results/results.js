import './results.scss'

import Vue from 'vue'


export default Vue.extend({
    template: require('./results.html'),

    data() {
        return {}
    },

    ready() {
    },

    methods: {
      goToWorlds() {
        this.$route.router.go('/worlds')
        document.body.className = 'unlocked'
      },
    }
})
