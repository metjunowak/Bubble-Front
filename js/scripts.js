$(document).ready(function() {
  var menuHeight = 50;
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
    if(index == 0) {
      showNormalMenu();
    }
    setTimeout(function() {
      flag = true;
    }, 800);   
  }

  function showSmallMenu() {
    $('#navigation').animate({height:50},700)
  }

  function showNormalMenu() {
    $('#navigation').animate({height:110},700)
  }


	$(window).scroll(function(event) {
   	var st = $(this).scrollTop();

    if(st>200) {
      $("#navigation").addClass("nav-small");
    }
    else if(st<200) {
      $("#navigation").removeClass("nav-small");
    }
   	
   	if (st > lastScrollTop && flag) {
      flag = false;
      showSmallMenu();
      goDown(st);
      
   	} 
   	else if(st < lastScrollTop && flag) {
      flag = false;
   		goUp(st);
   	}

   	lastScrollTop = st;
	});

});