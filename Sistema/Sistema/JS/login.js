console.log("login.js cargado");

const supabase = window.supabaseClient;

const emailInput = document.getElementById("email");
const passInput  = document.getElementById("password");
const btnLogin   = document.getElementById("btnLogin");
const statusEl   = document.getElementById("status");

function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.style.color = isError ? "red" : "green";
}

btnLogin.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passInput.value;

  if (!email || !password) {
    setStatus("Completá email y contraseña.", true);
    return;
  }

  setStatus("Validando...");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    setStatus("Usuario o contraseña incorrectos.", true);
    return; // 🚫 NO REDIRIGE
  }

  setStatus("Acceso concedido ✅");

  // ✅ SOLO ACÁ REDIRIGE
  window.location.href = "prueba.html";
});
