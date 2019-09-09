$(document).ready(function() {
	$(window).on('scroll', function(){
    if ( $(window).scrollTop() > 50 ){
      $('.main-header').addClass('main-header_white');
      $('.nav-item .nav-link').addClass('nav-link-blue');
      $(".nav-item .btn-outline-light").css({ "color": "#2e37fe", "border-color": "#2e37fe", "background-color": "white" });
      $(".nav-item .btn1").css({ "color": "white", "border-color": "#71bdff" });
      $(".logo_white").css({"display": "none", "transition": "all .3s ease-in-out 0s"});
      $(".logo_blue").css({"display": "inline-block", "transition": "all .3s ease-in-out 0s"});
      //$(".logo_white").css("display", "none");
      //$(".logo_blue").css("display", "inline-block");
      //$('.navbar-dark .navbar-nav .nav-link').css({"color": "#2e37fe", "font-size": "200%"});

    } else {
      $('.main-header').removeClass('main-header_white nav-link-blue');
      $('.nav-item .nav-link').removeClass('nav-link-blue');
      $(".nav-item .btn-outline-light").css({ "color": "#f8f9fa", "border-color": "#f8f9fa", "background-color": "#606060" });
      $(".nav-item .btn1").css({ "color": "white", "border-color": "#71bdff" });
      $(".logo_white").css({"display": "inline-block", "transition": "all .3s ease-in-out 0s"});
      $(".logo_blue").css({"display": "none", "transition": "all .3s ease-in-out 0s"});
      //$(".logo_white").css("display", "inline-block");
      //$(".logo_blue").css("display", "none");
      //$('.navbar-dark .navbar-nav .nav-link').css({"color": "rgba(255, 255, 255, 0.5)", "font-size": "200%"});
    }
  });
});	

