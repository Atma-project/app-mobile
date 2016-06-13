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
        this.worldsEl = $.getSelectorAll('.world')
        $.getSelector('.worlds').addEventListener('scroll', ::this.scrollHandler)
        TweenMax.staggerFromTo('.world', 0.4, {
            opacity: 0,
            scale: 0,
            y: 100
        }, {
            opacity: 1,
            scale: 1,
            y: 0
        }, 0.1)
    },

    methods: {
        toggleSlider() {
            this.sliderDisplay = true
        },

        scrollHandler() {
            if ($.getSelector('.worlds').scrollTop > 0) {
                TweenMax.to('.app-header h1, .app-header a', 0.6, {
                    opacity: 0,
                    y: -50
                })
            } else {
                TweenMax.to('.app-header h1, .app-header a', 0.4, {
                    opacity: 1,
                    y: 0
                })
            }

            for (var i = 0; i < this.worldsEl.length; i++) {
                if (this.worldsEl[i].offsetTop - $.getSelector('.worlds').scrollTop > 450) {
                    TweenMax.to(this.worldsEl[i], 0.6, {
                        opacity: 0.3
                    })
                } else {
                    TweenMax.to(this.worldsEl[i], 0.6, {
                        opacity: 1
                    })
                }
            }
        }
    }
})
