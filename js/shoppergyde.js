var prosperentAPI = "&api_key=db887efc5e1ffd195515b629ff717349";

// http://api.prosperent.com/api/search?query=mens+running+shoes&api_key=2faab4bcbd4ed51fd1706a7ee940bfe0  

function itemSearch() {

		event.preventDefault();
		$("#item-results").empty();
        var item = $("#searchBar").val().trim();
        var queryURL = "http://api.prosperent.com/api/search?query="+ item + prosperentAPI;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp"
        }).done(function(response) {

            console.log(response);

            var results = response.data;

            console.log(results);

           	for (var i = 0; i < results.length; i++) {

                var itemDiv = $("<div>");
                itemDiv.addClass("col-md-3", "col-sm-6", "hero-feature");
                itemDiv.html("<div class='thumbnail'><img src='" + results[i].image_url + "'><div class='caption'><h3>" 
                + results[i].keyword + "</h3>" + "<p><a href='#' class='btn btn-primary'>Buy Now!</a> <a href='#' class='btn btn-default'>More Info</a></p></div></div>");
                $("#item-results").append(itemDiv);


            // <div class="col-md-3 col-sm-6 hero-feature">


            //     <div class="thumbnail">
            //         <img src="http://placehold.it/800x500" alt="">
            //         <div class="caption">
            //             <h3>Product 01</h3>
            //             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            //             <p>
            //                 <a href="#" class="btn btn-primary">Buy Now!</a> <a href="#" class="btn btn-default">More Info</a>
            //             </p>
            //         </div>
            //     </div>
            // </div>

            }

        }); //End of ajax function
} //End of itemSearch function

$(document).on("click", "#searchBtn", itemSearch);