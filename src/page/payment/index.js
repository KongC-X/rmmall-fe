require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init :function(){
		this.onLoad();
	},
	
	onLoad:function(){
		this.loadPayment();

	},
	//加载订单详情
	loadPayment : function(){
		var orderDetailHtml = "",
			_this = this,
			$content = $('.page-wrap');
			_order.getPaymentInfo(this.data.orderNumber,function(res){
				//渲染html
				orderDetailHtml = _mm.renderHtml(templateIndex,res);
				$content.html(orderDetailHtml);	
				_this.listenOrderStatus();
			},function(errMsg){
				$content.html('<p class="err-tip>'+ errMsg +'</p>"')
			});

	},
	listenOrderStatus : function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_order.getPaymentStatus(_this.data.orderNumber,function(res){
				if (res == true) {
					window.location.href = './result.html?type=payment&orderNumber='+ _this.data.orderNumber;
				}
			},function(errMsg){

			});
		},5000);
	}

};

$(function(){
	page.init();
});
