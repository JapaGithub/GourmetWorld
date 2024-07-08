// ------------------- Get URL from Pages ------------------- GO ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gastronomy')) {
        const mealUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
        fetchData(mealUrl, 'meal');
    }
});
// ------------------- Get URL from Pages ------------------- END ---

// ------------------- Get Data Home  ------------------- GO ---
async function fetchRandomData(mealRandomUrl) {
    try {
        const [mealRandomResponse] = await Promise.all([
            fetch(mealRandomUrl)
        ]);

        if (!mealRandomResponse.ok) {
            throw new Error('Error en la petición de las APIs');
        }

        const mealRandomData = await mealRandomResponse.json();

        printRandomMeal(mealRandomData.meals[0]);

    } catch (error) {
        console.log('Error:', error);
    }
}
// ------------------- Get Data Home ------------------- END ---

// ------------------- Get Data Pages ------------------- GO ---
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        printMeals(data.meals);

    } catch (error) {
        console.log('Error:', error);
    }
}
// ------------------- Get Data Pages ------------------- END ---

// ------------------- Gastronomy ------------------- GO ---
function printMeals(meals) {
    const dataContainer = document.getElementById('recipesDiv');
    dataContainer.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('product');
        mealDiv.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <button id="button_selector" onclick="showDetails('${meal.idMeal}', 'meal')">Ver más</button>
        `;
        dataContainer.appendChild(mealDiv);
    });
}
// ------------------- Gastronomy ------------------- END ---

// ------------------- Details Modal ------------------- GO ---
async function showDetails(id) {
    let detailsUrl;

    detailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    
    try {
        const response = await fetch(detailsUrl);
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        const item = type === 'meal' ? data.meals[0] : data.drinks[0];

        document.getElementById('modal-title').innerText = item.strMeal || item.strDrink;
        document.getElementById('modal-image').src = item.strMealThumb || item.strDrinkThumb;
        document.getElementById('modal-instructions').innerText = item.strInstructions;

        const ingredientsList = document.getElementById('modal-ingredients');
        ingredientsList.innerHTML = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = item[`strIngredient${i}`];
            const measure = item[`strMeasure${i}`];
            if (ingredient) {
                const li = document.createElement('li');
                li.innerText = `${ingredient} - ${measure}`;
                ingredientsList.appendChild(li);
            }
        }

        document.getElementById('modal').style.display = 'flex';
    } catch (error) {
        console.log('Error:', error);
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
// ------------------- Details Modal ------------------- END ---

module.exports = {
    fetchRandomData,
    fetchData,
    printMeals
};