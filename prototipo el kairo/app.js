// Datos iniciales de demostración (sin datos personales reales - RNF-06)
const MATERIALES_INICIALES = [
    {
        id: 1,
        titulo: "Guía de Fracciones y Números Racionales",
        categoria: "Matemáticas",
        grado: "Secundaria (6° - 9°)",
        tipo: "Guía PDF",
        descripcion: "Explicación paso a paso de operaciones con fracciones, equivalencias y ejercicios resueltos para refuerzo en aula.",
        ubicacion: "https://www.mineducacion.gov.co/",
        fecha_publicacion: "2026-11-10",
        estado: "activo"
    },
    {
        id: 2,
        titulo: "Taller de Comprensión Lectora: Textos Argumentativos",
        categoria: "Lengua Castellana",
        grado: "Media (10° - 11°)",
        tipo: "Taller práctico",
        descripcion: "Lecturas seleccionadas con preguntas de análisis crítico, estructura de tesis y argumentos.",
        ubicacion: "https://www.mineducacion.gov.co/",
        fecha_publicacion: "2026-11-12",
        estado: "activo"
    },
    {
        id: 3,
        titulo: "La Célula y sus Organelos: Estructura y Función",
        categoria: "Ciencias Naturales",
        grado: "Primaria (1° - 5°)",
        tipo: "Presentación",
        descripcion: "Material visual introductorio sobre células eucariotas y procariotas con actividades de identificación.",
        ubicacion: "https://www.mineducacion.gov.co/",
        fecha_publicacion: "2026-11-14",
        estado: "activo"
    },
    {
        id: 4,
        titulo: "Regiones Naturales de Colombia",
        categoria: "Ciencias Sociales",
        grado: "Primaria (1° - 5°)",
        tipo: "Lectura",
        descripcion: "Ficha descriptiva de las seis regiones naturales de Colombia, relieve, clima y diversidad cultural.",
        ubicacion: "https://www.mineducacion.gov.co/",
        fecha_publicacion: "2026-11-15",
        estado: "activo"
    },
    {
        id: 5,
        titulo: "Basic English Grammar: Present Simple & Daily Routines",
        categoria: "Inglés",
        grado: "Secundaria (6° - 9°)",
        tipo: "Guía PDF",
        descripcion: "Vocabulario cotidiano, reglas de tercera persona y ejercicios prácticos de escritura básica.",
        ubicacion: "https://www.mineducacion.gov.co/",
        fecha_publicacion: "2026-11-16",
        estado: "activo"
    },
    {
        id: 6,
        titulo: "Introducción al Pensamiento Computacional y Algoritmos",
        categoria: "Tecnología e Informática",
        grado: "Media (10° - 11°)",
        tipo: "Enlace educativo",
        descripcion: "Conceptos fundamentales de lógica de programación, diagramas de flujo y resolución de problemas.",
        ubicacion: "https://www.mineducacion.gov.co/",
        fecha_publicacion: "2026-11-18",
        estado: "activo"
    },
    {
        id: 7,
        titulo: "Guía Desactualizada de Álgebra (Versión Anterior)",
        categoria: "Matemáticas",
        grado: "Secundaria (6° - 9°)",
        tipo: "Guía PDF",
        descripcion: "Material retirado del catálogo público para validar el requerimiento RF-06 de control de vigencia.",
        ubicacion: "https://www.mineducacion.gov.co/",
        fecha_publicacion: "2026-09-01",
        estado: "inactivo"
    }
];

const STORAGE_KEY = "elkairo_materiales_v1";
const AUTH_KEY = "elkairo_admin_auth";

let materiales = cargarMateriales();

function cargarMateriales() {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) {
        return JSON.parse(guardado);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MATERIALES_INICIALES));
    return [...MATERIALES_INICIALES];
}

function guardarEnStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(materiales));
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    poblarSelectCategorias();
    filtrarMateriales();
    actualizarEstadoAuth();
});

function poblarSelectCategorias() {
    const select = document.getElementById("select-categoria");
    const categorias = ["Matemáticas", "Lengua Castellana", "Ciencias Naturales", "Ciencias Sociales", "Inglés", "Tecnología e Informática"];
    categorias.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
}

// Navegación entre vistas (RF-07)
function mostrarVista(vista) {
    document.getElementById("vista-catalogo").classList.add("hidden");
    document.getElementById("vista-ficha").classList.add("hidden");
    document.getElementById("vista-admin").classList.add("hidden");

    document.getElementById("btn-nav-catalogo").classList.remove("active");
    document.getElementById("btn-nav-admin").classList.remove("active");

    if (vista === "catalogo") {
        document.getElementById("vista-catalogo").classList.remove("hidden");
        document.getElementById("btn-nav-catalogo").classList.add("active");
        filtrarMateriales();
    } else if (vista === "ficha") {
        document.getElementById("vista-ficha").classList.remove("hidden");
        document.getElementById("btn-nav-catalogo").classList.add("active");
    } else if (vista === "admin") {
        document.getElementById("vista-admin").classList.remove("hidden");
        document.getElementById("btn-nav-admin").classList.add("active");
        actualizarEstadoAuth();
    }
}

