import './worlds-list.scss'
import Vue from 'vue'
import $ from 'chirashi-imports'
import 'gsap'
import 'helpers/gsap/SplitText'
import SocketHandler from 'helpers/sockets/socket-handler'

Vue.component('WorldsList', {
    template: require('./worlds-list.html'),

    data() {
        return {

        }
    },

    props: ['worlds','sliderDisplay', 'currentWorld'],

    created() {

    },

    ready() {
        this.worldsEl = $.getSelectorAll('.world')

        for (var i = 0; i < this.worldsEl.length; i++) {
            if (this.worldsEl[i].offsetTop > 500) {
                TweenMax.to(this.worldsEl[i], 0.6, {
                    opacity: 0.3
                })
            }
        }

        $.getSelector('.worlds').addEventListener('scroll', ::this.scrollHandler)

        TweenMax.staggerFromTo('.world img', 0.4, {
            opacity: 0,
            scale: 0
        }, {
            opacity: 1,
            scale: 1
        }, 0.1)

        TweenMax.from('.world:nth-child(1) img', 2, {
            y: 10,
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

        let splitText = new SplitText('.world h2', {type:"chars"})
        TweenMax.staggerFromTo(splitText.chars, 0.4, {
            opacity: 0,
            y: 20,
            scale: 0
        }, {
            opacity: 1,
            y: 0,
            scale: 1
        }, 0.1)
    },

    methods: {
        toggleSlider(event) {
            TweenMax.to(event.target, 1, {
                scaleX: 1.7,
                scaleY: 1.7,
                y: 40,
                onComplete: () => {
                    this.sliderDisplay = true
                }
            })

            if (SocketHandler.listening) {
                this.currentWorld.id = '#' + $.parent(event.target).id
                SocketHandler.socket.emit('changed-current-world', this.currentWorld)
            } else {
                SocketHandler.init()

                SocketHandler.socket.on('connected', () => {
                    this.currentWorld.id = '#' + $.parent(event.target).id
                    SocketHandler.socket.emit('changed-current-world', this.currentWorld)
                })
            }
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
