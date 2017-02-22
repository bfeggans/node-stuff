(function() {
  var addButton = document.getElementById('addBeerButton');
  var beerList = document.getElementById('beerList');
  //todo: find out where to put these transformable env variables
  var apiURI = 'https://shielded-coast-63607.herokuapp.com';
  // var apiURI = 'http://localhost:5000';

  document.addEventListener('DOMContentLoaded', getBeerList);
  beerList.addEventListener('click', function(evt) {
    if (evt.target.className.indexOf('fa-close') > -1) {
      const idNode = evt.target.parentNode.parentNode;
      const ajax = liteAjax('DELETE', `${apiURI}/beerTracker/api/deleteBeer/${idNode.id}`);
      ajax({successCallback: function(status) {
        idNode.remove();
      }});
    } else if (evt.target.className.indexOf('update-beer') > -1) {
      const ajax = liteAjax('PUT', `${apiURI}/beerTracker/api/updateBeer/${evt.target.parentNode.id}`);
      const beerName = evt.target.parentNode.getElementsByTagName('input')[0].value;
      const postObj = JSON.stringify({
        name: beerName
      });

      ajax({
        postObj: postObj,
        successCallback: function(status) {
          alert('Success!');
      }});
    }
  });

  addButton.addEventListener('click', function() {
    const beerName = document.getElementById('beerName').value;
    const beerRating = document.getElementById('beerRating').value;

    if (beerName) {
      const ajax = liteAjax('POST', `${apiURI}/beerTracker/api/addBeer`);
      const postObj = JSON.stringify({
        name: beerName,
        rating: beerRating
      });

      ajax({
        postObj: postObj,
        successCallback: function(data) {
          let beer = JSON.parse(data);
          const template = buildBeerCard(beer);
          let divEl = document.createElement('div');

          divEl.innerHTML = template;
          divEl.id = beer._id;
          document.getElementById('beerList').append(divEl);
        }
      });
    } else {
      alert('Please enter a beer name!');
    }


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
      var html = buildBeerCard(beer);
      var divEl = document.createElement('div');

      divEl.innerHTML = html;
      divEl.id = beer._id;
      frag.append(divEl);
    })

    document.getElementById('beerList').append(frag);
  }

  //helpers
  function buildBeerCard(beer) {
    var html = `<a class="remove-beer"><i class="fa fa-close"></i></a>
                <input type="text" value="${beer.name}" class="tracked-beer-name" /> <br>
                <span class="fa-stack">
                  <i class="fa fa-star fa-stack-2x"></i>
                  <strong class="fa-stack-1x rating-text">${beer.rating}</strong>
                </span>
                <a class="update-beer btn btn-primary">Update</a>`;

    return html;
  }

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
