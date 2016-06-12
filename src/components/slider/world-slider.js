import $ from 'chirashi-imports'
import Slider from 'chirashi-slider'

const defaults = {
    duration: 0.4,
    mouseEnabled: true,
    wrapper: '.slider-wrapper',
    slides: '.slide',
    size: 'slide',
    infinite: true,
    visibleItems: 3,
    autoResize: false
}


export default class WorldSlider extends Slider {
    constructor (options) {
        super($.defaultify(options, defaults))
    }

    clearAnimation () {
        TweenMax.set(this.slides, {
           clearProps: 'all'
       })
    }

    resize() {
        super.resize()

        if (this.killed || this.animating) return

        this.windowW = window.innerWidth

        this.previousDelta = 0
        this.slidesPositions = []

        TweenMax.set(this.slides, {
            x: -(this.slideSize.width + this.gutter) * this.current
        })

        let containerPos = $.screenPosition(this.container)

        $.forEach(this.slides, (slide) => {
            let screenPos = $.screenPosition(slide)

            if (this.options.update != 'screen') {
                screenPos.left -= containerPos.left
                screenPos.right -= containerPos.left
            }

            this.slidesPositions.push(screenPos)

        }, true)

        let last = this.nbSlide-1,
            slideWidth = this.nbSlide * (this.options.itemsPerSlide * (this.slideSize.width + this.gutter))

        this.slidesPositions[last].left -= slideWidth
        this.slidesPositions[last].right -= slideWidth

        TweenMax.set(this.slides[last], {
            x: '-='+slideWidth
        })
    }

    updateSlides (backward) {
        let slidesToMove, index = 0, slideWidth = (this.options.itemsPerSlide * (this.slideSize.width + this.gutter))
        let delta = this.nbSlide * slideWidth

        if (backward) {
            slidesToMove = this.slides.filter((slide) => {
                let move = Math.round(this.slidesPositions[index].left) >= (this.options.update != 'screen' ? slideWidth : this.windowW)

                if (move) {
                    this.slidesPositions[index].left -= delta
                    this.slidesPositions[index].right -= delta
                }

                ++index
                return move
            })
        }
        else {
            slidesToMove = this.slides.filter((slide) => {
                let move = Math.round(this.slidesPositions[index].right) <= 0

                if (move) {
                    this.slidesPositions[index].left += delta
                    this.slidesPositions[index].right += delta
                }

                ++index
                return move
            })
        }

        TweenMax.set(slidesToMove, {
            x: (backward ? '-' : '+') + '=' + delta
        })
    }

    onDrag (slider, delta) {
        if (this.animating || this.current == this.target) return

        delta = -delta

        // if (Math.abs(delta) < 20) return

        let currentDelta = delta - this.previousDelta
        TweenMax.set(this.slides, {
            x: '-=' + currentDelta
        })

        for (let i = this.slidesPositions.length-1; i >= 0; --i) {
            this.slidesPositions[i].left -= currentDelta
            this.slidesPositions[i].right -= currentDelta
        }

        this.updateSlides(delta < 0)

        this.previousDelta = delta
    }

    onDragEnd (slider) {

        TweenMax.to(this.slides, this.options.duration, {
            x: '+=' + this.previousDelta,
            ease: Expo.easeOut,
            onComplete: () => {
                for (let i = this.slidesPositions.length-1; i >= 0; --i) {
                    this.slidesPositions[i].left += this.previousDelta
                    this.slidesPositions[i].right += this.previousDelta
                }

                this.updateSlides(this.previousDelta < 0)

                this.previousDelta = 0
            }
        })
    }

    animationTween(slider, callback, direction) {
        if (this.current == this.target) return callback()

        let delta = this.target - this.current, backward
        if (delta < 0) delta += this.nbSlide

        let middle = ~~(this.nbSlide/2)

        backward = direction ? direction == 'down' : delta > middle

        if (backward) delta -= this.nbSlide

        delta *= this.options.itemsPerSlide * (this.slideSize.width + this.gutter)
        delta = delta - this.previousDelta

        this.updateSlides(backward)

        let tl = new TimelineMax({
            onComplete: () => {
                for (let i = this.slidesPositions.length-1; i >= 0; --i) {
                    this.slidesPositions[i].left -= delta
                    this.slidesPositions[i].right -= delta
                }

                callback()

                this.updateSlides(backward)
            }
        })

        tl.to(this.slides, this.options.duration, {
            x: '-=' + delta,
            ease: Expo.easeOut
        })

        this.previousDelta = 0

        return tl
    }
}
