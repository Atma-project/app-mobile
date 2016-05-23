import './worlds-list.scss'
import infos from '../../helpers/user/userInfos'

import Vue from 'vue'

export default Vue.extend({
    template: require('./worlds-list.html'),

    data() {
        return {infos}
    },

    ready() {
        console.log(this.infos)
    }
})
