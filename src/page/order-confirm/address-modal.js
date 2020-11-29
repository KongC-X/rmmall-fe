var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var cities =  require('util/cities/index.js');
var templateIndex = require('./address-modal.string');
var addressModal = {
	show : function(option){
		this.option = option;
		this.option.data = option.data || {};
		this.$modalWrap = $('.modal-wrap');
		//渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//省份城市二级联动
		this.$modalWrap.find('#receiver-province').change(function(){
			var selectedProvince = $(this).val();
			
			_this.loadCities(selectedProvince);
		});
		//提交收获地址
		this.$modalWrap.find('.address-btn').click(function(){

			var receiverInfo = _this.getReceiverInfo(),
				isUpdate	 = _this.option.isUpdate;
				//新增收件人,验证通过
				if(!isUpdate && receiverInfo.status){
					_address.save(receiverInfo.data,function(res){
						_mm.successTips('地址添加成功');
						_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
					},function(errMsg){
						_mm.errorTips(errMsg);
					});
					//更新收件人,验证通过
				}else if(isUpdate && receiverInfo.status){
					_address.update(receiverInfo.data,function(res){
						_mm.successTips('地址修改成功');
						_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
					},function(errMsg){
						_mm.errorTips(errMsg);
					});
				}else{
					_mm.errorTips(receiverInfo.errMsg || '发送了错误');
				}
		});
		this.$modalWrap.find('.close').click(function(){
			_this.hide();
		});
		this.$modalWrap.find('.modal-container').click(function(e){
			e.stopPropagation();
		});
	},
	loadModal : function(){
		var addressModalHtml = _mm.renderHtml(templateIndex,{
			isUpdate : this.option.isUpdate,
			data 	 : this.option.data
		});
		this.$modalWrap.html(addressModalHtml);
		//加载省份
		this.loadProvince();
		//加载城市
		//this.loadCities();

	},
	loadProvince : function(){
		var provinces = cities.getProvinces() || [],
		$provinceSelect = this.$modalWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOption(provinces));
		//如果更新地址并且有省份信息做省份的回填
		if(this.option.isUpdate && this.option.data.receiverProvince){
			$provinceSelect.val(this.option.data.receiverProvince);
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	//加载城市信息
	loadCities : function(provinceName){
		var  cities1 = cities.getCities(provinceName) || [],
		     $citySelect= this.$modalWrap.find('#receiver-city');
		     //console.log(cities1);
		      $citySelect.html(this.getSelectOption(cities1));
		     if(this.option.isUpdate && this.option.data.receiverCity){
			    $citySelect.val(this.option.data.receiverCity);
		} 

	},
	//获取表单收件人信息,并且表单验证
	getReceiverInfo : function(){
		var receiverInfo = {},
		    result = {
		    	status : false
		    };
		    receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
		    receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
		    receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
		    receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
		    receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
		    receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zipCode').val());
		    if(this.option.isUpdate){
		    	receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());
		    }
		    if(!receiverInfo.receiverName){
		    	result.errMsg = '请输入收件人姓名';
		    }else if(!receiverInfo.receiverProvince){
		    	result.errMsg = '请选择省份';
		    }
		    else if(!receiverInfo.receiverCity){
		    	result.errMsg = '请选择城市';
		    }
		    else if(!receiverInfo.receiverPhone){
		    	result.errMsg = '请输入11位手机号';

		    }
		    else if(11 !== receiverInfo.receiverPhone.length){
		    	console.log(receiverInfo.receiverPhone.length)
		    	result.errMsg = '请输入11位手机号';
		    }
		    else if(!receiverInfo.receiverAddress){
		    	result.errMsg = '请输入详细地址';
		    }else{
		    	//验证通过
		    	result.status = true;
		    	result.data = receiverInfo;
		    }
		    return result;
	},
	getSelectOption : function(optionArray){
		var html = '<option value="">请选择</option>';
		for(var i = 0,length= optionArray.length;i<length;i++){
		html += '<option value="'+ optionArray[i] + '">' + optionArray[i] + '</option>';
		}
		return html;

	},
	hide : function(){
		this.$modalWrap.empty();
	},
};

module.exports =  addressModal;