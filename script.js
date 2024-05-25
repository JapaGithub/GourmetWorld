// let likeCounts = {
//     product1: 0,
//     product2: 0,
//     product3: 0,
//     product4: 0,
//     product5: 0,
//     product6: 0
// };

// function toggleLike(productId) {
//     likeCounts[productId]++;
//     document.getElementById('like-count-' + productId).innerText = likeCounts[productId];
// }


//     document.addEventListener("DOMContentLoaded", async function() {
//         try {
//             // Hacer la solicitud HTTP GET a la API usando async/await
//             let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
//             let data = await response.json();

//             // Extraer la información de la receta
//             const recipe = data.meals[0];

//             // Construir el HTML para mostrar la receta
//             const recipeHTML = `
//             <h2>${recipe.strMeal}</h2>
            
//             <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            
//             <h3>Category</h3>
//             <p>${recipe.strCategory}</p>
            
//             <h3>Contry</h3>
//             <p>${recipe.strArea}</p>
//             `;

//             // Mostrar la receta en el contenedor
//             document.getElementById('recipe-container').innerHTML = recipeHTML;
//         } catch (error) {
//             console.error('Error fetching recipe:', error);
//         }
//     });

// // Función para obtener los ingredientes
// function getIngredients(recipe) {
//     let ingredients = [];
//     for (let i = 1; i <= 20; i++) {
//         let ingredient = recipe[`strIngredient${i}`];
//         if (ingredient) {
//             ingredients.push(`<li>${ingredient}</li>`);
//         } else {
//             break;// No hay más ingredientes
//         }
//     }
//     return ingredients;
// }

document.addEventListener('DOMContentLoaded', getListRecipes);

const apiKey = '196d63cf1c7a47ea9bf43a7f63fd1120';
const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30`;

async function getListRecipes() {
    try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const recipesDetails = await Promise.all(
                data.results.map(async (recipe) => {
                    const detailsUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
                    const detailsResponse = await fetch(detailsUrl);
                    const detailsData = await detailsResponse.json();
                    return detailsData;
                })
            );
            printRecipes(recipesDetails);
        } else {
            console.log('No se encontraron recetas');
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

function printRecipes(recipes) {
    const dataContainer = document.getElementById('recipesDiv');
    dataContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos
    recipes.forEach(element => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h2>${element.title}</h2>
            <img src="${element.image}" alt="${element.title}">
            <button onclick="showDetails(${element.id})">Ver Instrucciones</button>
        `;
        dataContainer.appendChild(recipeDiv);
    });
}

async function showDetails(id) {
    const detailsUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    try {
        const response = await fetch(detailsUrl);
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-image').src = data.image;
        document.getElementById('modal-instructions').innerText = data.instructions || 'No instructions available';
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