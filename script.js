//Update the innerHtml
const toDoData = data => {
    displayLoading()
    //Making an array of all the data
    const arrayOfData = data.data.map(e => {
        return e;
    })
    //Getting the first 20 elements of the array
    const zeroToTwenty = arrayOfData.slice(0, 20);
    //Shows 20 phones as default
    showTotalData(zeroToTwenty);
    hideLoading()
}
//Updates total data fetched for first 20 and show more button
const showTotalData = array => {
    const cardParent = document.getElementById('parent-card');
    array.forEach(e => {
        // console.log(e.slug)
        const singleCard = document.createElement('div');
        singleCard.classList.add('col-12', 'col-md-4', 'pt-3')
        singleCard.innerHTML = `
              <div class="card text-center">
                  <img src="${e.image}" class="card-img-top w-50 mx-auto pt-4" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${e.phone_name}</h5>
                      <p class="card-text">Brand: ${e.brand}</p>
                      <a href="#" onclick = "explore('${e.slug}')" id="explore-btn" class="btn btn-primary">Explore</a>
                  </div>
              </div>
          `
        cardParent.appendChild(singleCard)
    })
}

//Search button functionality
const button = document.getElementById('search-btn');
button.addEventListener('click', () => {
    commonForHome();
});

//Logo and Default products common function
const commonForHome = () => {
    displayLoading();
    const searchField = document.getElementById('input');
    const searchText = searchField.value;
    //Clears previous search
    const cardParent = document.getElementById('parent-card');
    const detailParent = document.getElementById('parent-detail');
    cardParent.innerHTML = '';
    detailParent.innerHTML = '';
    searchField.value = '';
    //Making the URL dynamic
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            updateBySearch(data);
            coountSearchResult(data);
            updateByShowMore(data);
            displayShowMore(data)
        })
}
//Display show more button if data is > 20
const displayShowMore = data => {
    // If data is more than 20 then displays show more button, else wont
    if (data.data.length > 20) {
        const showMoreBtn = document.getElementById('show-more');
        showMoreBtn.classList.remove('d-none')
    }
}
// Updates total data by Show more button
const updateByShowMore = data => {
    const showMoreBtn = document.getElementById('show-more');
    showMoreBtn.addEventListener('click', () => {
        showTotalData(data.data);
        //Hide Show more button after collapsing all data
        const showMoreBtn = document.getElementById('show-more');
        showMoreBtn.classList.add('d-none')
    })
}

//Updating product by search result
const updateBySearch = data => {
    if (data.status) {
        toDoData(data);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No Phone Found!'
        })
    }
}
//Showing details by clicking Explore button
const explore = slugData => {
    displayLoading();
    const url = `https://openapi.programming-hero.com/api/phone/${slugData}`
    fetch(url)
        .then(res => res.json())
        .then(data => exploreInner(data))
    const exploreInner = data => {
        const detailParent = document.getElementById('parent-detail');
        detailParent.innerHTML = `
      <div class="card mb-3 p-4">
      <div class="row g-0">
        <div class="col-md-4 d-flex align-items-center">
          <img src="${data.data.image}" class="image-full mb-3 mb-md-0" rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${data.data.name}</h5>
            <p class="card-text mb-0">Brand: ${data.data.brand}</p>
            ${(data => data.data.releaseDate ? `<p class="card-text"><small class="text-muted">${data.data.releaseDate}</small></p>` : `<p class="card-text"><small class="text-muted">Releasedate not found</small></p>`)(data)
            }
            
            <hr>
            <p class="card-text mb-0"><strong>Main Features:</strong></p>
            <hr class="w-25 mt-0 mb-1">
            ${(data => data.data.mainFeatures.storage ? `<p class="card-text mb-0"><small class="text-muted"><strong>Storage:</strong> ${data.data.mainFeatures.storage}</small></p>` : `<p class="card-text"><small class="text-muted"> Not found</small></p>`)(data)
            }
            ${(data => data.data.mainFeatures.memory ? `<p class="card-text mb-0"><small class="text-muted"><strong>Memory:</strong> ${data.data.mainFeatures.memory}</small></p>` : `<p class="card-text"><small class="text-muted"> Not found</small></p>`)(data)
            }
            ${(data => data.data.mainFeatures.displaySize ? `<p class="card-text mb-0"><small class="text-muted"><strong>Display:</strong> ${data.data.mainFeatures.displaySize}</small></p>` : `<p class="card-text"><small class="text-muted"> Not found</small></p>`)(data)
            }
            ${(data => data.data.mainFeatures.chipSet ? `<p class="card-text mb-0"><small class="text-muted"><strong>Chipset:</strong> ${data.data.mainFeatures.chipSet}</small></p>` : `<p class="card-text"><small class="text-muted">Chipset: Not found</small></p>`)(data)
            }
            ${(data => data.data.mainFeatures.sensors ? `<p class="card-text mb-0"><small class="text-muted"><strong>Sensors:</strong> &nbsp;${data.data.mainFeatures.sensors}&nbsp;</small></p>` : `<p class="card-text"><small class="text-muted">Sensors: Not found</small></p>`)(data)
            }
            <hr>
            <p class="card-text mb-0"><strong>Other Features:</strong></p>
            <hr class="w-25 mt-0 mb-1">
            ${(data => data.data.others?.Bluetooth ? `<p class="card-text mb-0"><small class="text-muted"><strong>Bluetooth:</strong> &nbsp;${data.data.others.Bluetooth}</small></p>` : `<p class="card-text mb-0"><small class="text-muted"><strong>Bluetooth:</strong> No</small></p>`)(data)
            }
            ${(data => data.data.others?.NFC ? `<p class="card-text mb-0"><small class="text-muted"><strong>NFC:</strong> &nbsp;${data.data.others.NFC}</small></p>` : `<p class="card-text mb-0"><small class="text-muted"><strong>NFC:</strong> No</small></p>`)(data)
            }
            ${(data => data.data.others?.Radio ? `<p class="card-text mb-0"><small class="text-muted"><strong>Radio:</strong> &nbsp;${data.data.others.Radio}</small></p>` : `<p class="card-text mb-0"><small class="text-muted"><strong>Radio:</strong> Not Supported</small></p>`)(data)
            }
            ${(data => data.data.others?.USB ? `<p class="card-text mb-0"><small class="text-muted"><strong>USB:</strong> &nbsp;${data.data.others.USB}</small></p>` : `<p class="card-text mb-0"><small class="text-muted"><strong>USB:</strong> No</small></p>`)(data)
            }
            ${(data => data.data.others?.WLAN ? `<p class="card-text mb-0"><small class="text-muted"><strong>WLAN:</strong> &nbsp;${data.data.others.WLAN}</small></p>` : `<p class="card-text mb-0"><small class="text-muted"><strong>WLAN:</strong> Not found</small></p>`)(data)
            }
          </div>
        </div>
      </div>
    </div>
      `
    }
    hideLoading()
}