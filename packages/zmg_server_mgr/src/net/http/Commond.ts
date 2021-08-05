import { GLog } from '../../Utils/Log/GLog';

export enum Commands {
	/** 获取任务列表 */
	getTaskList = 'getTaskList',

	/** 获取能量郭总数 */
	getFruitTotalNum = 'getFruitTotalNum',

	/** 获取能量果记录 */
	getFruitRecord = 'getFruitRecord',

	/** 获取能量果记录 */
	getTaskReward = 'getTaskReward',

	getClothDetailInf = 'getClothDetailInf',
	getGoodsList = 'getGoodsList',
	getGoodsDetailInf = 'getGoodsDetailInf',
	purchaseGoods = 'purChaseGoods',
	getMallDesc = 'getMallDesc',
	getOrderList = 'getOrderList',
	getGooldsTypeList = 'getGoodsTypeList',

	/** 勋章墙 */
	acceptMedal = 'acceptMedal',
	carryMedal = 'carryMedal',
	countMedal = 'countMedal',
	listMedal = 'listMedal',
	removeMedal = 'removeMedal',
	achievementMedal = 'achievementMedal',
	allMedal = 'allMedal',
	infoMedal = 'infoMedal',

	/** 勋章墙-新手引导 */
	isGuidedMedal = 'isGuidedMedal',
	recordGuideMedal = 'recordGuideMedal',

	/** 勋章墙-学伴 */
	getPartnerInfo = 'getPartnerInfo',
	getRoleDressUps = 'getRoleDressUps',

	//new
	carryUserMedal = 'carryUserMedal',
	noviewMedal = 'noviewMedal',
	viewMedal = 'viewMedal',
	catalogue = 'catalogue',
	getRank = 'getRank',
	getBatch = 'getBatch',

	//问卷调查配置
	getQuestionnaireConfig = 'getQuestionnaireConfig',
}

const localurlMap = {
	[Commands.getFruitRecord]: '/kidsStuApi/partner/api/op/fruitList',
	[Commands.getClothDetailInf]: '/kids/study/park/c/api/partner/dressUp/product/detail', //装扮详情

	//任务中间
	[Commands.getTaskReward]: '/kids/api/study/park/api/task/center/get/award', //领取奖励
	[Commands.getFruitTotalNum]: 'kids/study/park/c/api/v2/partner/energyFruit/amount', //查询能量果的总数
	[Commands.getTaskList]: '/kids/api/study/park/api/task/center/task/list', //任务中心列表

	// 奇妙商城相关接口
	[Commands.getMallDesc]: '/kids/study/park/c/api/fantastic/mall/desc', //商城描述图片地址
	[Commands.getOrderList]: '/kids/study/park/c/api/fantastic/mall/order/list', //订单列表
	[Commands.getGoodsDetailInf]: '/kids/study/park/c/api/fantastic/mall/product/detail', //商品详情
	[Commands.getGoodsList]: '/kids/study/park/c/api/fantastic/mall/product/list', //商品列表
	[Commands.getGooldsTypeList]: '/kids/study/park/c/api/v2/fantastic/mall/product/type/list', //商品分类列表
	[Commands.purchaseGoods]: '/kids/study/park/c/api/v2/fantastic/mall/purchase', //购买产品 {"commodityId": 0,"platform": "string","valueDeduction": 0}

	//勋章墙
	[Commands.acceptMedal]: '/kids/medal-wall/api/medal/accept', //收下成就勋章
	[Commands.carryMedal]: '/kids/medal-wall/api/medal/carry', //携带成就勋章
	[Commands.countMedal]: '/kids/medal-wall/api/medal/not-accepted/count', //获取用户未收下的成就勋章数量
	[Commands.listMedal]: '/kids/medal-wall/api/medal/not-accepted/list', //获取用户未收下的成就勋章数量
	[Commands.removeMedal]: '/kids/medal-wall/api/medal/remove', //卸下成就勋章
	[Commands.achievementMedal]: '/kids/medal-wall/api/user-medal-wall/achievement/page', //获取用户成就勋章-分页
	[Commands.allMedal]: '/kids/medal-wall/api/user-medal-wall/all', //获取用户勋章墙
	[Commands.infoMedal]: '/kids/medal-wall/api/user-medal/info', //获取用户勋章信息

	//勋章墙-新手引导
	[Commands.isGuidedMedal]: '/kids/medal-wall/api/guide/is-guided', //true为引导过则不再做引导
	[Commands.recordGuideMedal]: '/kids/medal-wall/api/guide/record-guide', //记录引导

	[Commands.getPartnerInfo]: '/kids/study/park/c/api/v2/partner/getPartnerInfo',
	[Commands.getRoleDressUps]: '/kids/study/park/c/api/partner/dressUp/query/userDressUps',

	[Commands.carryUserMedal]: '/kids/medal-wall/api/user-medal/carry', //获取当前学伴已携带的精灵信息(包括当前能力光环)
	[Commands.noviewMedal]: '/kids/medal-wall/api/user-medal/no-view', //查询用户未浏览的新精灵
	[Commands.viewMedal]: '/kids/medal-wall/api/user-medal/save/view-medal', //保存查看新精灵记录
	[Commands.catalogue]: '/kids/medal-wall/api/rank/medal/catalogue', //获取用户获取精灵情况 已获得/未获得
	[Commands.getRank]: '/kids/medal-wall/api/rank/medal/getRank', //根据条件用户获取排行榜信息

	[Commands.getBatch]: '/kids/study/park/c/api/partner/dressUp/query/userDressUps/batch', //批量获取用户装扮列表
	[Commands.getQuestionnaireConfig]: '/kids/api/feedback/get',
};

/**
 * 根据数据接口发送
 * @param commond 发送的数据接口名
 */
export function getExtraUrlByCommond(commond) {
	let urlmap = localurlMap;
	if (urlmap[commond]) {
		return urlmap[commond];
	} else {
		GLog.warn('未配置对应的extra url,请检查Commond.ts');
		return '';
	}
}
