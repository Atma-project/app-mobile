import config from 'config'
import routes from 'routes'

import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash'

import Sections from 'sections'

Vue.use(VueRouter)

const router = new VueRouter(config.router)

let map = {}
_.forEach(routes, (routeConfig, routeKey) => {
    console.log(routeConfig)
})
