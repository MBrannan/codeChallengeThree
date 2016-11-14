$(document).ready(function() {
  console.log('js loaded');

  $('#postJoke').on('submit', function(event) {
    event.preventDefault();
    var newJoke = {};
      $.each($('#postJoke').serializeArray(), function(i, field) {
        newJoke[field.name] = field.value;
        $('input[type="text"]').val('');
      });
      console.log(newJoke);
      $.ajax({
        type: 'POST',
        url: '/jokes',
        data: newJoke,
        success: function(response) {
          if(response == "Created") {
            getJokes();
          } else {
            alert("no jokes");
          }
        }
      })

  });

});

getJokes();

//functions

  function appendJokes(jokes) {
    $("#jokeContainer").empty();
    for (var i = 0; i < jokes.length; i++) {
      $("#jokeContainer").append("<div class='joke'></div>");
      var $el = $("#jokeContainer").children().last();
      $el.append("<h2>" + jokes[i].whoseJoke + "</h2>");
      $el.append("<p>" + jokes[i].jokeQuestion + "</p>");
      $el.append("<p>" + jokes[i].punchLine + "</p>");
    }
  }

  function getJokes() {
    $.ajax({
      type: 'GET',
      url: '/jokes',
      success: function(data) {
        console.log(data);
        appendJokes(data);
      }
    });
  }
