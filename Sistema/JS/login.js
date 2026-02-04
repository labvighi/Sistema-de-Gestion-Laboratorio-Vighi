// login.js
// Lógica de autenticación con archivo CSV

// Referencias a los elementos del DOM
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const statusDiv = document.getElementById("status");

// Variable para almacenar los usuarios cargados desde el CSV
let usuarios = [];

// Función para mostrar mensajes de estado
function setStatus(mensaje, esError = false, esExito = false) {
  statusDiv.textContent = mensaje;
  statusDiv.className = "show";
  
  if (esError) {
    statusDiv.classList.add("error");
  } else if (esExito) {
    statusDiv.classList.add("success");
  } else {
    statusDiv.classList.add("info");
  }
}

// Función para limpiar el mensaje de estado
function clearStatus() {
  statusDiv.textContent = "";
  statusDiv.className = "";
}

// Función para cargar y parsear el archivo CSV
async function cargarUsuarios() {
  try {
    const response = await fetch('usuarios.csv');
    
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo de usuarios');
    }
    
    const texto = await response.text();
    
    // Parsear el CSV (usa ; como separador)
    const lineas = texto.split('\n');
    
    // Saltar la primera línea (encabezados)
    for (let i = 1; i < lineas.length; i++) {
      const linea = lineas[i].trim();
      
      if (linea) {
        const [id, mail, clave] = linea.split(';');
        
        if (mail && clave) {
          usuarios.push({
            id: id,
            mail: mail.trim(),
            clave: clave.trim()
          });
        }
      }
    }
    
    console.log(`✅ ${usuarios.length} usuarios cargados correctamente`);
    return true;
    
  } catch (error) {
    console.error('Error cargando usuarios:', error);
    setStatus('Error al cargar la base de datos de usuarios.', true);
    return false;
  }
}

// Función para validar credenciales
function validarCredenciales(email, password) {
  return usuarios.find(user => 
    user.mail.toLowerCase() === email.toLowerCase() && 
    user.clave === password
  );
}

// Permitir login con Enter
emailInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btnLogin.click();
});

passInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btnLogin.click();
});

// Evento del botón de login
btnLogin.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passInput.value;

  // Validación de campos vacíos
  if (!email || !password) {
    setStatus("Por favor, completá el email y la contraseña.", true);
    return;
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setStatus("Por favor, ingresá un email válido.", true);
    return;
  }

  // Deshabilitar el botón mientras se procesa
  btnLogin.disabled = true;
  setStatus("Validando credenciales...");

  try {
    // Validar credenciales
    const usuario = validarCredenciales(email, password);

    if (!usuario) {
      setStatus("Email o contraseña incorrectos.", true);
      btnLogin.disabled = false;
      return;
    }

    // Login exitoso
    setStatus("¡Acceso concedido! Redirigiendo...", false, true);
    
    // Guardar información del usuario en sessionStorage
    sessionStorage.setItem("usuario", JSON.stringify({
      id: usuario.id,
      mail: usuario.mail
    }));

    // Redirigir después de 1 segundo
    setTimeout(() => {
      window.location.href = "prueba.html";
    }, 1000);

  } catch (err) {
    console.error("Error inesperado:", err);
    setStatus("Ocurrió un error inesperado. Intentá nuevamente.", true);
    btnLogin.disabled = false;
  }
});

// Limpiar estado al escribir
emailInput.addEventListener("input", clearStatus);
passInput.addEventListener("input", clearStatus);

// Cargar usuarios al iniciar la página
window.addEventListener('DOMContentLoaded', async () => {
  const cargado = await cargarUsuarios();
  
  if (!cargado) {
    btnLogin.disabled = true;
  }
});