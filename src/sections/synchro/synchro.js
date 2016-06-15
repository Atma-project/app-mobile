import './synchro.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'
import 'gsap'

import SocketHandler from 'helpers/sockets/socket-handler'

export default Vue.extend({
    template: require('./synchro.html'),

    data() {
        return {
        }
    },

    ready() {
        this.buildWave(90, 60)
        TweenMax.to(this.$el, 1, {
            opacity: 1,
            onComplete: () => {
                this.listenForServer()
            }
        })
    },

    methods: {
        listenForServer() {
            //FAKE !!!!!!!!!!!!!!!!!!
            window.setTimeout(() => {
                SocketHandler.init()
                SocketHandler.socket.on('connected', () => {
                    SocketHandler.socket.emit('phone-connected')
                    console.log('connected')
                    this.displayWelcome()
                })
            }, 3000)
        },

        displayWelcome() {
            let animationEvent = this.wichAnimationEvent()
            animationEvent && document.addEventListener(animationEvent, () => {
                TweenMax.to(this.$el, 1.0, {
                    opacity: 0,
                    onComplete: () => {
                        this.$route.router.go('/worlds')
                    }
                })
            })

            TweenMax.to('.bloc-picto, .loader', 1, {
                opacity: 0
            })
            TweenMax.to('.welcome', 1, {
                opacity: 1,
                onComplete: () => {
                    let logo = $.find(this.$el, '.logo')[0]
                    logo.classList.add('animate')
                }
            })
        },

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
        },

        buildWave(w, h) {

            const path = document.querySelector('#wave')
            const m = 0.512286623256592433

            const a = h / 4
            const y = h / 2

            const pathData = [
            'M', w * 0, y + a / 2,
            'c',
              a * m, 0,
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,

            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a,
            's',
              -(1 - a) * m, a,
              a, a,
            's',
              -(1 - a) * m, -a,
              a, -a
            ].join(' ')

            path.setAttribute('d', pathData)
        }
    }
})
