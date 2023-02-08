var choosingOptionsPage = document.querySelector('.choosingOptions');
var cuisineTypeEl = document.querySelector('.cuisineType');
var dietEl = document.querySelector('.diet');
var dishTypeEl = document.querySelector('.dishType');
var checkBoxesEl = document.querySelector('.checkBoxes');
var viewSuggestionsBtn = document.querySelector('.submit');
var suggestionsPageEl = document.querySelector('.suggestionsPage');
var demoEl = document.querySelector('.demo');
var suggestionsListEl = document.querySelector('.suggestionsList');
var favoriteMealListEl = document.querySelector('.favoriteMealList');
var returnToSearchBtn = document.querySelector('.returnToSearch');

var suggestionsUrl;
var cuisineType;
var diet;
var dishType;
var addingFavorites = [];

//starts the function when the submit button is pressed
viewSuggestionsBtn.addEventListener('click', chooseSearchParameters);

//looks for any parameters to add to the api call 
function chooseSearchParameters(event) {
  event.preventDefault();
  var cuisineType = cuisineTypeEl.value;
  var diet = dietEl.value;
  var dishType = dishTypeEl.value;

  console.log(cuisineType + diet + dishType);
  getSuggestions(cuisineType, diet, dishType);
};


function getSuggestions(cuisineType, diet, dishType) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9c99646218msh9378014e04a0a25p1f2a3ajsn81783a87a42a',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  var suggestionsUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?cuisine=' + cuisineType + '&diet=' + diet + '&type=' + dishType + '&instructionsRequired=true&sort=random&offset=0&number=6&limitLicense=false&ranking=2&addRecipieInformation=true'

  fetch(suggestionsUrl, options).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        console.log(response);
        displaySuggestions(data);
        // demoEl.setAttribute('href', data.hits.recipe.image);
      });
    }
  });

};

function displaySuggestions(response) {
  if (response.results.length< 1) {
    alert ('there are no results');
    return;
  }
  choosingOptionsPage.style.display = "none";
  suggestionsPageEl.style.display = 'initial';
  for (var i = 0; i < response.results.length; i++) {
    // for(i=0; i<results.lenght; i++){
    var suggestionsitemsEl = document.createElement('li');
    suggestionsListEl.appendChild(suggestionsitemsEl);
    // suggestionsItemsEl.setAttribute('class', 'col-4');
    var titleEl = document.createElement('h2');
    titleEl.textContent = response.results[i].title;
    suggestionsitemsEl.appendChild(titleEl);
    var imgEl = document.createElement('img');
    imgEl.setAttribute('src', response.results[i].image);
    suggestionsitemsEl.appendChild(imgEl);
    var addBtn = document.createElement('button');
    addBtn.textContent = "+";
    suggestionsitemsEl.appendChild(addBtn);
    addBtn.setAttribute("id", response.results[i].title);
    // addBtn.setAttribute("class", 'heart icon');
  }
}

suggestionsListEl.addEventListener('click', function (event) {
  titleOfFavorites = event.target.id;
  var favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals"));
  console.log(favoriteMeals)
  if (favoriteMeals !== null) {
    if(favoriteMeals.includes(titleOfFavorites)){
      return;
    }
    favoriteMeals.push(titleOfFavorites);
    localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
  } else {
    localStorage.setItem('favoriteMeals', JSON.stringify([titleOfFavorites]));
  }
  var favoritesList = document.createElement('li');
  favoritesList.textContent = titleOfFavorites;
  favoriteMealListEl.appendChild(favoritesList)
})

// })

function getFavsFromStorage() {
  var favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals'))

  if (favoriteMeals !== null) {
    for (var i = 0; i < favoriteMeals.length; i++) {
      var favoritesList = document.createElement('li');
      favoritesList.textContent = favoriteMeals[i];
      favoriteMealListEl.appendChild(favoritesList)
    }
  }
}

getFavsFromStorage();

returnToSearchBtn.addEventListener('click', function(){
  choosingOptionsPage.style.display= 'initial';
  suggestionsPageEl.style.display='none';
  suggestionsListEl.innerHTML= '';
})
