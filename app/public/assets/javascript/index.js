// Front-End Javascript
// console.log("This page is totes connected");

$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      "<div class='card border-3 mb-3 bg-light' data-id='" + 
        data[i]._id + 
        "'><div class='card-body'><h5 class='card-title font-weight-bold text-dark text-left'>" +
        data[i].title +
        "</h5><p class='card-text'>" +
        data[i].summary +
        "</p></div><div class='card-footer text-muted bg-light mb-3' data-id='" +
        data[i]._id +
        "'>" +
        data[i].link +
        "</div></div>"
    );
  }
});

$(document).on("click", ".card", function() {
  $("#comments").empty();

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    console.log(data);
    $("#comments").append("<div class='form-group bg-light border'");
    $("#comments").append("<h3>" + data.title + "</h3>");
    $("#comments").append("<label for='titleinput'>Comment Title</label>");
    $("#comments").append(
      "<input class='form-control' id='titleinput' name='title'>"
    );
    $("#comments").append("<label for='bodyinput'>Comment Body</label>");
    $("#comments").append(
      "<input class='form-control' id='bodyinput' rows='3' name='body'></textarea>"
    );
    $("#comments").append(
      "<button class='btn-primary' data-id='" +
        data._id +
        "' id='savenote'>Save Note</button></div>"
    );

    if (data.comment) {
      $("#titleinput").val(data.comment.title);
      $("#bodyinput").val(data.comment.body);
    }
  });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function(data) {
    console.log(data);
    $("#comments").empty();
  });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
