import './dynamic-background.scss'
import Vue from 'vue'
import $ from 'chirashi-imports'
import StarScene from './starScene'

Vue.component('DynamicBackground', {
    template: require('./dynamic-background.html'),

    ready() {
        this.starScene = new StarScene($.getSelector('.stars'))
    }
})
