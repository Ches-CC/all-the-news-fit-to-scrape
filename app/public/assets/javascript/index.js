// Front-End Javascript
console.log("This page is totes connected");

$.getJSON("/articles", function(data){
    for(var i = 0;i < data.length; i++){
        // $("#articles").append("<div class='card-body bg-light mb-3'><img src='" + data[i].photo + "' class='card-img-top' alt='...'><p class='card-title text-dark text-left' data-id='" + data[i]._id + "'>"
        //  + data[i].title + "</p><p class='card-body text-muted' data-id='" + data[i]._id + "'>" + data[i].link + "</p></div>");
         $("#articles").append("<div class='card-body bg-light mb-3'><h5 class='card-title font-weight-bold text-dark text-left' data-id='" + data[i]._id + "'>"
         + data[i].title + "</h5><p class='card-body text-muted mb-0' data-id='" + data[i]._id + "'>" + data[i].link + "</p></div>");
    }
});

$(document).on("click", ("h5"), function(){
    $("#comments").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data){
        console.log(data);
        $("#comments").append("<h4>" + data.title + "</h4>");
        $("#comments").append("<input id='titleinput' name='title'>");
        $("#comments").append("<input id='bodyinput' name='body'></textarea>");
        $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        if (data.comment) {
            $("#titleinput").val(data.comment.title);
            $("#bodyinput").val(data.comment.body);
        }
    });
});

$(document).on("click", "#savenote", function(){
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
    .then(function(data){
        console.log(data);
        $("#comments").empty();
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});