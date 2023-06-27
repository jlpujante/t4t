// $('.toggle').on('click', function () {
//     $('.container').stop().addClass('active');
// });
//
// $('.close').on('click', function () {
//     $('.container').stop().removeClass('active');
// });

function submit_ladda_login_form() {
    console.log("submit_ladda_login_form");
    if (valid_login_credentials_value()) {
        console.log("submit_ladda_login_form.valid");
        var l = Ladda.create(document.querySelector('.ladda-button-login'));
        l.start();
        $("#button_login").addClass("actived");
        $("#button_login").attr("disabled", "disabled");
        $('#button_login').blur();
        // $("#forgotten-password").attr("disabled", "disabled");
        // $("#forgotten-password").addClass("effect-disabled");
        setTimeout(function () {
            $("#login_form").submit();
        }, 500);
    }
}
function valid_login_credentials_value() {
    // console.log("valid_login_credentials_value");
    var valid = true;
    if ($('#usernameInput').val() === '') {
        $("#form-group-email").addClass("has-error");
        $("#form-group-email").addClass("has-feedback");
        $("#form-feedback-email").removeClass("hidden");
        valid = false;
    } else {
        $("#form-group-email").removeClass("has-error");
        $("#form-group-email").removeClass("has-feedback");
        $("#form-feedback-email").addClass("hidden");
    }
    if ($('#passwordInput').val() === '') {
        $("#form-group-password").addClass("has-error");
        $("#form-group-password").addClass("has-feedback");
        $("#form-feedback-password").removeClass("hidden");
        valid = false;
    } else {
        $("#form-group-password").removeClass("has-error");
        $("#form-group-password").removeClass("has-feedback");
        $("#form-feedback-password").addClass("hidden");
    }
    return valid;
}
$(document).ready(function() {
    setTimeout(function(){
        $('.autocomplete-off').val('');
    }, 500);
});
$(document).keyup(function (event) {
    /* Enter key */
    // console.log(event);
    if (event.keyCode == 13) {
        if ($('form[name="login_form"]').length == 1) {
            submit_ladda_login_form();
        }
        // else if ($('form[name="recovery_password_form"]').length == 1) {
        //     submit_password_recovery_form();
        // }
    }
});