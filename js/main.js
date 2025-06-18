// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.querySelector('.back-to-top');
    const loader = document.querySelector('.loader');
    const scrollDown = document.querySelector('.scroll-down');
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    // Ocultar loader cuando la página esté completamente cargada
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            // Aplicar animaciones después de cargar
            animateOnScroll();
        }, 1500);
    });
    
    // Menú móvil
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinksList.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        // Navbar sticky
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mostrar/ocultar botón de volver arriba
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
        
        // Resaltar enlace activo en el menú
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Animaciones al hacer scroll
        animateOnScroll();
    });
    
    // Botón de volver arriba
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Desplazamiento suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de contadores
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // Velocidad de la animación
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Animaciones al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
        
        // Activar contadores cuando sean visibles
        const countersSection = document.getElementById('sobre');
        if (countersSection) {
            const counterPosition = countersSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (counterPosition < screenPosition) {
                animateCounters();
            }
        }
    }
    
    // Efecto de scroll suave para el botón de desplazamiento hacia abajo
    if (scrollDown) {
        scrollDown.addEventListener('click', function(e) {
            e.preventDefault();
            const nextSection = document.querySelector('section');
            if (nextSection) {
                window.scrollTo({
                    top: nextSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Efecto de cursor personalizado
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Añadir clase activa al hacer hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .btn, .member-card, .timeline-content');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // Efecto de partículas
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#8a2be2'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6a0dad',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Inicializar animaciones
    animateOnScroll();
});

// Función para el efecto de escritura
function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), 100);
    }
}

// Función para actualizar el contador regresivo
function updateCountdown() {
    // Fecha del próximo evento (25 de junio a las 20:00)
    const eventDate = new Date('2025-06-25T20:00:00');
    const now = new Date();
    
    // Calcular la diferencia en milisegundos
    let diff = eventDate - now;
    
    // Si el evento ya pasó, mostrar 0
    if (diff < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    // Calcular días, horas, minutos y segundos
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    
    const seconds = Math.floor(diff / 1000);
    
    // Actualizar los elementos del DOM
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Inicializar efecto de escritura en elementos con la clase 'typewriter' y el contador regresivo
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de escritura
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        const text = element.getAttribute('data-text');
        if (text) {
            element.textContent = ''; // Limpiar el contenido
            typeWriter(element, text);
        }
    });
    
    // Inicializar y actualizar el contador cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Resto del código...
