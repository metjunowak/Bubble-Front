$(document).ready(function() {
  var menuHeight = 50;
  var divs = new Array('start','faq','offer','photo','contact');

  var breakPoints = [0];
  var flag = 0;

  $.each(divs, function(key, value) {
    breakPoints.push(getBreakPoints(value));
  });

  function getBreakPoints(div) {
    var bp = $('#'+div).height() + $('#'+div).position().top - menuHeight;
    return bp;
  }

  function goDown(position) {
    var index = 0;
    $.each(breakPoints, function(key, value) {
      if(position > value) {
        index = key+1;
      }
    });
    
    if(position > flag) {
      $("html, body").animate({ scrollTop: breakPoints[index] }, 600);
    }

    flag = breakPoints[index];

  }

  function goUp(position) {

  }



	$(window).scroll(function(event){
   	var st = $(this).scrollTop();
   	
   	if (st > lastScrollTop) {
      goDown(st);
   	} 
   	else if(st < lastScrollTop) {
      //upscroll
   		//goUp(st);
   	}

   	lastScrollTop = st;
	});


});