// Búsqueda y filtrado del catálogo (RF-01, RF-02, RF-03, RF-06, RF-08)
function filtrarMateriales() {
    const texto = document.getElementById("input-busqueda").value.trim().toLowerCase();
    const categoria = document.getElementById("select-categoria").value;
    const grado = document.getElementById("select-grado").value;

    const filtrados = materiales.filter(m => {
        if (m.estado !== "activo") return false;
        const coincideTexto = texto === "" ||
            m.titulo.toLowerCase().includes(texto) ||
            m.descripcion.toLowerCase().includes(texto);
        const coincideCat = categoria === "Todas" || m.categoria === categoria;
        const coincideGrado = grado === "Todos" || m.grado === grado;
        return coincideTexto && coincideCat && coincideGrado;
    });

    renderizarCatalogo(filtrados);
}

function renderizarCatalogo(lista) {
    const grid = document.getElementById("grid-materiales");
    const vacio = document.getElementById("mensaje-vacio");
    const contador = document.getElementById("contador-resultados");

    grid.innerHTML = "";
    contador.textContent = `Mostrando ${lista.length} recurso(s) activo(s)`;

    if (lista.length === 0) {
        vacio.classList.remove("hidden");
        return;
    }

    vacio.classList.add("hidden");

    lista.forEach(m => {
        const card = document.createElement("article");
        card.className = "card";
        card.setAttribute("role", "listitem");
        card.innerHTML = `
            <div>
                <div class="card-badges">
                    <span class="badge badge-area">${m.categoria}</span>
                    <span class="badge badge-grade">${m.grado}</span>
                    <span class="badge badge-type">${m.tipo}</span>
                </div>
                <h3>${m.titulo}</h3>
                <p>${m.descripcion}</p>
            </div>
            <div class="card-footer">
                <span>Fecha: ${m.fecha_publicacion}</span>
                <button class="btn-primary btn-sm" onclick="verFicha(${m.id})">Ver ficha</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function limpiarFiltros() {
    document.getElementById("input-busqueda").value = "";
    document.getElementById("select-categoria").value = "Todas";
    document.getElementById("select-grado").value = "Todos";
    filtrarMateriales();
}

// Ficha del material (RF-04)
function verFicha(id) {
    const mat = materiales.find(m => m.id === id && m.estado === "activo");
    if (!mat) return;

    document.getElementById("ficha-categoria").textContent = mat.categoria;
    document.getElementById("ficha-grado").textContent = mat.grado;
    document.getElementById("ficha-tipo").textContent = mat.tipo;
    document.getElementById("ficha-titulo").textContent = mat.titulo;
    document.getElementById("ficha-fecha").textContent = mat.fecha_publicacion;
    document.getElementById("ficha-descripcion").textContent = mat.descripcion;
    document.getElementById("ficha-enlace").href = mat.ubicacion;

    mostrarVista("ficha");
}

// Control de acceso administrativo (RNF-02)
function iniciarSesion(e) {
    e.preventDefault();
    const user = document.getElementById("login-user").value.trim();
    const pass = document.getElementById("login-pass").value.trim();
    const errorMsg = document.getElementById("login-error");

    if (user === "docente" && pass === "elkairo2026") {
        sessionStorage.setItem(AUTH_KEY, "true");
        errorMsg.classList.add("hidden");
        document.getElementById("form-login").reset();
        actualizarEstadoAuth();
    } else {
        errorMsg.classList.remove("hidden");
    }
}

function cerrarSesion() {
    sessionStorage.removeItem(AUTH_KEY);
    actualizarEstadoAuth();
}

function actualizarEstadoAuth() {
    const autenticado = sessionStorage.getItem(AUTH_KEY) === "true";
    const panelLogin = document.getElementById("panel-login");
    const panelGestion = document.getElementById("panel-gestion");

    if (autenticado) {
        panelLogin.classList.add("hidden");
        panelGestion.classList.remove("hidden");
        renderizarTablaAdmin();
    } else {
        panelLogin.classList.remove("hidden");
        panelGestion.classList.add("hidden");
    }
}

// Gestión CRUD de materiales (RF-05, RF-06)
function guardarMaterial(e) {
    e.preventDefault();
    limpiarErroresFormulario();

    const idVal = document.getElementById("mat-id").value;
    const titulo = document.getElementById("mat-titulo").value.trim();
    const categoria = document.getElementById("mat-categoria").value;
    const grado = document.getElementById("mat-grado").value;
    const tipo = document.getElementById("mat-tipo").value;
    const estado = document.getElementById("mat-estado").value;
    const ubicacion = document.getElementById("mat-ubicacion").value.trim();
    const descripcion = document.getElementById("mat-descripcion").value.trim();

    let valido = true;
    if (!titulo) {
        document.getElementById("err-titulo").textContent = "El título es obligatorio.";
        valido = false;
    }
    if (!categoria) {
        document.getElementById("err-categoria").textContent = "Selecciona un área o categoría.";
        valido = false;
    }
    if (!grado) {
        document.getElementById("err-grado").textContent = "Selecciona un grado o nivel.";
        valido = false;
    }
    if (!tipo) {
        document.getElementById("err-tipo").textContent = "Selecciona el tipo de recurso.";
        valido = false;
    }
    if (!ubicacion) {
        document.getElementById("err-ubicacion").textContent = "Ingresa una URL o ruta válida del recurso.";
        valido = false;
    }
    if (!descripcion) {
        document.getElementById("err-descripcion").textContent = "Ingresa una descripción breve.";
        valido = false;
    }

    if (!valido) return;

    const hoy = new Date().toISOString().split("T")[0];

    if (idVal) {
        const idx = materiales.findIndex(m => m.id === Number(idVal));
        if (idx !== -1) {
            materiales[idx] = {
                ...materiales[idx],
                titulo,
                categoria,
                grado,
                tipo,
                estado,
                ubicacion,
                descripcion,
                fecha_publicacion: hoy
            };
        }
        mostrarFeedback("Material actualizado correctamente.");
    } else {
        const nuevoId = materiales.length > 0 ? Math.max(...materiales.map(m => m.id)) + 1 : 1;
        materiales.unshift({
            id: nuevoId,
            titulo,
            categoria,
            grado,
            tipo,
            estado,
            ubicacion,
            descripcion,
            fecha_publicacion: hoy
        });
        mostrarFeedback("Nuevo material registrado correctamente.");
    }

    guardarEnStorage();
    resetFormulario(false);
    renderizarTablaAdmin();
}

function editarMaterial(id) {
    const mat = materiales.find(m => m.id === id);
    if (!mat) return;

    document.getElementById("form-titulo").textContent = "Editar material existente";
    document.getElementById("mat-id").value = mat.id;
    document.getElementById("mat-titulo").value = mat.titulo;
    document.getElementById("mat-categoria").value = mat.categoria;
    document.getElementById("mat-grado").value = mat.grado;
    document.getElementById("mat-tipo").value = mat.tipo;
    document.getElementById("mat-estado").value = mat.estado;
    document.getElementById("mat-ubicacion").value = mat.ubicacion;
    document.getElementById("mat-descripcion").value = mat.descripcion;
    limpiarErroresFormulario();
}

function alternarEstado(id) {
    const mat = materiales.find(m => m.id === id);
    if (!mat) return;
    mat.estado = mat.estado === "activo" ? "inactivo" : "activo";
    guardarEnStorage();
    renderizarTablaAdmin();
}

function renderizarTablaAdmin() {
    const tbody = document.getElementById("tabla-admin-body");
    tbody.innerHTML = "";

    materiales.forEach(m => {
        const tr = document.createElement("tr");
        const claseEstado = m.estado === "activo" ? "status-active" : "status-inactive";
        const textoEstado = m.estado === "activo" ? "Activo" : "Inactivo";
        const textoBoton = m.estado === "activo" ? "Desactivar" : "Activar";

        tr.innerHTML = `
            <td><strong>${m.titulo}</strong><br><small>${m.grado} · ${m.tipo}</small></td>
            <td>${m.categoria}</td>
            <td><span class="${claseEstado}">${textoEstado}</span></td>
            <td>
                <button class="btn-secondary btn-sm" onclick="editarMaterial(${m.id})">Editar</button>
                <button class="btn-secondary btn-sm" onclick="alternarEstado(${m.id})">${textoBoton}</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function resetFormulario(ocultarFeedback = true) {
    document.getElementById("form-titulo").textContent = "Registrar nuevo material";
    document.getElementById("mat-id").value = "";
    document.getElementById("form-material").reset();
    limpiarErroresFormulario();
    if (ocultarFeedback) {
        document.getElementById("form-feedback").classList.add("hidden");
    }
}

function limpiarErroresFormulario() {
    ["err-titulo", "err-categoria", "err-grado", "err-tipo", "err-ubicacion", "err-descripcion"].forEach(id => {
        document.getElementById(id).textContent = "";
    });
}

function mostrarFeedback(msg) {
    const fb = document.getElementById("form-feedback");
    fb.textContent = msg;
    fb.classList.remove("hidden");
}
