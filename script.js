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