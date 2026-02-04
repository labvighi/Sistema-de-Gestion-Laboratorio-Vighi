// login.js
// Lógica de autenticación con archivo JSON

// Referencias a los elementos del DOM
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const statusDiv = document.getElementById("status");

// Variable para almacenar los usuarios
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

// Función para cargar usuarios desde JSON o localStorage
async function cargarUsuarios() {
  try {
    // Primero intentar cargar desde JSON
    const response = await fetch('usuarios.json');
    
    if (response.ok) {
      const data = await response.json();
      usuarios = data.usuarios;
      
      // Guardar en localStorage como backup
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      console.log(`✅ ${usuarios.length} usuarios cargados desde JSON`, usuarios);
      return true;
    }
  } catch (error) {
    console.log('⚠️ No se pudo cargar usuarios.json, intentando localStorage...');
  }
  
  // Si falla el JSON, usar localStorage
  try {
    const usuariosLocal = localStorage.getItem('usuarios');
    
    if (usuariosLocal) {
      usuarios = JSON.parse(usuariosLocal);
      console.log(`✅ ${usuarios.length} usuarios cargados desde localStorage`, usuarios);
      return true;
    } else {
      // Si tampoco hay en localStorage, usar usuarios por defecto
      usuarios = [
        {
          id: 1,
          mail: "pruebamail@susanavighi.com.ar",
          clave: "Clave1234"
        },
        {
          id: 2,
          mail: "mailprueba@susanavighi.com.ar",
          clave: "Clave1234"
        }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      console.log('✅ Usuarios por defecto cargados', usuarios);
      return true;
    }
  } catch (error) {
    console.error('❌ Error cargando usuarios:', error);
    setStatus('Error al cargar la base de datos.', true);
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
    setStatus("Completá mail y clave.", true);
    return;
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setStatus("Ingresá un email válido.", true);
    return;
  }

  // Deshabilitar el botón mientras se procesa
  btnLogin.disabled = true;
  btnLogin.textContent = "Validando...";
  setStatus("Validando...");

  try {
    // Validar credenciales
    const usuario = validarCredenciales(email, password);

    if (!usuario) {
      setStatus("Mail o clave incorrectos.", true);
      btnLogin.disabled = false;
      btnLogin.textContent = "Continuar";
      return;
    }

    // Login exitoso
    setStatus("Acceso concedido ✅", false, true);
    btnLogin.textContent = "Redirigiendo...";
    
    // Guardar información del usuario en sessionStorage
    sessionStorage.setItem("usuario", JSON.stringify({
      id: usuario.id,
      mail: usuario.mail
    }));

    // Redirigir después de 800ms
    setTimeout(() => {
      window.location.href = "prueba.html";
    }, 800);

  } catch (err) {
    console.error("Error inesperado:", err);
    setStatus("Error inesperado. Intentá de nuevo.", true);
    btnLogin.disabled = false;
    btnLogin.textContent = "Continuar";
  }
});

// Limpiar estado al escribir
emailInput.addEventListener("input", () => {
  clearStatus();
  if (btnLogin.disabled && usuarios.length > 0) {
    btnLogin.disabled = false;
    btnLogin.textContent = "Continuar";
  }
});

passInput.addEventListener("input", () => {
  clearStatus();
  if (btnLogin.disabled && usuarios.length > 0) {
    btnLogin.disabled = false;
    btnLogin.textContent = "Continuar";
  }
});

// Cargar usuarios al iniciar la página
window.addEventListener('DOMContentLoaded', async () => {
  const cargado = await cargarUsuarios();
  
  if (!cargado) {
    btnLogin.disabled = true;
    btnLogin.textContent = "Error al cargar";
  }
});