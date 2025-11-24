

document.addEventListener("DOMContentLoaded", () => {
    
 
    const btnArriba = document.getElementById("btnArriba");
    const header = document.querySelector("header");
    const btnCambiarColor = document.getElementById("btnCambiarColor");
    const darkModeToggle = document.getElementById("darkModeToggle");
    
    
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            darkModeToggle.textContent = isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
        });

        
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️ Modo Claro';
        } else {
            darkModeToggle.textContent = '🌙 Modo Oscuro';
        }
    }
    
   
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

    
    window.addEventListener("scroll", () => {
       
        if (btnArriba) {
            btnArriba.style.display = window.scrollY > 300 ? "block" : "none";
        }

       
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }
    });

    if (btnArriba) {
        btnArriba.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    
  
    const titleElement = document.getElementById("titulo1");
    let textToType = "🍰 Pastelería Mate Tomate 🍅";

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
    
    
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1500; 
        const start = 0;
        let startTime;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const currentValue = Math.floor(percentage * (target - start) + start);
            
            el.textContent = currentValue;

            if (percentage < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = target; 
            }
        }
        window.requestAnimationFrame(step);
    }


    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
             
                if (entry.target.classList.contains('stat-item')) {
                    const h3 = entry.target.querySelector('h3');
                    if (h3 && !h3.dataset.animated) {
                        animateCounter(h3);
                        h3.dataset.animated = true; 
                    }
                }
                
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 

    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });
    document.querySelectorAll('.stat-item').forEach(el => {
        observer.observe(el);
    });

    
    const listaPostres = document.getElementById('listaPostres');
    const detalleSabor = document.getElementById('detalleSabor');
    const filtroBtns = document.querySelectorAll('.filtro-postres .btn-filtro');

    if (listaPostres && detalleSabor) {
        
        listaPostres.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (li) {
              
                document.querySelectorAll('.postre-list li').forEach(item => item.classList.remove('resaltado-temporal'));
                
                const sabor = li.getAttribute('data-sabor');
                const detalle = li.getAttribute('data-detalle');
                
                detalleSabor.innerHTML = `<h3>${sabor}</h3><p>${detalle}</p>`;
                li.classList.add('resaltado-temporal');

             
                setTimeout(() => li.classList.remove('resaltado-temporal'), 500);
            }
        });

        filtroBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filtro = this.getAttribute('data-filtro');
                
           
                filtroBtns.forEach(b => b.classList.remove('activo'));
                this.classList.add('activo');
                
               
                listaPostres.querySelectorAll('li').forEach(item => {
                    const categoria = item.getAttribute('data-categoria');
                    
                    if (filtro === 'todo' || categoria === filtro) {
                        item.classList.remove('oculto');
                    } else {
                        item.classList.add('oculto');
                    }
                });
            });
        });
    }


    
    const carousel = document.querySelector('.testimonial-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    if (carousel && cards.length > 0) {
        
        function showSlide(index) {
            cards.forEach((card, i) => {
                if (i === index) {
                    card.style.opacity = '1';
                    card.style.position = 'relative';
                } else {
                    card.style.opacity = '0';
                    card.style.position = 'absolute';
                }
            });
            currentSlide = index;
        }

     
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + cards.length) % cards.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % cards.length;
            showSlide(currentSlide);
        });

       
        showSlide(0);

        
        setInterval(() => {
            currentSlide = (currentSlide + 1) % cards.length;
            showSlide(currentSlide);
        }, 6000); 
    }


   

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            faqItem.classList.toggle('active');
            const answer = faqItem.querySelector('.faq-answer');

            if (faqItem.classList.contains('active')) {
         
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

   
    const form = document.getElementById('contactForm');
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            const errorNombre = document.getElementById('error-nombre');
            const errorEmail = document.getElementById('error-email');
            const errorMensaje = document.getElementById('error-mensaje');
            const successMessage = document.getElementById('successMessage');

           
            errorNombre.textContent = '';
            errorEmail.textContent = '';
            errorMensaje.textContent = '';
            successMessage.style.display = 'none';

            
            if (nombre.length < 3) {
                errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
                isValid = false;
            }

            if (!validateEmail(email)) {
                errorEmail.textContent = 'Por favor, introduce un correo electrónico válido.';
                isValid = false;
            }

            
            if (mensaje.length < 10) {
                errorMensaje.textContent = 'El mensaje debe tener al menos 10 caracteres.';
                isValid = false;
            }

           
            if (isValid) {
                form.reset();
                successMessage.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito y te contactaremos pronto.';
                successMessage.style.display = 'block';
             
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

   
});