import './remote.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'
import 'gsap'
import 'helpers/gsap/MorphSVGPlugin'
import SocketHandler from 'helpers/sockets/socket-handler'
let tween


export default Vue.extend({
    template: require('./remote.html'),

    data() {
        return {
            clicked: false,
            experienceStarted: false,
            runing: false
        }
    },

    ready() {
        this.show()
        this.manageClick()

        if (SocketHandler.listening) {
            SocketHandler.socket.on('end-experience', () => {
              this.$route.router.go('/results')
            })

        } else {
            SocketHandler.init()
            SocketHandler.socket.on('end-experience', () => {
              this.$route.router.go('/results')
            })
        }
    },

    methods: {

        goToWorlds() {
          this.$route.router.go('/worlds')
        },

        show() {
            TweenMax.to('.instructions', 0.6, {y: '-50%', alpha: 1, delay: 1, ease: Power2.easeIn, onComplete: () => {
                TweenLite.to(".instructions", 0.6, {y: '-40%', alpha: 0, delay: 4, ease: Power4.easeOut, onComplete: () => {
                    TweenMax.staggerTo('.to-show', 1, {opacity: 1}, 0.2);
                }})
            }})

            TweenMax.to('.loader', 0.6, {alpha: 1, delay: 1, ease: Power2.easeIn, onComplete: () => {
                TweenLite.to(".loader", 0.6, {alpha: 0, delay: 4, ease: Power4.easeOut, onComplete: () => {
                }})
            }})
        },

        counter() {
          var counter = { var: 0 };
          var tal = document.getElementById("counter");

           tween = TweenMax.to(counter, 180, {
                var: 90000,
                onUpdate: function () {
                    tal.innerHTML = Math.ceil(counter.var);
                },
                ease:Circ.easeOut
            });
        },

        manageClick() {

            document.querySelector('.button').addEventListener('click', () => {
                document.querySelector('.shape').classList.toggle('hide')
                document.querySelector('.restart').classList.toggle('show')

                if (!this.clicked) {
                    TweenLite.to("#play", 0.6, {morphSVG:"#two", x: 0, ease: Power4.easeOut})
                    TweenLite.to("#one", 0.6, {alpha: 1, x: 0, ease: Power4.easeOut})
                    this.clicked = true
                    if (this.runing) {
                        tween.play()
                    }
                    if (!this.experienceStarted) {
                        SocketHandler.socket.emit('start-experience')
                        this.counter()
                        this.experienceStarted = true
                        this.runing = true
                    }
                } else {
                    TweenMax.to('#two', 0.4, {x: 16, ease: Power2.easeIn, onComplete: () => {
                        TweenLite.to("#play", 0.4, {morphSVG:"#play", x: 10, ease: Power4.easeOut})
                    }})
                    TweenMax.to('#one', 0.4, {x: -16, ease: Power2.easeIn, onComplete: () => {
                        TweenLite.to("#one", 0.2, {alpha: 0, ease: Power4.easeOut})
                    }})
                    this.clicked = false
                    tween.pause()
                }
            })

            document.querySelector('.shape').addEventListener('click', () => {
                document.querySelector('.shape').classList.toggle('paused')
            })
        },
    }
})
