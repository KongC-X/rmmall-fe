var _mm = require('util/mm.js')
var _order = {
	//获取物品列表
	
	getProductList : function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/get_order_cart_product.do'),
			success	: resolve,
			error 	: reject
});
	},
	//创建订单
	createOrderNum : function(productInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/create.do'),
			data	: productInfo,
			success	: resolve,
			error 	: reject
});
	},
	//获取订单列表
	getOrderList : function(listParam,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/list.do'),
			data	: listParam,
			success	: resolve,
			error 	: reject
});
	},
	//获取订单详情
	getOrderDetail : function(orderNumber,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/detail.do'),
			data	: {
				orderNo : orderNumber
			},
			success	: resolve,
			error 	: reject
});
	},
	//取消订单
	cancelOrder : function(orderNumber,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/cancel.do'),
			data	: {
				orderNo : orderNumber
			},
			success	: resolve,
			error 	: reject
});
	},
	//获取支付信息
	getPaymentInfo : function(orderNumber,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/pay.do'),
			data	: {
				orderNo : orderNumber
			},
			success	: resolve,
			error 	: reject
});
	},
	//获取支付信息状态
	getPaymentStatus : function(orderNumber,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/order/query_order_pay_status.do'),
			data	: {
				orderNo : orderNumber
			},
			success	: resolve,
			error 	: reject
});
	},
};

module.exports = _order;