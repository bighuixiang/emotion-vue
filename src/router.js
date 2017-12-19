import Index from './components/Index.vue'
import Facelift from './components/Facelift.vue'
import Space from './components/Space.vue'
import SelectObject from './components/SelectObject.vue'
import PersonalCenter from './components/PersonalCenter.vue'
import PictureBrowsing from './components/PictureBrowsing.vue'
import Chat from './components/Chat.vue'
import Message from './components/Message.vue'
import Interaction from './components/Interaction.vue'
import DiceGame from './components/DiceGame.vue'
import TossACoinGame from './components/TossACoinGame.vue'
import GuessGame from './components/GuessGame.vue'

export default [{
	path: '/',
	component:Index,
	name: "首页"
}, {
	path: '/facelift',
	component: Facelift,
	name: "换装"
}, {
	path: '/space',
	component:Space,
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
}, {
	path: '/message',
	component: Message,
	name: "消息"
}, {
	path: '/interaction',
	component:Interaction,
	name: "逛街"
}, {
	path: '/dicegame',
	component: DiceGame,
	name: "骰子游戏"
}, {
	path: '/tossacoingame',
	component: TossACoinGame,
	name: "掷硬币游戏"
}, {
	path: '/guessgame',
	component: GuessGame,
	name: "猜拳游戏"
}]