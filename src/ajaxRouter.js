import Index from './components/Index.vue'
import Facelift from './components/Facelift.vue'
import Space from './components/Space.vue'
import SelectObject from './components/SelectObject.vue'
import PersonalCenter from './components/PersonalCenter.vue'
import PictureBrowsing from './components/PictureBrowsing.vue'
import Chat from './components/Chat.vue'

export default [{
	path: '/',
	component: Index,
	name: "首页"
}, {
	path: '/facelift',
	component:Facelift,
	name: "换装"
}, {
	path: '/space',
	component: Space,
	name: "空间"
}, {
	path: '/selectobject',
	component: SelectObject,
	name: "对象选择"
}, {
	path: '/personalcenter',
	component:PersonalCenter,
	name: "个人中心"
}, {
	path: '/picturebrowsing',
	component: PictureBrowsing,
	name: "图片浏览"
}, {
	path: '/chat',
	component: Chat,
	name: "聊天"
}]