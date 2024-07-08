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
    // alert('dentro publicarMensaje')
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
            <p><strong>Recipe:</strong> ${nombre}</p>
            <p><strong>Ingredients:</strong> ${ingredients}</p>
            <p><strong>Preparation:</strong> ${mensaje}</p>
            
            <h4>Thank you very much, we will shortly enter it into our DB for viewing.</h4>
            </div>
        </div>
    </div>

    `;

// <img class="itemImgTecnology" src="${fotoInput}" alt="newRecipe">

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

    document.getElementById('formulario').reset();
    actualizarContador(); 
}


// ------------------- FORM ------------------- END ---

module.exports = {
    getElementById,
    publicarMensaje
};