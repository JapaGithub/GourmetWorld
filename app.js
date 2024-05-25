document.addEventListener('DOMContentLoaded', getListRecipes);

const apiKey = '196d63cf1c7a47ea9bf43a7f63fd1120';
const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=5`;
console.log(searchUrl);

async function getListRecipes() {
    try {
        const response = await fetch(searchUrl);
        console.log(response);

        if (!response.ok) {
            console.log('Error obteniendo la data de la API');
            throw new Error('Error en la petición');
        }
        
        
        const data = await response.json();
        
        console.log(data);

        if (data.results && data.results.length > 0) {
            // Obtener detalles de cada receta
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
        recipeDiv.innerHTML = `
            <h2>${element.title}</h2>   
            <img src="${element.image}" alt="${element.title}">
            <p>${element.instructions || 'No instructions available'}</p>
        `;
        dataContainer.appendChild(recipeDiv); 
    });
}
