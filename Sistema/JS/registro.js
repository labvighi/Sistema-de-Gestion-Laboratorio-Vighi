// registro.js
// Sistema de registro de usuarios con localStorage

const form = document.getElementById('formRegistro');
const statusDiv = document.getElementById('status');

// Referencias a los campos
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('email');
const claveInput = document.getElementById('clave');
const confirmarClaveInput = document.getElementById('confirmarClave');
const direccionSelect = document.getElementById('direccion');
const perfilSelect = document.getElementById('perfil');
const btnCrear = document.getElementById('btnCrear');

// Función para mostrar mensajes
function setStatus(mensaje, esError = false) {
  statusDiv.textContent = mensaje;
  statusDiv.className = 'show ' + (esError ? 'error' : 'success');
}

// Función para obtener usuarios guardados
function obtenerUsuarios() {
  const usuariosJSON = localStorage.getItem('usuarios');
  if (usuariosJSON) {
    return JSON.parse(usuariosJSON);
  }
  // Si no hay usuarios en localStorage, cargar los usuarios iniciales
  return [
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
}

// Función para guardar usuarios
function guardarUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función para verificar si el email ya existe
function emailExiste(email) {
  const usuarios = obtenerUsuarios();
  return usuarios.some(user => user.mail.toLowerCase() === email.toLowerCase());
}

// Evento de envío del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Limpiar mensajes de error previos
  document.querySelectorAll('.label-danger').forEach(el => el.style.display = 'none');
  
  // Obtener valores
  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const email = emailInput.value.trim();
  const clave = claveInput.value;
  const confirmarClave = confirmarClaveInput.value;
  const perfil = perfilSelect.value;
  
  // Validaciones
  let hayErrores = false;
  
  if (!nombre) {
    document.getElementById('errorNombre').style.display = 'inline-block';
    hayErrores = true;
  }
  
  if (!apellido) {
    document.getElementById('errorApellido').style.display = 'inline-block';
    hayErrores = true;
  }
  
  if (!validarEmail(email)) {
    document.getElementById('errorEmail').style.display = 'inline-block';
    hayErrores = true;
  }
  
  if (clave.length < 6) {
    document.getElementById('errorClave').style.display = 'inline-block';
    hayErrores = true;
  }
  
  if (clave !== confirmarClave) {
    document.getElementById('errorConfirmar').style.display = 'inline-block';
    hayErrores = true;
  }
  
  if (hayErrores) {
    setStatus('Por favor, corregí los errores marcados.', true);
    return;
  }
  
  // Verificar si el email ya existe
  if (emailExiste(email)) {
    setStatus('Este email ya está registrado.', true);
    return;
  }
  
  // Deshabilitar botón
  btnCrear.disabled = true;
  btnCrear.textContent = 'Creando...';
  
  try {
    // Obtener usuarios existentes
    const usuarios = obtenerUsuarios();
    
    // Generar nuevo ID
    const nuevoId = usuarios.length > 0 
      ? Math.max(...usuarios.map(u => u.id)) + 1 
      : 1;
    
    // Crear nuevo usuario
    const nuevoUsuario = {
      id: nuevoId,
      nombre: nombre,
      apellido: apellido,
      direccion: direccionSelect ? direccionSelect.value : '',
      mail: email,
      clave: clave,
      perfil: perfil
    };
    
    // Agregar a la lista
    usuarios.push(nuevoUsuario);
    
    // Guardar en localStorage
    guardarUsuarios(usuarios);
    
    console.log('✅ Usuario creado:', nuevoUsuario);
    console.log('📋 Todos los usuarios:', usuarios);
    
    // Mostrar mensaje de éxito
    setStatus('¡Usuario creado exitosamente! Redirigiendo...', false);
    
    // Limpiar formulario
    form.reset();
    
    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    
  } catch (error) {
    console.error('Error al crear usuario:', error);
    setStatus('Error al crear el usuario. Intentá nuevamente.', true);
    btnCrear.disabled = false;
    btnCrear.textContent = 'Crear usuario';
  }
});

// Limpiar mensajes de error al escribir
[nombreInput, apellidoInput, emailInput, claveInput, confirmarClaveInput].forEach(input => {
  input.addEventListener('input', () => {
    statusDiv.className = '';
  });
});

// Cargar usuarios iniciales si no existen
window.addEventListener('DOMContentLoaded', () => {
  const usuarios = obtenerUsuarios();
  guardarUsuarios(usuarios);
  console.log('📋 Usuarios disponibles:', usuarios);
});