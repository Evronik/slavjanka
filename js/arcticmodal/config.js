$(document).ready(function () {
  $.cookie('smartCookies', 4);
  if ($.cookie('smartCookies') != 5) {

    $(document).mouseleave(function (e) {

      function getWindow() {

        $('.offer').arcticmodal({
          closeOnOverlayClick: true,
          closeOnEsc: true,
          beforeClose: function(data, el) {
             
             $.cookie('smartCookies', 5, {
              expires: 0,
              path: '/'
             }); 

          }
        });

      };
  if ($.cookie('smartCookies') != 5) {
    if (e.pageY - $(window).scrollTop() <= 1) { 
         setTimeout(getWindow, 1);
       }
      }
    });

  };
});