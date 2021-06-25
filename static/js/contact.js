function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

$(document).ready(function() {
    $("#submit").on('click', function() {
        $("#submit").prop("disabled", true);
        working = true;

        // Get email
        email = $("#email").val();
        if (!validateEmail(email)) {
            alertify.error("Email is not valid");
            invalidate("#email", "Email is not valid");
            working = false;
        }

        // Get subject
        subject = $("#subject").val();
        if (subject.length <= 10) {
            alertify.error("Subject is not long enough");
            invalidate("#subject", "Subject not long enough (min 10 chars)");
            working = false;
        }

        // Get body
        body = $("#body").val();
        if (body.length <= 50) {
            alertify.error("Body is not long enough");
            invalidate("#body", "Body not long enough (min 50 chars)");
            working = false;
        } else if (body.length > 500) {
            alertify.error("Body is too long");
            invalidate("#body", "Body is too long (max 500 chars)");
            working = false;
        }

        if (working) {
            // send form off
            data = {
                "email": email,
                "subject": subject,
                "body": body
            }
            $.ajax({
                type: "POST",
                url: "/post/sendcontact",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
        			alertify.success("Successfully sent!");
                    setTimeout(function() {
            			$("#submit").prop("disabled", false);
                    }, 10000);
                },
        		error: function(data) {
        			alertify.error("Error while sending form. Try contacting us directly.");
                    setTimeout(function() {
            			$("#submit").prop("disabled", false);
                    }, 3000);
                    console.log(data);
                }
            });
        } else {
            setTimeout(function() {
                $("#submit").prop("disabled", false);
            }, 2000);
        }
    });

    $("#email").on("input", function() {
        if (!validateEmail($("#email").val())) {
            invalidate("#email", "Email is not valid");
        } else {
            validate("#email");
        }
    })

    $("#subject").on("input", function() {
        if ($("#subject").val().length <= 10) {
            invalidate("#subject", "Subject not long enough (min 10 chars)");
        } else {
            validate("#subject");
        }
    })

    $("#body").on("input", function() {
        body = $("#body").val();
        if (body.length <= 50) {
            invalidate("#body", "Body not long enough (min 50 chars)");
        } else if (body.length > 500) {
            invalidate("#body", "Body is too long (max 500 chars)");
        } else {
            validate("#body");
        }
    })

})

function invalidate(id, sg) {
    $(id).addClass("invalid");
    $(`${id}-msg h3.msg`).text(sg);
    $(`${id}-msg`).fadeIn(500);
}

function validate(id) {
    $(id).removeClass("invalid");
    $(`${id}-msg`).fadeOut(500);
}
