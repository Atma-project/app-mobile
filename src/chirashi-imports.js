//core
import getSelector from 'chirashi/src/core/get-selector'
import getSelectorAll from 'chirashi/src/core/get-selector-all'

//dom
import append from 'chirashi/src/dom/append'
import attr from 'chirashi/src/dom/attr'
import closest from 'chirashi/src/dom/closest'
import find from 'chirashi/src/dom/find'
import findOne from 'chirashi/src/dom/find-one'

//events
import load from 'chirashi/src/events/load'
import on from 'chirashi/src/events/on'
import off from 'chirashi/src/events/off'
import resize from 'chirashi/src/events/resize'

//styles
import style from 'chirashi/src/styles/style'
import size from 'chirashi/src/styles/size'
import width from 'chirashi/src/styles/width'
import height from 'chirashi/src/styles/height'

export default {
    //core
    getSelector,
    getSelectorAll,

    //dom
    append,
    attr,
    closest,
    find,
    findOne,

    //events
    load,
    on,
    off,
    resize,

    //styles
    style,
    size,
    width,
    height
}
