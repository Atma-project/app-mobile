import './worlds-list.scss'
import Vue from 'vue'
import $ from 'chirashi-imports'
import 'gsap'

Vue.component('WorldsList', {
    template: require('./worlds-list.html'),

    data() {
        return {

        }
    },

    props: ['worlds','sliderDisplay'],

    created() {

    },

    ready() {
        $.getSelector('.worlds').addEventListener('scroll', ::this.scrolled)

        TweenMax.staggerFromTo('.world', 0.4, {
            opacity: 0,
            scale: 0,
            y: 100
        }, {
            opacity: 1,
            scale: 1,
            y: 0
        }, 0.1)

        TweenMax.from('.world:nth-child(1) img', 2, {
            y: -10,
            yoyo: true,
            repeat: -1,
            ease: Sine.easeInOut
        })

        TweenMax.from('.world:nth-child(2) img', 2.5, {
            y: -5,
            yoyo: true,
            repeat: -1,
            ease: Sine.easeInOut
        })

        TweenMax.from('.world:nth-child(3) img', 2.5, {
            y: 10,
            x: -5,
            rotation: -5,
            yoyo: true,
            repeat: -1,
            ease: Sine.easeInOut
        })

        TweenMax.from('.world:nth-child(4) img', 1.5, {
            y: 5,
            yoyo: true,
            repeat: -1,
            ease: Sine.easeInOut
        })

        TweenMax.from('.world:nth-child(5) img', 3, {
            y: 5,
            yoyo: true,
            repeat: -1,
            ease: Sine.easeInOut
        })
    },

    methods: {
        toggleSlider() {
            this.sliderDisplay = true
        },

        scrolled() {
            if($.getSelector('.worlds').scrollTop > 0) {
                
            }
        }
    }
})
