document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('home')) {
        const mealRandomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
        const drinkRandomUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        fetchRandomData(mealRandomUrl, drinkRandomUrl);
    }   
});

// ------------------- Gastronomy & Coctktels Random ------------------- GO ---index OJOOOO
function printRandomMeal(item) {
    const dataContainer = document.getElementById('randomMealDiv');
    dataContainer.innerHTML = ''; 
    const randomMealDiv = document.createElement('div');
    randomMealDiv.classList.add('productRandom');
    randomMealDiv.innerHTML = `
        <img class="imgRandom" src="${item.strMealThumb}" alt="${item.strMeal}">
    `;
    dataContainer.appendChild(randomMealDiv);
}

function printRandomDrink(item) {
    const dataContainer = document.getElementById('randomDrinkDiv');
    dataContainer.innerHTML = ''; // Clear the container
    const randomDrinkDiv = document.createElement('div');
    randomDrinkDiv.classList.add('productRandom');
    randomDrinkDiv.innerHTML = `
        <img class="imgRandom" src="${item.strDrinkThumb}" alt="${item.strDrink}">
        
    `;
    dataContainer.appendChild(randomDrinkDiv);
}
// ------------------- Gastronomy & Coctktels Random ------------------- END ---index OJOOOO

module.exports = {
    printRandomMeal,
    printRandomDrink
};