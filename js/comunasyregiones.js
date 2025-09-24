// comunasyregiones.js

// Lista de regiones con sus comunas
const regiones = [
  { nombre: "Arica y Parinacota", comunas: ["Arica", "Putre", "Camarones", "General Lagos", "Codpa"] },
  { nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pica", "Pozo Almonte", "Huara"] },
  { nombre: "Antofagasta", comunas: ["Antofagasta", "Mejillones", "Taltal", "Calama", "Tocopilla"] },
  { nombre: "Atacama", comunas: ["Copiapó", "Caldera", "Tierra Amarilla", "Vallenar", "Huasco"] },
  { nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle", "Andacollo", "Illapel"] },
  { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quillota", "San Antonio", "Los Andes"] },
  { nombre: "Metropolitana de Santiago", comunas: ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"] },
  { nombre: "Libertador Bernardo O’Higgins", comunas: ["Rancagua", "San Fernando", "Santa Cruz", "Machalí", "Pichilemu"] },
  { nombre: "Maule", comunas: ["Talca", "Curicó", "Linares", "Constitución", "Maule"] },
  { nombre: "Ñuble", comunas: ["Chillán", "Chillán Viejo", "Quirihue", "San Carlos", "Bulnes"] },
  { nombre: "Biobío", comunas: ["Concepción", "Los Ángeles", "Coronel", "Talcahuano", "Chiguayante"] },
  { nombre: "La Araucanía", comunas: ["Temuco", "Villarrica", "Pucón", "Angol", "Lautaro"] },
  { nombre: "Los Ríos", comunas: ["Valdivia", "La Unión", "Lanco", "Mariquina", "Panguipulli"] },
  { nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"] },
  { nombre: "Aysén", comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cisnes", "Tortel"] },
  { nombre: "Magallanes", comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Puerto Williams", "Río Verde"] }
];

/**
 * Función para cargar dinámicamente regiones y comunas en selects
 * @param {string} regionSelectId - id del select de regiones
 * @param {string} comunaSelectId - id del select de comunas
 */
function cargarRegiones(regionSelectId, comunaSelectId) {
  const regionSelect = document.getElementById(regionSelectId);
  const comunaSelect = document.getElementById(comunaSelectId);

  if (!regionSelect || !comunaSelect) return;

  // Limpiar selects
  regionSelect.innerHTML = '<option value="">Seleccione Región</option>';
  comunaSelect.innerHTML = '<option value="">Seleccione Comuna</option>';

  // Llenar select de regiones
  regiones.forEach(r => {
    const option = document.createElement("option");
    option.value = r.nombre;
    option.textContent = r.nombre;
    regionSelect.appendChild(option);
  });

  // Evento al cambiar región -> llenar comunas
  regionSelect.addEventListener("change", () => {
    const seleccion = regionSelect.value;
    comunaSelect.innerHTML = '<option value="">Seleccione Comuna</option>';

    const regionSeleccionada = regiones.find(r => r.nombre === seleccion);
    if (regionSeleccionada) {
      regionSeleccionada.comunas.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        comunaSelect.appendChild(option);
      });
    }
  });
}
