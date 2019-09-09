/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function($,sr){
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
      var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args); 
                timeout = null; 
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100); 
        };
    };

    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
 
 $(document).ready(function(){
});
function menu(){
  $("#user-menu").fadeToggle("slow");
}
function modal_artist(){
  document.getElementById('id01').style.display='block';
  $("#w3-container").load('artist-data.html');
}

 
   $(document).ready(function(){

    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"></div><div class="quantity-button quantity-down"></div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });

    jQuery('<div class="quantity-nav-p"><div class="quantity-button-p quantity-up-p"></div><div class="quantity-button-p quantity-down-p"></div></div>').insertAfter('.quantity-p input');
    jQuery('.quantity-p').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up-p'),
        btnDown = spinner.find('.quantity-down-p'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });


  
});


   $(document).ready(function () {
       for (var i = 1; i <= 15; i++) {
           var res = '#panel'.concat(i); $(res).hide();
       }
   });
   function alternarPanel(x) {
       var res = '#panel'.concat(x);
       $(res).toggle();
   }

   /*Popup*/
   $(document).ready(function () {

       for (var i = 1; i <= 15; i++) {
           var res = '#alternar-panel'.concat(i);
           $(res).click(function () {
               $('#popup').fadeIn('slow');
               return false;
           });
       }
       $('#close').click(function () {
           $('#popup').fadeOut('slow');
           return false;
       });
   });

   /*Scroll*/
   function move_down() {
       if ($('.video').css('top') < '0px') {
           $(".video").animate({ "top": "+=16vw" }, "slow");
       }
   }

   function move_up() {
       $(".video").animate({ "top": "-=16vw" }, "slow");
   }
