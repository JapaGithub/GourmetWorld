document.addEventListener('DOMContentLoaded', getMeals);


const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';

async function getMeals() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        printMeals(data.meals);
    } catch (error) {
        console.log('Error: ', error);
    }
}




function printMeals(meals) {
    const dataContainer = document.getElementById('recipesDiv');
    dataContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('product');
        mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="product-details">
            <h2>${meal.strMeal}</h2>
            <button onclick="showDetails(${meal.idMeal})">Ver más</button>
        </div>
        `;
        dataContainer.appendChild(mealDiv);
    });
}

async function showDetails(id) {
    const detailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
        const response = await fetch(detailsUrl);
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        const meal = data.meals[0];

        document.getElementById('modal-title').innerText = meal.strMeal;
        document.getElementById('modal-image').src = meal.strMealThumb;
        document.getElementById('modal-instructions').innerText = meal.strInstructions;

        const ingredientsList = document.getElementById('modal-ingredients');
        ingredientsList.innerHTML = '';

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                const li = document.createElement('li');
                li.innerText = `${ingredient} - ${measure}`;
                ingredientsList.appendChild(li);
            }
        }


        document.getElementById('modal').style.display = 'flex';
    } catch (error) {
        console.log('Error: ', error);
    }
}



document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}




// document.addEventListener('DOMContentLoaded', getMeals);

// const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';

// async function getMeals() {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Error en la petición');
//         }
//         const data = await response.json();
//         console.log(data);
//         printMeals(data.meals);
//     } catch (error) {
//         console.log('Error: ', error);
//     }
// }

// function printMeals(meals) {
//     const dataContainer = document.getElementById('mealsDiv');
//     dataContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos
//     meals.forEach(meal => {
//         const mealDiv = document.createElement('div');
//         mealDiv.innerHTML = `
//             <h2 class="product">${meal.strMeal}</h2>
//             <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//             <button onclick="showDetails(${meal.idMeal})">Ver Instrucciones</button>
//         `;
//         dataContainer.appendChild(mealDiv);
//     });
// }