import './splashscreen.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'
import 'gsap'

export default Vue.extend({
    template: require('./splashscreen.html'),

    data() {
        return {
        }
    },

    created() {

    },

    ready() {
        let animationEvent = this.wichAnimationEvent()
        animationEvent && document.addEventListener(animationEvent, () => {
            document.querySelector('.splashscreen').addEventListener('click', () => {
                TweenMax.to(this.$el, 1.0, {
                    opacity: 0,
                    onComplete: () => {
                        this.$route.router.go('/synchro')
                    }
                })
            })
        })
        let logo = $.find(this.$el, '.logo')[0]
        logo.classList.add('animate')
    },

    methods: {
        wichAnimationEvent() {
            let t
            let el = document.createElement('fakeElement')
            let animations = {
                'animation':'animationend',
                'OAnimation':'oAnimationend',
                'MozAnimation':'animationend',
                'WebkitAnimation':'webkitAnimationend'
            }

            for (t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t]
                }
            }
        }
    }
})
