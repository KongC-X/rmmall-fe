require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();

    if(type === 'payment'){
		var $orderNumber = $element.find('.order-number');
		$orderNumber.attr('href' , $orderNumber.attr('href')+_mm.getUrlParam('orderNumber'));
	}
})