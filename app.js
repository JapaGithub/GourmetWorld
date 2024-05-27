document.addEventListener('DOMContentLoaded', () => getMeals('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken'));
document.addEventListener('DOMContentLoaded', () => getDrinks('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin'));

// ------------------- Gastronomy ------------------- GO ---

async function getMeals(url) {
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

// ------------------- Cocktels ------------------- GO ---
async function getDrinks(url) {
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

// ------------------- Modal ------------------- GO ---

async function showDetails(id, type) {
    let detailsUrl;
    if (type === 'meal') {
        detailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
        detailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
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

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// ------------------- Modal ------------------- END ---

// ------------------- Formulario ------------------- GO --- 

function validarFormulario() {
    var nombre = document.getElementById('nombre').value.trim();
    var lugar = document.getElementById('lugar').value.trim();
    var mensaje = document.getElementById('mensaje').value.trim();
    var fotoInput = document.getElementById('foto').files[0];

    // Verificar que los campos obligatorios estén completos
    if (nombre === '' || lugar === '' || mensaje === '' || !fotoInput) {
        alert('Por favor, completa todos los campos obligatorios.');
        return false; // Evitar el envío del formulario si faltan campos obligatorios
    }

    // Verificar el formato de la foto
    var extensionesPermitidas = ['image/jpeg', 'image/png', 'video/mp4'];
    if (extensionesPermitidas.indexOf(fotoInput.type) === -1) {
        alert('Por favor, selecciona un archivo de imagen (JPEG, PNG) o video (MP4).');
        return false; // Evitar el envío del formulario si el formato no es válido
    }

    return true; // Envío del formulario si pasa todas las validaciones
}

function actualizarContador() {
    var mensaje = document.getElementById('mensaje').value;
    var contador = document.getElementById('contador');
    var caracteresRestantes = 1000 - mensaje.length;
    contador.textContent = caracteresRestantes + '/1000';
    
    // Deshabilitar la entrada de texto cuando el contador llega a cero
    var mensajeInput = document.getElementById('mensaje');
    if (caracteresRestantes <= 0) {
        mensajeInput.value = mensajeInput.value.slice(0, 1000);
        mensajeInput.setAttribute('disabled', 'disabled');
    } else {
        mensajeInput.removeAttribute('disabled');
    }
}

function publicarMensaje() {
    
    var nombre = document.getElementById('nombre').value;
    var lugar = document.getElementById('lugar').value;
    var mensaje = document.getElementById('mensaje').value;
    var fotoInput = document.getElementById('foto').files[0];
    
    var mensajesList = document.getElementById('mensajesList');
    var nuevoMensaje = document.createElement('div');
    nuevoMensaje.innerHTML = `
        <p><strong>Recipe:</strong> ${nombre}</p>
        <p><strong>Ingredients:</strong> ${lugar}</p>
        <p><strong>Preparation:</strong> ${mensaje}</p>`;
    
    if (fotoInput) {
        var imagen = document.createElement('img');
        imagen.classList.add('mensaje-imagen');
        var imagenURL = URL.createObjectURL(fotoInput);
        imagen.src = imagenURL;
        nuevoMensaje.appendChild(imagen);
    }

    mensajesList.appendChild(nuevoMensaje);

    // Resetear el formulario después de publicar el mensaje
    document.getElementById('formulario').reset();
}

document.getElementById('formulario').addEventListener('submit', function(event) {
    if (!validarFormulario()) {
        event.preventDefault(); // Evitar el envío del formulario si la validación falla
    } else {
        event.preventDefault(); // Evitar el comportamiento predeterminado de enviar el formulario
        publicarMensaje(event); // Llamar a la función para publicar el mensaje
    }
});

// ------------------- Formulario ------------------- END ---

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