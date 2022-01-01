const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "2ad15500";
const APP_KEY = "fdb39109ebc74130f28888cce8c00a6f";

const baseURL = `https://api.edamam.com/search?q=pizza&app_id=2ad15500&app_key=fdb39109ebc74130f28888cce8c00a6f`;
// const baseURL = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}`;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
  })
  
  async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=2ad15500&app_key=fdb39109ebc74130f28888cce8c00a6f&from=0&to=20`;
    console.log(baseURL)
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data.hits);
  }
  
  function generateHTML(results){
    // container.classList.remove('initial');
    let generatedHTML= '';
    results.map(result => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
          <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
        </div>
      `
      console.log(generatedHTML);
    })
    searchResultDiv.innerHTML = generatedHTML;
  }