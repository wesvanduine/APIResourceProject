// Initialize Firebase
var config = {
    apiKey: "AIzaSyD73nDQiEU00dixAi656Z2_ahiGABH23vs",
    authDomain: "api-research-project.firebaseapp.com",
    databaseURL: "https://api-research-project.firebaseio.com",
    projectId: "api-research-project",
    storageBucket: "api-research-project.appspot.com",
    messagingSenderId: "335807176416"
};
firebase.initializeApp(config);

//Referencing the database
var database = firebase.database();
var user = "";
var password = "";

$("#saveButton").on("click", function(event) {
    event.preventDefault();

    //variable to hold input from user
    username = $("#userName").val().trim();
    // password = $("")
    password = $("#passWord").val().trim();
    //pushing the data inputed to firbase 
    // database.ref("users").set({
    //     username: username,
    // });
var usersRef = firebase.database().ref('users');
var usersRefUser = firebase.database().ref('users/'+username);
usersRefUser.child('password').set(password);

// adaNameRef.child('first').set('Ada');
// adaNameRef.child('last').set('Lovelace');

    $("#userName").val('');
    $("#passWord").val('');

});

var prosperentAPI = "&api_key=db887efc5e1ffd195515b629ff717349";
var response;

// http://api.prosperent.com/api/search?query=mens+running+shoes&api_key=2faab4bcbd4ed51fd1706a7ee940bfe0  

function itemSearch() {

    event.preventDefault();
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
            itemDiv.html("<div class='thumbnail'><img src='" + results[i].image_url + "'><div class='caption'><h3>" 
            + results[i].keyword + "</h3>" + "<p><a class='btn btn-primary buyButton' result='"+i+"'>Buy Now!</a> <a href='#' class='btn btn-default'>More Info</a></p></div></div>");
            $("#item-results").append(itemDiv);    
        };
    }); //End of ajax function
} //End of itemSearch function


/////////////////////////////////////////////////////////////////////
//                       	 Shopping Cart                         //
/////////////////////////////////////////////////////////////////////

var shoppingCart = [];

//function when "Buy now!" is clicked add 1 to shopping cart counter(TODO)
function addToCart() {
	var itemRef = $(this).attr("result");
	shoppingCart.push(results[itemRef]);
	console.log(results[itemRef]);
	console.log(shoppingCart.length);
	$("#counter").text(shoppingCart.length);
	var a = $("<li>");
	a.html("<a href='#'><img style='width:50px;height:50px;'src='"+shoppingCart[shoppingCart.length-1].image_url+"'><span>"+shoppingCart[shoppingCart.length-1].keyword+" "+shoppingCart[shoppingCart.length-1].price+"</span></a>");
	$("#cart").prepend(a);
}

/////////////////////////////////////////////////////////////////////
//                       	 On-click Events                       //
/////////////////////////////////////////////////////////////////////

$(document.body).on("click", "#searchBtn", itemSearch);
$(document.body).on("click", ".buyButton", addToCart);