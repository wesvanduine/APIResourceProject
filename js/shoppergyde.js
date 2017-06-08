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

    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });

    $("#userName").val('');
    $("#password").val('');

}

/////////////////////////////////////////////////////////////////////
//                         Search Function                         //
/////////////////////////////////////////////////////////////////////

function itemSearch() {
    event.preventDefault();
    var prosperentAPI = "&api_key=db887efc5e1ffd195515b629ff717349";
    var response;
    $("#item-results").empty();
    var item = encodeURI($("#searchBar").val().trim());
    console.log(item);
    var queryURL = "http://api.prosperent.com/api/search?query=" + item + prosperentAPI;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
    }).done(function(response) {

        console.log(response);

        results = response.data;

        console.log(results);

        for (var i = 0; i < 8; i++) {
            var itemDiv = $("<div>");
            itemDiv.addClass("col-md-3", "col-sm-6", "hero-feature");
            itemDiv.html("<div class='thumbnail'><img src='" + results[i].image_url + "'><div class='caption'><h3>" + results[i].keyword + "</h3>" + "<p><a class='btn btn-primary buyButton' result='" + i + "'>Buy Now!</a> <a href='#' class='btn btn-default'>More Info</a></p></div></div>");
            $("#item-results").append(itemDiv);
        };
    });
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
$(document.body).on("click", ".buyButton", addToCart);
