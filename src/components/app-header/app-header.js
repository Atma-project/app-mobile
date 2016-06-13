import './app-header.scss'
import Vue from 'vue'
import $ from 'chirashi-imports'
import 'gsap'
import 'helpers/gsap/DrawSVGPlugin'
import 'helpers/gsap/MorphSVGPlugin'

Vue.component('AppHeader', {
    template: require('./app-header.html'),

    data() {
        return {

        }
    },

    props: ['mapDisplay', 'sliderDisplay'],

    created() {

    },

    ready() {

        TweenMax.staggerFromTo('.app-header h1, .app-header a', 0.4, {
            opacity: 0,
            y: -100,
            ease: Expo.easeOut
        }, {
            opacity: 1,
            y: 0,
            ease: Expo.easeOut
        }, 0.1)

        TweenMax.staggerFromTo('#list-icon ellipse, #list-icon line', 0.4, {
            drawSVG: "0"
        }, {
            drawSVG: "100%"
        }, 0.1)
    },

    methods: {
        changeDisplay() {
            if(this.mapDisplay) {
                this.mapDisplay = !this.mapDisplay
                this.sliderDisplay = false

                TweenMax.staggerFromTo('#list-icon ellipse, #list-icon line', 0.4, {
                    drawSVG: "100%"
                }, {
                    drawSVG: "0"
                }, 0.1)
                TweenMax.staggerFromTo('#map-icon path, #map-icon circle', 0.4, {
                    opacity: 0,
                    drawSVG: "0"
                }, {
                    opacity: 1,
                    drawSVG: "100%",
                    delay: 0.345
                }, 0.1)
            } else {
                this.mapDisplay = !this.mapDisplay
                this.sliderDisplay = false

                TweenMax.staggerFromTo('#map-icon path, #map-icon circle', 0.4, {
                    drawSVG: "100%"
                }, {
                    drawSVG: "0"
                }, 0.1)
                TweenMax.staggerFromTo('#list-icon ellipse, #list-icon line', 0.4, {
                    opacity: 0,
                    drawSVG: "0"
                }, {
                    opacity: 1,
                    drawSVG: "100%",
                    delay: 0.345
                }, 0.1)
            }

        }
    }
})
