import "./worlds.scss"

import Vue from 'vue'
import worldsData from 'helpers/app/worlds'

export default Vue.extend({
    template: require('./worlds.html'),

    data() {
        return {
            mapDisplay: true,
            sliderDisplay: false,
            worlds : worldsData,
            currentWorld: {
                id: null,
                name: null,
                locked: null,
                lit: null
            }
        }
    },

    watch: {
        'mapDisplay': (val, oldVal) => {
            console.log('mapDisplay new: %s, old: %s', val, oldVal)
        },
        'sliderDisplay': (val, oldVal) => {
            console.log('sliderDisplay new: %s, old: %s', val, oldVal)
            if(!val) {
                TweenMax.to('.app-header h1, .app-header a', 1, {
                    opacity: 1,
                    y: 0,
                    ease: Expo.easeOut
                })
                TweenMax.to('footer', 1, {
                    opacity: 1,
                    y: 0,
                    ease: Expo.easeOut
                })
                TweenMax.to('.background-base', 0.8, {
                    opacity: 1
                })
            }
        },
        'currentWorld': (val, oldVal) => {
            console.log('currentWorld new: %s, old: %s', val, oldVal)
        }
    },

    created() {

    },

    ready() {

    },

    methods: {

    }
})
