// ------------------- Get URL from Pages ------------------- GO ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cocktails')) {
        const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin';
        fetchData(drinkUrl, 'drink');
    }
});
// ------------------- Get URL from Pages ------------------- END ---


// ------------------- Get Data Home  ------------------- GO ---
async function fetchRandomData(drinkRandomUrl) {
    try {
        const [drinkRandomResponse] = await Promise.all([
            fetch(drinkRandomUrl)
        ]);

        if (!drinkRandomResponse.ok) {
            throw new Error('Error en la petición de las APIs');
        }

        const drinkRandomData = await drinkRandomResponse.json();

        printRandomDrink(drinkRandomData.drinks[0]);

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
        printDrinks(data.drinks);

    } catch (error) {
        console.log('Error:', error);
    }
}
// ------------------- Get Data Pages ------------------- END ---


// ------------------- Cocktels ------------------- GO ---
function printDrinks(drinks) {
    const dataContainer = document.getElementById('recipesDiv');
    dataContainer.innerHTML = '';
    drinks.forEach(drink => {
        const drinkDiv = document.createElement('div');
        drinkDiv.classList.add('product');
        drinkDiv.innerHTML = `
            <h2>${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <button id="button_selector" onclick="showDetails('${drink.idDrink}', 'drink')">Ver más</button>
        `;
        dataContainer.appendChild(drinkDiv);
    });
}
// ------------------- Cocktels ------------------- END ---

// ------------------- Details Modal ------------------- GO ---
async function showDetails(id) {
    let detailsUrl;

    detailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    
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
    printDrinks
};