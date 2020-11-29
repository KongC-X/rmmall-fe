require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
 var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init :function(){
		this.onLoad();
		this.bindEvent();

	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.order-cancel',function(){
			_order.cancelOrder(_this.data.orderNumber,function(res){
				_mm.successTips('取消订单成功');
				_this.loadDetail();
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	onLoad:function(){
		navSide.init({
			name: 'order-list'
		});
		this.loadDetail();
		
	},
	//加载订单详情
	loadDetail : function(){
		var orderDetailHtml = "",
			_this = this,
			$content = $('.content');
			_order.getOrderDetail(this.data.orderNumber,function(res){
				_this.dataFilter(res);
				//渲染html
				orderDetailHtml = _mm.renderHtml(templateIndex,res);
				$content.html(orderDetailHtml);
				
			},function(errMsg){
				$content.html('<p class="err-tip>'+ errMsg +'</p>"')
			});

	},
	//数据适配
	dataFilter : function(data){
		data.needPay = data.status == 10 ; 
		data.isCancelable = data.status == 10 ; 
		console.log(data.isCancelable)
	}

};

$(function(){
	page.init();
});
