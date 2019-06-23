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
        "</p></div><div class='card-footer text-muted bg-light' data-id='" +
        data[i]._id +
        "'><a href='" +
        data[i].link +
        "'>" + data[i].link + 
        "</a></div></div>"
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
    $("#comments").append(
        "<div class='form-group bg-light border my-3 mx-1 px-1 py-3' style='position:sticky; top: 0px;' id='comment-box'><h5>~Comment Saver~</h5><h4>" + data.title + 
        "</h4><input class='form-control' id='titleinput' placeholder='Note Subject' name='title'>" + 
        "<textarea class='form-control' placeholder='Your Notes Go Here' id='bodyinput' rows='3' name='body'></textarea>" + 
        "<button class='btn-primary mt-2' data-id='" +
        data._id +
        "' id='savenote'>Save Note</button></div>"
    )

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
