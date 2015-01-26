$(document).ready(function() {
  var menuHeight = 50;
  var divs = new Array('start','scenarios','offer','faq','photo','contact');

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

  $('.nav-link').click(function(event) {
    event.preventDefault();
    var a = $(this).attr('href').substring(1);
    var b = getBreakPoints(a)-$('#'+a).height();
    $(window).scrollTop(b);
    console.log(b);
  });



	$(window).scroll(function(event) {
   	var st = $(this).scrollTop();

    if(st>150) {
      $("#navigation").addClass("nav-small");
    }
    else if(st<150) {
      $("#navigation").removeClass("nav-small");
    }
  	
    $.each(breakPoints, function(key, value) {
      if(st>=value && (st<breakPoints[key+1])) {
        $('.nav-link').removeClass('active');
        $('a[href="#'+divs[key]+'"]').addClass('active');

        if(st + $(window).height() > $(document).height() - 10) {
          $('.nav-link').removeClass('active');
          $('a[href="#contact"]').addClass('active');
        }
      }
    });


   	/*if (st > lastScrollTop && flag) {
      flag = false;
      showSmallMenu();
      goDown(st);
      
   	} 
   	else if(st < lastScrollTop && flag) {
      flag = false;
   		goUp(st);
   	}*/

   	lastScrollTop = st;
	});

});