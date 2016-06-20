import './slider.scss'

import Vue from 'vue'
import $ from 'chirashi-imports'
import WorldSlider from './world-slider.js'
import SocketHandler from 'helpers/sockets/socket-handler'
import 'gsap'

Vue.component('Slider', {
    template: require('./slider.html'),

    data() {
        return {

        }
    },

    props: ['worlds', 'currentWorld'],

    created() {

    },

    ready() {
        TweenMax.to('.app-header h1, .app-header a', 1, {
            opacity: 0,
            y: -100,
            ease: Expo.easeOut
        })
        TweenMax.to('footer', 1, {
            opacity: 0,
            y: 100,
            ease: Expo.easeOut
        })

        TweenMax.to('.background-locked, .background-unlocked', 0.8, {
            opacity: 0
        })
        TweenMax.to('.background-lit', 0.8, {
            opacity: 1
        })
        this.createMobileSlider()
        this.animateWorlds()
    },

    beforeDestroy() {

    },

    methods: {
        createMobileSlider() {
            Vue.nextTick(() => {
                Vue.nextTick(() => {
                    this.mobileSlider = new WorldSlider({
                        container: $.getSelector('.slider'),
                        size: {
                            width: 'container',
                            height: 'slide'
                        },
                        bullets: {
                            wrapper: 'bullets',
                            element: '',
                            arrows: {
                                class: 'arrow',
                                element: '<svg x="0px" y="0px" viewBox="0 0 40.1 67.1"><polygon class="st0" points="5.4,67.1 1.1,62.9 31.4,32.6 0,4.5 4,0 40.1,32.4 "/></svg>'
                            }
                        }
                    })

                    let slides = $.getSelectorAll('.slide')

                    this.mobileSlider.on('before', (target, current) => {

                        if(slides[target].classList.contains('unlocked')) {
                            TweenMax.to('.background-locked', 0.8, {
                                opacity: 0
                            })
                            TweenMax.to('.background-unlocked', 0.8, {
                                opacity: 1
                            })
                        } else if(slides[target].classList.contains('locked')) {
                            TweenMax.to('.background-unlocked', 0.8, {
                                opacity: 0
                            })
                            TweenMax.to('.background-locked', 0.8, {
                                opacity: 1
                            })
                        } else if(slides[target].classList.contains('lit')) {
                            TweenMax.to('.background-locked, .background-unlocked', 0.8, {
                                opacity: 0
                            })
                            TweenMax.to('.background-lit', 0.8, {
                                opacity: 1
                            })
                        }

                        if (SocketHandler.listening) {
                            this.currentWorld.id = '#' + slides[target].id
                            SocketHandler.socket.emit('changed-current-world', this.currentWorld)
                        } else {
                            SocketHandler.init()

                            SocketHandler.socket.on('connected', () => {
                                this.currentWorld.id = '#' + slides[target].id
                                SocketHandler.socket.emit('changed-current-world', this.currentWorld)
                            })
                        }
                    })
                })
            })
        },

        killMobileSlider() {
            this.mobileSlider.kill()
        },

        goToScrollContent(event) {
            TweenMax.to('.arrow', 0.4, {
                opacity: 0
            })
            TweenMax.to($.closest(event.target, '.slide'), 1, {
                y: -667
            })
        },

        openPopin(event) {
            TweenMax.to('.slider-wrapper', 0.4, {
                opacity: 0
            })
            TweenMax.to('.bullets', 0.4, {
                opacity: 0,
                onComplete: () => {
                    $.style($.getSelector('.slider-wrapper'), {"display": "none"})
                    this.killMobileSlider()
                }
            })
            TweenMax.staggerFromTo('#map-icon path, #map-icon circle', 0.4, {
                opacity: 1,
                drawSVG: "100%"
            }, {
                opacity: 0,
                drawSVG: "0",
            }, 0.1)

            $.style($.getSelector('.popin'), {"display": "block"})
            TweenMax.fromTo('.popin', 0.4, {
                opacity: 0,
                y: 400
            }, {
                opacity: 1,
                y: 0
            })
        },

        closePopin() {
            TweenMax.to('.arrow', 0.4, {
                opacity: 1
            })
            TweenMax.fromTo('.popin', 0.4, {
                opacity: 1,
                y: 0
            }, {
                opacity: 0,
                y: 400,
                onComplete: () => {
                    $.style($.getSelector('.popin'), {"display": "none"})
                }
            })
            this.$el.scrollTop = 0
            this.createMobileSlider()
            $.style($.getSelector('.slider-wrapper'), {"display": "block"})
            TweenMax.to('.slider-wrapper', 0.4, {
                opacity: 1
            })
            TweenMax.to('.bullets', 0.4, {
                opacity: 1
            })
            TweenMax.staggerFromTo('#map-icon path, #map-icon circle', 0.4, {
                opacity: 0,
                drawSVG: "0"
            }, {
                opacity: 1,
                drawSVG: "100%",
            }, 0.1)
        },

        goToRemote() {

            TweenMax.to('.slider', 0.4, {
                opacity: 0,
                onComplete: () => {
                    SocketHandler.socket.emit('go-to-experience')
                    this.$route.router.go('/remote')
                }
            })
        },

        animateWorlds() {
            TweenMax.from('.slide:nth-child(1) .img-wrapper img', 2, {
                y: -10,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })

            TweenMax.from('.slide:nth-child(2) .img-wrapper img', 2.5, {
                y: -5,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })

            TweenMax.from('.slide:nth-child(3) .img-wrapper img', 2.5, {
                y: 10,
                x: -5,
                rotation: -5,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })

            TweenMax.from('.slide:nth-child(4) .img-wrapper img', 1.5, {
                y: 5,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })

            TweenMax.from('.slide:nth-child(5) .img-wrapper img', 3, {
                y: 5,
                yoyo: true,
                repeat: -1,
                ease: Sine.easeInOut
            })
        }
    }
})
