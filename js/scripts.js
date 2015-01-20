$(document).ready(function() {
  var menuHeight = $('#navigation').height();
  var divs = new Array('start','faq','offer','photo','contact');

  var breakPoints = [0];
  var flag = true;
  var lastScrollTop;

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
    
    $("html, body").animate({ scrollTop: breakPoints[index] }, 700);
    setTimeout(function() {
      flag = true;
    }, 800);
  }

  function goUp(position) {
    var index = 0;
    $.each(breakPoints, function(key, value) {
      if(position >= value) {
        index = key;
      }
    });

    $("html, body").animate({ scrollTop: breakPoints[index] }, 700);
    setTimeout(function() {
      flag = true;
    }, 800);   
  }


	$(window).scroll(function(event) {
   	var st = $(this).scrollTop();
   	
   	if (st > lastScrollTop && flag) {
      flag = false;
      goDown(st);
   	} 
   	else if(st < lastScrollTop && flag) {
      flag = false;
   		goUp(st);
   	}

   	lastScrollTop = st;
	});


});