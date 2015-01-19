$(document).ready(function(){
	var start_bp = $('#start').height();
	var faq_bp = $('#faq').height() + $('#faq').position().top;
	var offer_bp = $('#offer').height() + $('#offer').position().top;;
	var photo_bp = $('#photo').height() + $('#photo').position().top;;
	var contact_bp = $('#contact').height() + $('#contact').position().top;;
	var lastScrollTop;
	var flag = false;
	$(window).scroll(function(event){
   		var st = $(this).scrollTop();
   		if (st === 0) {
   			flag = false;
   		}
   		if (st > lastScrollTop) {
			// downscroll code
			console.log('down');
   			if((st >= 0) && (st < start_bp) && flag === false) {
   					flag = true;
	    			$("html, body").one().animate({ scrollTop: start_bp }, 600, function() { 
	       				//flag = true;
	       				console.log('done');
	       			});
    			
    		}
    		else if((st > start_bp) && (st < faq_bp)) {
    			//$("html, body").animate({ scrollTop: faq_bp });
    		}

   		} 
   		else if(st < lastScrollTop) {
   			// upscroll code
   			console.log('up');
   		}

   		lastScrollTop = st;
	});
});