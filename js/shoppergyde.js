/////////////////////////////////////////////////////////////////////
//                     Initialize Firebase                         //
/////////////////////////////////////////////////////////////////////
var config = {
    apiKey: "AIzaSyD73nDQiEU00dixAi656Z2_ahiGABH23vs",
    authDomain: "api-research-project.firebaseapp.com",
    databaseURL: "https://api-research-project.firebaseio.com",
    projectId: "api-research-project",
    storageBucket: "api-research-project.appspot.com",
    messagingSenderId: "335807176416"
};
firebase.initializeApp(config);
var auth = firebase.auth();
var database = firebase.database();
/////////////////////////////////////////////////////////////////////
//                        Create New User                          //
/////////////////////////////////////////////////////////////////////
function createUser() {
    event.preventDefault();
    var email = "";
    var password = "";
    email = $("#createUserName").val().trim();
    password = $("#createPassword").val().trim();
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    $("#createUserNam").val('');
    $("#createPassword").val('');
}
/////////////////////////////////////////////////////////////////////
//                           Sign In User                          //
/////////////////////////////////////////////////////////////////////
function loginUser() {
    event.preventDefault();
    var email = "";
    var password = "";
    email = $("#userName").val().trim();
    password = $("#password").val().trim();
    
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    $("#userName").val('');
    $("#password").val('');
    
}
/////////////////////////////////////////////////////////////////////
//                         Search Function                         //
/////////////////////////////////////////////////////////////////////
var results;
function itemSearch() {
    event.preventDefault();
    var prosperentAPI = "&api_key=db887efc5e1ffd195515b629ff717349";
    var response;
    $("#item-results").empty();
    var item = encodeURI($("#searchBar").val().trim());
    var queryURL = "http://api.prosperent.com/api/search?query=" + item + prosperentAPI+"&relevancyThreshold=1.0&limit=100";
    console.log(queryURL);
    // http://api.prosperent.com/api/search?filterCatalogId=0faa41508c3ea886fe17a09d72282014&api_key=3bc59e40ce2f493b5619df9e9afbfb82
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
    }).done(function(response) {
        results = response.data;
        for (var i = 0; i < results.length; i++) {
            var itemDiv = $("<div>");
            itemDiv.addClass("col-md-3", "col-sm-6", "hero-feature");
            itemDiv.html("<div class='thumbnail'><img src='" + results[i].image_url + "'><div class='caption'><h3>" + results[i].keyword + "</h3><h4>$"+results[i].price + "</h4><p><a class='btn btn-primary buyButton' result='" + i + "'>Buy Now!</a> <a href='#' class='btn btn-default' data-toggle='modal' data-target='#"+i+"'>More Info</a></p></div></div>");
            $("#item-results").append(itemDiv);
        };
    });
}
/////////////////////////////////////////////////////////////////////
//                             More Info                           //
/////////////////////////////////////////////////////////////////////
function moreInfo() {
    var itemRef = $(this).attr("result");
    shoppingCart.push(results[itemRef]);
    console.log(results[itemRef]);
    console.log(shoppingCart.length);
    $("#counter").text(shoppingCart.length);
    var a = $("<li>");
    a.html("<a href='#'><img style='width:50px;height:50px;'src='" + shoppingCart[shoppingCart.length - 1].image_url + "'><span>" + shoppingCart[shoppingCart.length - 1].keyword + " " + shoppingCart[shoppingCart.length - 1].price + "</span></a>");
    $("#cart").prepend(a);
}
/////////////////////////////////////////////////////////////////////
//                           Shopping Cart                         //
/////////////////////////////////////////////////////////////////////
var shoppingCart = [];
function addToCart() {
    var itemRef = $(this).attr("result");
    shoppingCart.push(results[itemRef]);
    console.log(results[itemRef]);
    console.log(shoppingCart.length);
    $("#counter").text(shoppingCart.length);
    var a = $("<li>");
    a.html("<a href='#'><img style='width:50px;height:50px;'src='" + shoppingCart[shoppingCart.length - 1].image_url + "'><span>" + shoppingCart[shoppingCart.length - 1].keyword + " " + shoppingCart[shoppingCart.length - 1].price + "</span></a>");
    $("#cart").prepend(a);
}
/////////////////////////////////////////////////////////////////////
//                           On-click Events                       //
/////////////////////////////////////////////////////////////////////
$(document.body).on("click", "#saveButton", createUser);
$(document.body).on("click", "#signInButton", loginUser);
$("#searchBar").keypress(function(e) {
    if (e.which == 13) {
        itemSearch();
    }
});
/*$(document.body).on("click", ".buyButton", addToCart);*/
$(document.body).on("click", ".buyButton", addToCart);
auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $("#userName").html("Signed In")
  } else {
    // No user is signed in.
    $("#userName").html("Not Signed In")
  }
});
/////////////////////////////////////////////////////////////////////
//                           Form Validation                       //
/////////////////////////////////////////////////////////////////////
$( document ).ready( function () {
    $( "#newAccountForm" ).validate( {
        rules: {
            password: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
                },
            messages: {
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                email: "Please enter a valid email address"
            },
            errorElement: "em",
            errorPlacement: function ( error, element ) {
                // Add the `help-block` class to the error element
                error.addClass( "help-block" );
                if ( element.prop( "type" ) === "checkbox" ) {
                    error.insertAfter( element.parent( "label" ) );
                } else {
                    error.insertAfter( element );
                }
            },
            highlight: function ( element, errorClass, validClass ) {
                $( element ).parents( ".input-group" ).addClass( "has-error" ).removeClass( "has-success" );
            },
            unhighlight: function (element, errorClass, validClass) {
                $( element ).parents( ".input-group" ).addClass( "has-success" ).removeClass( "has-error" );
            }
    } );
} );
$( document ).ready( function () {
    $( "#currentAccountForm" ).validate( {
        rules: {
            password: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: "Please enter a valid email address"
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );
            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".input-group" ).addClass( "has-error" ).removeClass( "has-success" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).parents( ".input-group" ).addClass( "has-success" ).removeClass( "has-error" );
        }
    } );
} );