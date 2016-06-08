import "./worlds.scss"

import Vue from 'vue'
import worldsData from 'helpers/app/worlds'

export default Vue.extend({
    template: require('./worlds.html'),

    data() {
        return {
            mapDisplay: true,
            worlds : worldsData
        }
    },

    watch: {
        'mapDisplay': (val, oldVal) => {
          console.log('new: %s, old: %s', val, oldVal)
        }
    },

    created() {

    },

    ready() {
        
    },

    methods: {

    }
})
