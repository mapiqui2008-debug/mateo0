// =================================================================================
// Archivo: script2.js
// Descripción: Contiene las funcionalidades de JavaScript exclusivas
// para la página de Postres Destacados (postresdestacados.html).
// =================================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Elementos principales del DOM ---
    const btnSaludo = document.getElementById("btnSaludo");
    const btnResaltar = document.getElementById("btnResaltar");
    const btnArriba = document.getElementById("btnArriba");
    const btnCambiarColor = document.getElementById("btnCambiarColor");
    const header = document.querySelector("header");
    const darkModeToggle = document.getElementById("darkModeToggle");
    
    // --- 1. Funcionalidad de Botones de Interacción ---
    
    // Botón de Saludo
    if (btnSaludo) {
        btnSaludo.addEventListener("click", () => {
            alert("¡Bienvenido a la sección de Postres Destacados! Descubre los sabores que inspiran al mundo. 🌍");
        });
    }

    // Botón para Resaltar Postre al Azar
    if (btnResaltar) {
        btnResaltar.addEventListener("click", () => {
            const lista = document.querySelectorAll(".destacados-grid .postre-card");
            
            if (lista.length > 0) {
                // Limpiar resaltado anterior
                document.querySelectorAll(".resaltado").forEach(item => item.classList.remove("resaltado"));
                
                const random = Math.floor(Math.random() * lista.length);
                const postreElegido = lista[random];
                
                postreElegido.classList.add("resaltado");
                
                // Quitar resaltado después de 2 segundos
                setTimeout(() => postreElegido.classList.remove("resaltado"), 2000); 
            }
        });
    }
    
    // Cambiar el Color del Encabezado
    if (btnCambiarColor && header) {
        const colores = [
            'linear-gradient(135deg, #e63946 0%, #d62828 100%)', // Rojo original
            'linear-gradient(135deg, #ffc300, #ff8c00)', // Naranja/Amarillo
            'linear-gradient(135deg, #4cc9f0, #4361ee)', // Azul
            'linear-gradient(135deg, #38b000, #70e000)'  // Verde
        ];
        
        let indiceActual = 0;

        btnCambiarColor.addEventListener("click", () => {
            indiceActual = (indiceActual + 1) % colores.length;
            header.style.background = colores[indiceActual];
        });
    }


    // Botón de Volver Arriba (Lógica de scroll)
    if (btnArriba) {
        btnArriba.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        
        window.addEventListener("scroll", () => {
            btnArriba.style.display = window.scrollY > 200 ? "block" : "none";
        });
        btnArriba.style.display = "none";
    }
    
    // --- 2. Funcionalidad de Filtro por Origen ---
    const filtroButtons = document.querySelectorAll('.btn-filtro');
    
    filtroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filtroOrigen = this.getAttribute('data-filtro');
            const cardsToFilter = document.querySelectorAll('.destacados-grid .postre-card'); 
            
            // 1. Limpiar clase 'activo' y activar el botón actual
            filtroButtons.forEach(btn => btn.classList.remove('activo'));
            this.classList.add('activo');

            // 2. Iterar sobre las tarjetas de postres
            cardsToFilter.forEach(card => {
                const origen = card.getAttribute('data-origen');
                
                if (filtroOrigen === 'todos' || origen === filtroOrigen) {
                    card.style.display = 'block'; 
                    setTimeout(() => {
                        card.classList.remove('oculto');
                    }, 10); 
                } else {
                    // Usamos la clase oculto para la transición de CSS
                    card.classList.add('oculto');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500); // 500ms debe coincidir con la transición de CSS
                }
            });
        });
    });

    // --- 3. Toggle de Modo Oscuro ---
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            darkModeToggle.textContent = isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
        });

        // Cargar modo oscuro al inicio
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️ Modo Claro';
        } else {
            darkModeToggle.textContent = '🌙 Modo Oscuro';
        }
    }
    
    // --- 4. Efecto de Escritura (Máquina de Escribir) en el Título Principal ---
    const titleElement = document.getElementById("titulo1");
    let textToType = "🌟 Postres Destacados del Mundo 🌍";

    let i = 0;
    if (titleElement) {
        titleElement.innerHTML = '';
        function typeWriter() {
            if (i < textToType.length) {
                titleElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 70);
            }
        }
        typeWriter(); 
    }
});