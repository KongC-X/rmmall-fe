require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var addressModal = require('./address-modal.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateIndex1 = require('./address.string');
var templateIndex2 = require('./product.string');
var page = {
	data : {
		selectedAddressId : null
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		
		this.loadAddress();
		this.loadProductList();
	},
	bindEvent : function(){
		var _this = this;
		//收获地址的选中
		$(document).on('click','.address-item',function(){
			var $this = $(this);
			$this.addClass('active').siblings('.address-item').removeClass('active'); 
			_this.data.selectedAddressId = $this.data('id');
	});
		//订单提交
		$(document).on('click','.order-submit',function(){
			
			if(_this.data.selectedAddressId){
				_order.createOrderNum({
					shippingId	: _this.data.selectedAddressId
				},function(res){
					window.location.href = './payment.html?orderNumber=' + res.orderNo;
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips('请选择收获地址');
			}
			
	});
		//地址的添加
		$(document).on('click','.address-add',function(){
			addressModal.show({
				isUpdate : false,
				onSuccess : function(){
					_this.loadAddress();
				},
			});		
	});
		//地址的编辑
		$(document).on('click','.address-update',function(e){
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId,function(res){
				addressModal.show({
				isUpdate : true,
				data : res,
				onSuccess : function(){
					_this.loadAddress();
				},
			});		
			},function(errMsg){
				_mm.errorTips(errMsg);
			})
			addressModal.show({
				isUpdate : false,
				onSuccess : function(){
					_this.loadAddress();
				},
			});		
	});
		//地址的删除
		$(document).on('click','.address-delete',function(e){
			e.stopPropagation();
			var id = $(this).parents('.address-item').data('id');
			 if(window.confirm('确认要删除该地址?')){
			 	_address.deleteAddress(id,function(res){
			 		_this.loadAddress();
			 	},function(errMsg){
			 		_mm.errorTips(errMsg);
			 	})
			 }
	});
},
	//加载地址详情
	loadAddress : function(){
		var _this = this;
		//请求cart信息
		_address.getLoadAddress(function(res){
			_this.addressFilter(res);
			var addressListHtml = _mm.renderHtml(templateIndex1,res);
			$('.address-con').html(addressListHtml);
		},function(errMsg){
			$('.address-con').html('<p class="err-tip">地址加载失败,刷新后重试</p>');
		});
		
	},
	addressFilter : function(data){
		if(this.data.selectedAddressId){
			var selectedAddressIdFlag = false;
			for (var i = 0,length=data.list.length; i < length; i++) {
				if (data.list[i].id === this.data.selectedAddressId) {
					data.list[i].isActive =true;
					selectedAddressIdFlag = true
				}
			}
			if(!selectedAddressIdFlag){
				this.data.selectedAddressId = null;
			}
		}
	},
	//加载商品列表详情
	loadProductList : function(){
		var _this = this;
		//请求cart信息
		_order.getProductList(function(res){
			var productListHtml = _mm.renderHtml(templateIndex2,res);
			$('.product-con').html(productListHtml);
		},function(errMsg){
			console.log(errMsg);
			$('.product-con').html('<p class="err-tip">空空如也,快去购物</p>');
		});
		
	},

};
$(function(){
	page.init();
});