// login.js

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const statusDiv = document.getElementById("status");

let usuarios = [];

function setStatus(mensaje, esError = false, esExito = false) {
  statusDiv.textContent = mensaje;
  statusDiv.className = "status-msg";
  if (esError) statusDiv.classList.add("error");
  else if (esExito) statusDiv.classList.add("success");
}

function clearStatus() {
  statusDiv.textContent = "";
  statusDiv.className = "";
}

// Carga usuarios del JSON + los registrados en localStorage
async function cargarUsuarios() {
  try {
    const response = await fetch('BDD/usuarios.json');
    if (!response.ok) throw new Error('No se pudo cargar usuarios.json');
    const base = await response.json();

    // Mezclar con usuarios registrados localmente
    const locales = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const idsBase = new Set(base.map(u => u.mail.toLowerCase()));
    const nuevos = locales.filter(u => !idsBase.has(u.mail.toLowerCase()));

    usuarios = [...base, ...nuevos];
    console.log(`✅ ${usuarios.length} usuarios cargados`);
    return true;
  } catch (error) {
    console.error('Error cargando usuarios:', error);
    setStatus('Error al cargar la base de datos de usuarios.', true);
    return false;
  }
}

function validarCredenciales(email, password) {
  return usuarios.find(u =>
    u.mail.toLowerCase() === email.toLowerCase() && u.clave === password
  );
}

emailInput.addEventListener("keypress", (e) => { if (e.key === "Enter") btnLogin.click(); });
passInput.addEventListener("keypress", (e) => { if (e.key === "Enter") btnLogin.click(); });
emailInput.addEventListener("input", clearStatus);
passInput.addEventListener("input", clearStatus);

btnLogin.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passInput.value;

  if (!email || !password) {
    setStatus("Por favor, completá el email y la contraseña.", true);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setStatus("Por favor, ingresá un email válido.", true);
    return;
  }

  btnLogin.disabled = true;
  setStatus("Validando credenciales...");

  try {
    const usuario = validarCredenciales(email, password);

    if (!usuario) {
      setStatus("Email o contraseña incorrectos.", true);
      btnLogin.disabled = false;
      return;
    }

    setStatus("¡Acceso concedido! Redirigiendo...", false, true);
    sessionStorage.setItem("usuario", JSON.stringify({ id: usuario.id, mail: usuario.mail, perfil: usuario.perfil }));

    setTimeout(() => { window.location.href = "prueba.html"; }, 1000);

  } catch (err) {
    console.error("Error inesperado:", err);
    setStatus("Ocurrió un error inesperado. Intentá nuevamente.", true);
    btnLogin.disabled = false;
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  const cargado = await cargarUsuarios();
  if (!cargado) btnLogin.disabled = true;
});
