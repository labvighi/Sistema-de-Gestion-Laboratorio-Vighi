// historial-utils.js
// Gestión del historial de navegación en localStorage.
// BDD: cuando exista backend, reemplazar con llamadas a API.

var HISTORIAL_MAX = 10;

function historialAgregar(clave, item) {
  try {
    var lista = JSON.parse(localStorage.getItem('historial_' + clave) || '[]');
    // Deduplicar por número (protocolos) o nombre (médicos/pacientes)
    var id = item.numero || item.nombre;
    lista = lista.filter(function(e) {
      return (e.numero || e.nombre) !== id;
    });
    lista.unshift(item);
    if (lista.length > HISTORIAL_MAX) lista = lista.slice(0, HISTORIAL_MAX);
    localStorage.setItem('historial_' + clave, JSON.stringify(lista));
  } catch(e) {}
}

function historialObtener(clave) {
  try {
    return JSON.parse(localStorage.getItem('historial_' + clave) || '[]');
  } catch(e) { return []; }
}
