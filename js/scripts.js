$(document).ready(function() {

  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(50.197967, 19.427067),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById("contact"), mapOptions); 


  var menuHeight = 50;
  var divs = new Array('start', 'faq', 'offer', 'scenarios', 'photo', 'contact');

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

  /*function goDown(position) {
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
  }*/

  /*function goUp(position) {
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
  }*/

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

  $('.cd-faq-trigger').on('click', function() {
    var parent = $(this).parent();
    parent.children(".cd-faq-content").toggle(500);
  });

  $('.cd-faq-content').on('click', function() {
    $(this).toggle(200);  
  });

  var slideWidth = $('#photo .content').width();
  $('#photo .slide').width(slideWidth);
  var clickDisabled = false;

  $('#photo .slide-nav.next').click(function() {
    var numSlides = $('.slide').length;
    var maxMargin = (-numSlides*slideWidth)+slideWidth;
    if (clickDisabled) {
      return;
    }
    else {
      var marginLeft = $('#photo .slider').css("margin-left");
      marginLeft = marginLeft.substring(0, marginLeft.length - 2);
      if(marginLeft == maxMargin) {
        $('.slide-nav.next').css("opacity", "0.2");
        return;
      }
      $('.slide-nav.back').css("opacity", "0.9");
      var newMargin = marginLeft - slideWidth;
      $('#photo .slider').animate({
        marginLeft: newMargin
      }, 800);
      clickDisabled = true;
      setTimeout(function(){clickDisabled = false;}, 1000);
    }
  });

  $('#photo .slide-nav.back').click(function(e) {
    if (clickDisabled) {
      return;
    }
    else {
      var marginLeft = $('#photo .slider').css("margin-left");
      marginLeft = marginLeft.substring(0, marginLeft.length - 2);
      if(marginLeft == 0) {
        $('.slide-nav.back').css("opacity", "0.2");
        return;
      }
      $('.slide-nav.next').css("opacity", "0.9");
      var newMargin = parseInt(marginLeft) + slideWidth;
      $('#photo .slider').animate({
        marginLeft: newMargin
      }, 800);
      clickDisabled = true;
      setTimeout(function(){clickDisabled = false;}, 1000);
    }
  });

});