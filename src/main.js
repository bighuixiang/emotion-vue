import './assets/css/common.css' //公用样式
import './assets/js/flexible.js' //flexible

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Vonic from 'vonic'
Vue.use(Vonic)

import routeConfig from './router'
import * as API from './api'
import axios from 'axios'
import * as Filters from './filters';

Vue.prototype.$http = axios
//基础参数
Vue.prototype.getBasicData = Filters.getBasicData

Vue.prototype.API = API

Vue.filter('timeToNow', Filters.timeToNow);
Vue.filter('dateFormat', Filters.dateFormat);
Vue.filter('numberinteger', Filters.numberinteger);

import sess from './sess'
const beforeEach = (toRoute, fromRoute, next) => {
	//	console.log("================>beforeEach");
	const to = toRoute.path
	const from = fromRoute.path
	const scrollTop = Vonic.app.pageContentScrollTop()

	let h = sess.get(to)
	if(h && h.history) {
		Vonic.app.nextDirection('back')
		h.history = false
		sess.set(to, h)
	} else {
		sess.set(from || '/', {
			history: true,
			scrollTop: scrollTop
		})
		Vonic.app.nextDirection('forward')
	}
	next()
}

const afterEach = (toRoute, fromRoute) => {
	//	console.log("================>afterEach");
	const to = toRoute.path
	const from = fromRoute.path
	// [Custom Business] Never use history scrollTop when '/' => '/home'
	if(from == '/' && to == '/home') return

	const h = sess.get(to)
	if(h && h.scrollTop) {
		Vue.nextTick(() => {
			Vonic.app.pageContentScrollTop(h.scrollTop)
		})
	}
}
Vonic.app.setConfig("beforeEach", beforeEach);
Vonic.app.setConfig("afterEach", afterEach);
Vonic.app.setConfig("pushMethod", 'push');
//Vonic.app.setConfig("pageTransition", 'ios');
const setTitle = (title) => {
	let el = document.querySelector('[von-navbar="active"] > .title > span')
	if(el) el.textContent = title
}
Vue.prototype.setTitle = setTitle
Vue.use(Vonic.app, {
	routes: routeConfig,
	beforeEach,
	afterEach
})