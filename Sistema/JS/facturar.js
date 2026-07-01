// facturar.js
// BDD: al buscar, hacer fetch a la API con los filtros seleccionados

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar fechas: primer y último día del mes actual
  var hoy   = new Date();
  var desde = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  var hasta = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

  function toInputDate(d) {
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  document.getElementById('facDesde').value = toInputDate(desde);
  document.getElementById('facHasta').value = toInputDate(hasta);

  // Plan se habilita solo cuando hay cobertura seleccionada
  // BDD: al cambiar cobertura, cargar sus planes desde la API
  var selCobertura = document.getElementById('facCobertura');
  var selPlan      = document.getElementById('facPlan');

  selCobertura.addEventListener('change', function() {
    var tiene = this.value !== '';
    selPlan.disabled = !tiene;
    selPlan.innerHTML = '<option value="">[ n/d ]</option>';
    if (!tiene) return;
    // BDD: fetch planes de la cobertura seleccionada
    // Placeholder hardcodeado hasta integración
    var planesMock = { 'OSDE': ['210','310','410','510'], 'GALENO': ['PLUS','BASIC'] };
    var planes = planesMock[this.value] || [];
    planes.forEach(function(p) {
      var opt = document.createElement('option');
      opt.value = p; opt.textContent = p;
      selPlan.appendChild(opt);
    });
  });

  document.getElementById('facBuscar').addEventListener('click', function() {
    // BDD: reemplazar con fetch real usando los filtros seleccionados
    document.getElementById('facResultados').style.display = 'block';
  });
});
