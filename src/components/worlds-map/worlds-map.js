import './worlds-map.scss'
import Vue from 'vue'
import $ from 'chirashi-imports'
// import WorldsScene from './worldsScene'
import 'gsap'
import 'helpers/gsap/ScrollToPlugin'

Vue.component('WorldsMap', {
    template: require('./worlds-map.html'),

    data() {
        return {

        }
    },

    props: ['worlds', 'mapDisplay', 'listDisplay', 'sliderDisplay'],

    created() {

    },

    ready() {
        // this.worldsScene = new WorldsScene($.getSelector('.worlds-map canvas'), this.worlds)
        TweenMax.set('.worlds-map', {
            scrollTo: {
                y: 200,
                x: 375
            }
        })

        TweenMax.staggerFromTo('.world', 2, {
            opacity: 0,
            scale: 0.8
        }, {
            opacity: 1,
            scale: 1
        }, 0.4)

        // TweenMax.from('.world:nth-child(1)', 2, {
        //     y: -10,
        //     yoyo: true,
        //     repeat: -1,
        //     ease: Sine.easeInOut
        // })
        //
        // TweenMax.from('.world:nth-child(2)', 2.5, {
        //     y: -5,
        //     yoyo: true,
        //     repeat: -1,
        //     ease: Sine.easeInOut
        // })
        //
        // TweenMax.from('.world:nth-child(3)', 2.5, {
        //     y: 10,
        //     x: -5,
        //     rotation: -5,
        //     yoyo: true,
        //     repeat: -1,
        //     ease: Sine.easeInOut
        // })
        //
        // TweenMax.from('.world:nth-child(4)', 1.5, {
        //     y: 5,
        //     yoyo: true,
        //     repeat: -1,
        //     ease: Sine.easeInOut
        // })
        //
        // TweenMax.from('.world:nth-child(5)', 3, {
        //     y: 5,
        //     yoyo: true,
        //     repeat: -1,
        //     ease: Sine.easeInOut
        // })
    },

    beforeDestroy() {
        TweenMax.staggerFromTo('.world', 2, {
            opacity: 1,
            scale: 1
        }, {
            opacity: 0,
            scale: 0.8
        }, 0.4)
    },

    methods: {

    }
})
