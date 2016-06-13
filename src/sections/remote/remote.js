import './remote.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'
import 'gsap'
import 'helpers/gsap/MorphSVGPlugin'


export default Vue.extend({
    template: require('./remote.html'),

    data() {
        return {}
    },

    ready() {
        this.show()
        this.manageClick()
    },

    methods: {
        show() {
            TweenMax.to('.instructions', 0.6, {y: '-50%', alpha: 1, delay: 1, ease: Power2.easeIn, onComplete: () => {
                TweenLite.to(".instructions", 0.6, {y: '-40%', alpha: 0, delay: 4, ease: Power4.easeOut, onComplete: () => {
                    TweenMax.staggerTo('.to-show', 1, {opacity: 1}, 0.2);
                }})
            }})

            TweenMax.to('.loader', 0.6, {alpha: 1, delay: 1, ease: Power2.easeIn, onComplete: () => {
                TweenLite.to(".loader", 0.6, {alpha: 0, delay: 4, ease: Power4.easeOut})
            }})
        },

        manageClick() {
            var clicked = false;

            document.querySelector('.button').addEventListener('click', () => {
                document.querySelector('.shape').classList.toggle('hide')
                document.querySelector('.restart').classList.toggle('show')

                if (!clicked) {
                    TweenMax.to('#two', 0.4, {x: 16, ease: Power2.easeIn, onComplete: () => {
                        TweenLite.to("#two", 0.4, {morphSVG:"#play", x: 10, ease: Power4.easeOut})
                    }})
                    TweenMax.to('#one', 0.4, {x: -16, ease: Power2.easeIn, onComplete: () => {
                        TweenLite.to("#one", 0.2, {alpha: 0, ease: Power4.easeOut})
                    }})
                    clicked = true
                } else {
                    TweenLite.to("#two", 0.6, {morphSVG:"#two", x: 0, ease: Power4.easeOut})
                    TweenLite.to("#one", 0.6, {alpha: 1, x: 0, ease: Power4.easeOut})
                    clicked = false
                }
            })

            document.querySelector('.shape').addEventListener('click', () => {
                document.querySelector('.shape').classList.toggle('paused')
            })
        },
    }
})
