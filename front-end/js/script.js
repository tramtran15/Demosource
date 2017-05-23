/**
 * Created by Tran Thai Quyen on 8/11/2016.
 */
$(document).ready(function () {

    var wdH = $(window).height();
    var bdH = $('body').height() + $('.footer').outerHeight();
    if (bdH<wdH) {
        $('.footer').addClass('pos');
    }

    $('.to-top').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });

    /*Owner room setting page*/


    /*call modal*/
    $('.call-modal').click(function () {
        $('.modal').modal();
    });

    $('.call-modal-booking').click(function () {
        $('.modal-booking').modal();
    });

    $('.call-modal-login').click(function () {
        $('.login-modal').modal();
    });
    /**/
});