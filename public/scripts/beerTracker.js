(function() {
  var button = document.getElementById('addBeerButton');
  var beerList = document.getElementById('beerList');
  //todo: find out where to put these transformable env variables
  var apiURI = 'https://shielded-coast-63607.herokuapp.com';

  document.addEventListener('DOMContentLoaded', getBeerList);
  beerList.addEventListener('click', function(evt) {
    if (evt.target.className === 'removeBeer') {
      var ajax = liteAjax('DELETE', `${apiURI}/beerTracker/api/deleteBeer/${evt.target.parentNode.id}`);
      ajax({successCallback: function(status) {
        console.log(status)
      }});
    }
  });

  button.addEventListener('click', function() {
    var ajax = liteAjax('POST', `${apiURI}/beerTracker/api/addBeer`);
    var postObj = JSON.stringify({
      name: document.getElementById('beerName').value,
      rating: document.getElementById('beerRating').value
    });

    ajax({
      postObj: postObj,
      successCallback: function(data) {
        console.log(data);
      }
    });
  });

  function getBeerList() {
    var ajax = liteAjax('GET', `${apiURI}/beerTracker/api/getBeers`);

    ajax({
      successCallback: function(data) {
        renderBeers(data);
      }
    });
  }

  function renderBeers(responseString) {
    var beers = JSON.parse(responseString);
    var frag = document.createDocumentFragment();

    beers.forEach(function(beer) {
      var text = `${beer.name} <br> Rating: ${beer.rating} <a class="removeBeer">Remove</a>`
      var liEl = document.createElement('li');

      liEl.innerHTML = text;
      liEl.id = beer._id;
      frag.append(liEl);
    })

    document.getElementById('beerList').append(frag);
  }

  //helpers
  function liteAjax(type, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    return function(params) {
      xhr.send(params.postObj);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            params.successCallback(xhr.responseText);
          }
        }
      }

      return xhr;
    }
  }
})();
