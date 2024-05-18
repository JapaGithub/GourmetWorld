let likeCounts = {
    product1: 0,
    product2: 0,
    product3: 0,
    product4: 0,
    product5: 0,
    product6: 0
};

function toggleLike(productId) {
    likeCounts[productId]++;
    document.getElementById('like-count-' + productId).innerText = likeCounts[productId];
}


    document.addEventListener("DOMContentLoaded", async function() {
        try {
            // Hacer la solicitud HTTP GET a la API usando async/await
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();

            // Extraer la información de la receta
            const recipe = data.meals[0];

            // Construir el HTML para mostrar la receta
            const recipeHTML = `
            <h2>${recipe.strMeal}</h2>
            
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            
            <h3>Category</h3>
            <p>${recipe.strCategory}</p>
            
            <h3>Contry</h3>
            <p>${recipe.strArea}</p>
            `;

            // Mostrar la receta en el contenedor
            document.getElementById('recipe-container').innerHTML = recipeHTML;
        } catch (error) {
            console.error('Error fetching recipe:', error);
        }
    });

// Función para obtener los ingredientes
function getIngredients(recipe) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        let ingredient = recipe[`strIngredient${i}`];
        if (ingredient) {
            ingredients.push(`<li>${ingredient}</li>`);
        } else {
            break;// No hay más ingredientes
        }
    }
    return ingredients;
}