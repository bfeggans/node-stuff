(() => {
  var addButton = document.getElementById('addBeerButton');
  var beerList = document.getElementById('beerList');
  //TODO: find out where to put these transformable env variables
  var apiURI = 'https://shielded-coast-63607.herokuapp.com';
  // var apiURI = 'http://localhost:5000';

  const getBeerList = () => {
    const ajax = liteAjax('POST', `${apiURI}/graphql/beers`);

    ajax({
      postObj: JSON.stringify({
        query: `{
          beers {
            _id
            name
            rating
          }
        }`
      }),
      successCallback: (data) => {
        renderBeers(data);
      }
    });
  };

  const renderBeers = (responseString) => {
    const beers = JSON.parse(responseString).data.beers;
    const frag = document.createDocumentFragment();

    beers.forEach((beer) => {
      const html = buildBeerCard(beer);
      const divEl = document.createElement('div');

      divEl.innerHTML = html;
      divEl.id = beer._id;
      frag.append(divEl);
    })

    document.getElementById('beerList').append(frag);
  };

  const ratingChangeHandler = (evt) => {
    if (evt.target.className === 'tracked-beer-rating')
    {
      const newRating = evt.target.value;

      evt.target.previousSibling.childNodes[1].textContent = newRating;
      evt.target.style = 'display: none;';
    }
  };

  const beerListEventHandler = (evt) => {
    if (evt.target.className.indexOf('fa-close') > -1)
    {
      const idNode = evt.target.parentNode.parentNode;
      const ajax = liteAjax('DELETE', `${apiURI}/beerTracker/api/deleteBeer/${idNode.id}`);

      ajax({
        successCallback: (status) => {
          idNode.remove();
        }
      });
    }
    else if (evt.target.className.indexOf('update-beer') > -1)
    {
      const ajax = liteAjax('PUT', `${apiURI}/beerTracker/api/updateBeer/${evt.target.parentNode.id}`);
      const beerName = evt.target.parentNode.getElementsByTagName('input')[0].value;
      const beerRating = evt.target.previousSibling.childNodes[1].textContent;
      const postObj = JSON.stringify({ name: beerName, rating: beerRating });

      ajax({
        postObj: postObj,
        successCallback: (status) => {
          console.log(status);
      }});
    }
  };

  const addBeerHandler = () => {
    const beerName = document.getElementById('beerName').value;
    const beerRating = document.getElementById('beerRating').value;

    if (beerName)
    {
      const ajax = liteAjax('POST', `${apiURI}/beerTracker/api/addBeer`);
      const postObj = JSON.stringify({
        name: beerName,
        rating: beerRating
      });

      ajax({
        postObj: postObj,
        successCallback: (data) => {
          let beer = JSON.parse(data);
          const template = buildBeerCard(beer);
          let divEl = document.createElement('div');

          divEl.innerHTML = template;
          divEl.id = beer._id;
          document.getElementById('beerList').append(divEl);
        }
      });
    }
    else
    {
      alert('Please enter a beer name!');
    }
  };

  const ratingSelectElementToggler = (evt) => {
    if (evt.target.parentNode.className
        && evt.target.parentNode.className.indexOf('tracked-beer-rating-btn') > -1)
    {
      evt.target.parentNode.nextSibling.style = '';
    }
    else
    {
      const selects = document.getElementsByTagName('select');

      Array.prototype.forEach.call(selects, (element) => {
        if (element.style === 'display: none;' || element.id === 'beerRating') return;
        element.style = 'display: none;';
      });
    }
  };

  //helpers
  const buildBeerCard = (beer) => {
    const html = `<a class="remove-beer"><i class="fa fa-close"></i></a>
                <input type="text" value="${beer.name}" class="tracked-beer-name" /> <br>
                <div style="position: relative; display: inline-block;">
                  <button class="fa-stack tracked-beer-rating-btn" type="button"><i class="fa fa-star fa-stack-2x"></i><strong class="fa-stack-1x rating-text">${beer.rating}</strong></button><select size="5" name="rating" class="tracked-beer-rating" style="display: none;">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div><a class="update-beer">Update</a>`;

    return html;
  };

  const liteAjax = (type, url) => {
    let xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    return (params) => {
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
  };

  //listeners
  document.addEventListener('click', ratingSelectElementToggler);
  document.addEventListener('change', ratingChangeHandler);
  document.addEventListener('DOMContentLoaded', getBeerList);
  beerList.addEventListener('click', beerListEventHandler);
  addButton.addEventListener('click', addBeerHandler);
})();
