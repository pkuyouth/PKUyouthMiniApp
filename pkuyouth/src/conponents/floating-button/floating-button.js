// conponents/floating-button/floating-button.js

const tools = require('../../libs/utilfuncs.js');

Component({
	options: {
		multipleSlots: true,
	},
	properties: {
		num: { // 按钮数量
			type: Number,
			value: 3,
			observer(newVal) {
				this.setData({
					num: newVal,
				});
			}
		},
		text: { // 按钮文字描述
			type: Array,
			value: [],
			observer(newVal) {
				this.setData({
					text: newVal,
				});
			}
		},
		icon: {
			type: Array,
			value: [],
			observer(newVal) {
				this.setData({
					icon: newVal,
				});
			}
		},
		tapChange: { // 单击后是否自动折叠
			type: Array,
			value: [true,true,true],
			observer(newVal) {
				this.setData({
					tapChange: newVal,
				});
			}
		},
		hasSearchBar: {
			type: Boolean,
			value: false,
			observer(newVal) {
				this.setData({
					hasSearchBar: newVal,
				});
			}
		},
		moveAction: {
			type: String,
			value: '',
			observer(newVal) {
				if (!this.data.unfolded) {
					if (newVal == 'left' && !this.data.showMenu) {
						this.showMenu();
					} else if (newVal == 'right' && this.data.showMenu) {
						this.hiddenMenu();
					};					
				};
			}
		}
	},
	data: {
		num: 0,
		text: [],
		icon: [],
		tapChange: [],
		hasSearchBar: false,
		onInit: true,
		unfolded: false, // 菜单栏折叠与否
		display: true, // 折叠打开中控制小按钮的display
		showMenu: true, // 显示菜单栏，或者隐藏到侧栏
		animationBase: {},
		animation_1: {},
		animation_2: {},
		animation_3: {},
		animation_4: {},
		animationTotal: {},
	},
	created() {
		let animation = wx.createAnimation({
			duration: 500,
			timingFunction: 'ease',
			transformOrigin: 'right bottom',
	    });
		this.setData({
			animationBase: animation,
		});
	},
	ready() {
		this.setData({ 
			unfolded: false,
			display: true, // 之后播放动画时还会反转，最后保持同步
		});
		this.playanimation();
		
		let initDone = function (_this) {
			_this.setData({
				onInit: false
			});
		};
		let _this = this;
		setTimeout(initDone,1000,_this); // 0.7s 后显示图标
	},
	methods: {
		changeStatus() {
			if (this.data.showMenu) {
				this.setData({
					unfolded: !this.data.unfolded,
				});
				this.playanimation();				
			}
		},
		changeDisplay(_this) {
			_this.setData({
				display: !_this.data.display,
			});
		},
		playanimation() { // 注意！ 进入后属性已经反转！
			let _this = this;
			if (this.data.unfolded) { // 关闭时（显示为展开），立即显示，再播放动画
				this.changeDisplay(_this);
			} else { // 展开时（显示为关闭），先播放完动画再隐藏
				setTimeout(this.changeDisplay,1000,_this);
			};

			if (this.data.unfolded) {
				this.unfoldAnimation();
			} else {
				this.foldAnimation();
			};
		},
		foldAnimation() {
			let animation = this.data.animationBase;
			this.setData({
				animation_1: animation.translateX(130).step({delay:200}).export(),
				animation_2: animation.translateX(130).step({delay:150}).export(),
				animation_3: animation.translateX(130).step({delay:100}).export(),
				animation_4: animation.translateX(130).step({delay:50}).export(),
			});
		},
		unfoldAnimation() {
			let animation = this.data.animationBase;
			this.setData({
				animation_1: animation.translateX(0).step({delay:50}).export(),
				animation_2: animation.translateX(0).step({delay:100}).export(),
				animation_3: animation.translateX(0).step({delay:150}).export(),
				animation_4: animation.translateX(0).step({delay:200}).export(),
			});
		},
		showMenu() {
			let animation = this.data.animationBase;
			this.setData({
				animationTotal: animation.translateX(0).step({delay:50}).export(),
				showMenu: true,
			});
		},
		hiddenMenu() {
			let animation = this.data.animationBase;
			this.setData({
				animationTotal: animation.translateX(65).step({delay:50}).export(),
				showMenu: false,
			});
		},
		tapBtn_1() {
			this.triggerEvent("tap-btn-one");
			if (this.data.tapChange[0]) {
				this.changeStatus();
			};
		},
		tapBtn_2() {
			this.triggerEvent("tap-btn-two");
			if (this.data.tapChange[1]) {
				this.changeStatus();
			};
		},
		tapBtn_3() {
			this.triggerEvent("tap-btn-three");
			if (this.data.tapChange[2]) {
				this.changeStatus();
			};
		},
		tapBtn_4() {
			this.triggerEvent("tap-btn-four");
			if (this.data.tapChange[3]) {
				this.changeStatus();		
			};			
		}
	}
})
