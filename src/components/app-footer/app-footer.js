import './app-footer.scss'
import Vue from 'vue'
import $ from 'chirashi-imports'
import 'gsap'

Vue.component('AppFooter', {
    template: require('./app-footer.html'),

    data() {
        return {

        }
    },

    created() {

    },

    ready() {
        let links = $.find(this.$el, 'a')
        TweenMax.staggerFromTo(links, 0.4, {
            opacity: 0,
            y: 100,
            ease: Expo.easeOut
        }, {
            opacity: 1,
            y: 0,
            ease: Expo.easeOut
        }, 0.1)
    },

    methods: {

    }
})
