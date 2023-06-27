$('.toggle').on('click', function() {
    $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
    $('.container').stop().removeClass('active');
});

function submit_login_form() {
    // console.log("submit_login_form");
    if (valid_login_credentials_value()) {
        // console.log("submit_login_form.valid");
        var l = Ladda.create( document.querySelector( '.ladda-button-login' ) );
        l.start();
        $("#button_login").addClass("actived");
        $("#button_login").attr("disabled", "disabled");
        $('#button_login').blur();
        // $("#forgotten-password").attr("disabled", "disabled");
        // $("#forgotten-password").addClass("effect-disabled");
        setTimeout(function(){
            $("#login_form").submit();
        }, 1000);
    }
}
function valid_login_credentials_value() {
    // console.log("valid_login_credentials_value");
    var valid = true;
    if ($('#username').val()==='') {
        $("#username-bar").addClass("error");
        // $('#msg_empty_values').removeClass('hidden');
        valid = false;
    } else {
        $("#username-bar").removeClass("error");
    }
    if ($('#password').val()==='') {
        $("#password-bar").addClass("error");
        // $('#button_login').blur();
        valid = false;
    } else {
        $("#password-bar").removeClass("error");
    }
    return valid;
}
// $(document).ready(function() {
//     setTimeout(function(){
//         $('.autocomplete-off').val('');
//     }, 500);
// });
$(document).keyup(function(event) {
    /* Enter key */
    if (event.keyCode == 13) {
        if ($('form[name="login_form"]').length == 1) {
            submit_login_form();
        }
        // else if ($('form[name="recovery_password_form"]').length == 1) {
        //     submit_password_recovery_form();
        // }
    }
});