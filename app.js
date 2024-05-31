// ------------------- Get URL from Pages ------------------- GO ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('home')) {
        const mealRandomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
        const drinkRandomUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        fetchRandomData(mealRandomUrl, drinkRandomUrl);
    }

    if (document.getElementById('gastronomy')) {
        const mealUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
        fetchData(mealUrl, 'meal');
    }

    if (document.getElementById('cocktails')) {
        const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin';
        fetchData(drinkUrl, 'drink');
    }

    const formulario = document.getElementById('formulario');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            if (!validarFormulario()) {
                event.preventDefault(); // Evitar el envío del formulario si la validación falla
            } else {
                event.preventDefault(); // Evitar el comportamiento predeterminado de enviar el formulario
                publicarMensaje(); // Llamar a la función para publicar el mensaje
            }
        });
    }   
    
});
// ------------------- Get URL from Pages ------------------- END ---


// ------------------- Get Data Home  ------------------- GO ---
async function fetchRandomData(mealRandomUrl, drinkRandomUrl) {
    try {
        const [mealRandomResponse, drinkRandomResponse] = await Promise.all([
            fetch(mealRandomUrl),
            fetch(drinkRandomUrl)
        ]);

        if (!mealRandomResponse.ok || !drinkRandomResponse.ok) {
            throw new Error('Error en la petición de las APIs');
        }

        const mealRandomData = await mealRandomResponse.json();
        const drinkRandomData = await drinkRandomResponse.json();

        printRandomMeal(mealRandomData.meals[0]);
        printRandomDrink(drinkRandomData.drinks[0]);

    } catch (error) {
        console.log('Error:', error);
    }
}
// ------------------- Get Data Home ------------------- END ---


// ------------------- Gastronomy & Coctktels Random ------------------- GO ---
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
// ------------------- Gastronomy & Coctktels Random ------------------- END ---

// ------------------- Get Data Pages ------------------- GO ---
async function fetchData(url, type) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        if (type === 'meal') {
            printMeals(data.meals);
        } else {
            printDrinks(data.drinks);
        }
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

// document.querySelector('.close').addEventListener('click', () => {
//     document.getElementById('modal').style.display = 'none';
// });

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
// ------------------- Details Modal ------------------- END ---

// ------------------- TEXT MAIN ------------------- GO ---
// function([string1, string2],target id,[color1,color2])    
// consoleText(['Hello World.', 'Console Text', 'Made with Love.'], 'text', ['black', 'rebeccapurple', 'lightblue']);

// function consoleText(words, id, colors) {
//   if (colors === undefined) colors = ['#fff'];
//   var visible = true;
//   var con = document.getElementById('console-underscore');
//   var letterCount = 1;
//   var x = 1;
//   var waiting = false;
//   var target = document.getElementById(id);
//   target.setAttribute('style', 'color:' + colors[0]);
  
//   window.setInterval(function() {
//     if (letterCount === 0 && waiting === false) {
//       waiting = true;
//       target.innerHTML = words[0].substring(0, letterCount);
//       window.setTimeout(function() {
//         var usedColor = colors.shift();
//         colors.push(usedColor);
//         var usedWord = words.shift();
//         words.push(usedWord);
//         x = 1;
//         target.setAttribute('style', 'color:' + colors[0]);
//         letterCount += x;
//         waiting = false;
//       }, 1000);
//     } else if (letterCount === words[0].length + 1 && waiting === false) {
//       waiting = true;
//       window.setTimeout(function() {
//         x = -1;
//         letterCount += x;
//         waiting = false;
//       }, 1000);
//     } else if (waiting === false) {
//       target.innerHTML = words[0].substring(0, letterCount);
//       letterCount += x;
//     }
//   }, 120);
  
//   window.setInterval(function() {
//     if (visible === true) {
//       con.className = 'console-underscore hidden';
//       visible = false;
//     } else {
//       con.className = 'console-underscore';
//       visible = true;
//     }
//   }, 400);
//}
// ------------------- TEXT MAIN ------------------- END ---

// ------------------- FORM ------------------- GO ---

// Validar formulario y publicar mensaje

function validarFormulario() {
    console.log('dentro de validarFormulario')
    let nombre = document.getElementById('nombre').value.trim();
    let ingredients = document.getElementById('ingredients').value.trim();
    let mensaje = document.getElementById('mensaje').value.trim();
    let fotoInput = document.getElementById('foto').files[0];

    // Verificar que los campos obligatorios estén completos
    if (nombre === '' || ingredients === '' || mensaje === '' || !fotoInput) {
        alert('Por favor, completa todos los campos obligatorios.');
        console.log("Nombre: " + nombre,
        "Ingredients: " + ingredients,
        "Mensaje: " + mensaje,
        "Foto: "  + foto);
        return false; // Evitar el envío del formulario si faltan campos obligatorios
    }

    // Verificar el formato de la foto
    let extensionesPermitidas = ['image/jpeg', 'image/png', 'video/mp4'];
    if (!extensionesPermitidas.includes(fotoInput.type)) {
        alert('Por favor, selecciona un archivo de imagen (JPEG, PNG) o video (MP4).');
        return false; // Evitar el envío del formulario si el formato no es válido
    }

    // Verificar el tamaño del archivo (ejemplo: 5MB máximo)
    let tamañoMaximo = 5 * 1024 * 1024; // 5MB
    if (fotoInput.size > tamañoMaximo) {
        alert('El archivo es demasiado grande. Máximo 5MB.');
        return false; // Evitar el envío del formulario si el tamaño del archivo es demasiado grande
    }

    return true; // Envío del formulario si pasa todas las validaciones
}

function actualizarContador() {
    let mensaje = document.getElementById('mensaje').value;
    let contador = document.getElementById('contador');
    let caracteresRestantes = 1000 - mensaje.length;
    contador.textContent = caracteresRestantes + '/1000';
}

function publicarMensaje() {
    alert('dentro publicarMensaje')
    let nombre = document.getElementById('nombre').value;
    let ingredients = document.getElementById('ingredients').value;
    let mensaje = document.getElementById('mensaje').value;
    let fotoInput = document.getElementById('foto').files[0];

    let mensajesList = document.getElementById('mensajesList');
    let nuevoMensaje = document.createElement('div');
    nuevoMensaje.innerHTML = `
        <div class="message-container">
        <div class="mensajes">
            <h3>You sent us this recipe</h3>
            <img class="itemImgTecnology" src="${fotoInput}" alt="newRecipe">
            <p><strong>Recipe:</strong> ${nombre}</p>
            <p><strong>Ingredients:</strong> ${ingredients}</p>
            <p><strong>Preparation:</strong> ${mensaje}</p>
            <h4>Thank you very much, we will shortly enter it into our DB for viewing.</h4>
            </div>
        </div>
    </div>


    `;

     if (fotoInput) {
         let media;
         if (fotoInput.type.includes('image')) {
             media = document.createElement('img');
         } else if (fotoInput.type.includes('video')) {
             media = document.createElement('video');
             media.controls = true;
         }
         media.classList.add('mensaje-media');
         let mediaURL = URL.createObjectURL(fotoInput);
         media.src = mediaURL;
         nuevoMensaje.appendChild(media);
     }

    mensajesList.appendChild(nuevoMensaje);

    // Resetear el formulario después de publicar el mensaje
    document.getElementById('formulario').reset();
    actualizarContador(); // Restablecer el contador de caracteres
}


// ------------------- FORM ------------------- END ---