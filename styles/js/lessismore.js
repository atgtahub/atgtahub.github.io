/*!
 * Adapted from Bootstrap docs JavaScript
 */


!function ($) {

  $(function () {

		orderTheLeftNavigations();

    function orderTheLeftNavigations(){
	    $('#navigation .sidenav').html($("#markdown-toc").html());
	    $('#navigation .sidenav ul').addClass("nav");
	    $("#markdown-toc").remove();

      // 添加Bootstrap表格样式 table-hover
      $(".docs-content table").addClass("table table-hover");
  	}

  	$(window).load(initilizeAfterLoad);

    function initilizeAfterLoad(){
      repairTheImagesWhichCrossTheMaxWidth();
    }

    // 重新计算图片显示大小。
  	function repairTheImagesWhichCrossTheMaxWidth(){
  		var images = $(".docs-content img");
  		if(images != undefined && images.length > 0){
  			for(var i=0; i< images.length;i++){
  				var imgWidth = images[i].width;
  				if( imgWidth >= 757 ){
  					 images[i].width = 757;
  				}
  			}
  		}
  	}
  })

}(jQuery)

/**
 * 修复"{{  }}" 不渲染问题
 */
var fixBrace = function () {
	var list = document.querySelectorAll('code');
	list.forEach(function(item){
		if (item.innerHTML.indexOf('\\{\\{') >= 0) {
			item.innerHTML = item.innerHTML.replace(/\\{\\{/g,'{{');
		}
		if (item.innerHTML.indexOf('\\}\\}') >= 0) {
			item.innerHTML = item.innerHTML.replace(/\\}\\}/g,'}}');
		}
		if (item.innerHTML.indexOf('\\{\\%') >= 0) {
			item.innerHTML = item.innerHTML.replace(/\\{\\%/g,'\{\%');
		}
		if (item.innerHTML.indexOf('\\%\\}') >= 0) {
			item.innerHTML = item.innerHTML.replace(/\\%\\}/g,'\%\}');
		}
	});
};
fixBrace();

/**
 * 设置所有a标签target属性
 */
document.querySelectorAll('a[href^="http"], a[href^="https"]').forEach(element => {
	element.target = '_blank';
});

