function validatePass() {
    $( "form" ).submit(function( event ) {
        var pass1 = document.getElementById("pass").value;
        var pass2 = document.getElementById("pass2").value;
        var ok = true;
        if (pass1 != pass2) {
            alert("Passwords Do not match");
            ok = false;
        }
        return ok;
    });
}
$(document).ready(function () {
    usernameExists();
    validatePass();
});

function usernameExists () {
    $('input[name="username"]').change( function () {
        username = $(this).val();
        $.getJSON('/user?username='+username+'', function(response) {
            if (response.length == 0) { $('#message').html('El usuario ya existe'); }
            else { $('#message').html('Usuario Correcto'); }
        });  
    });   
}