// Função para o carrossel de certificações
function initCertificationsCarousel() {
    const carousel = document.querySelector('.cert-carousel');
    const container = document.querySelector('.cert-carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.cert-carousel-prev');
    const nextBtn = document.querySelector('.cert-carousel-next');
    const dotsContainer = document.querySelector('.cert-dots');
    
    let currentIndex = 0;
    let itemWidth = 0;
    let itemsPerView = 1;
    
    // Criar dots de navegação
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < items.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('cert-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToIndex(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Atualizar dots
    function updateDots() {
        const dots = document.querySelectorAll('.cert-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Calcular itens visíveis com base no tamanho da tela
    function calculateItemsPerView() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) {
            return 3;
        } else if (screenWidth >= 640) {
            return 2;
        } else {
            return 1;
        }
    }
    
    // Atualizar o carrossel
    function updateCarousel() {
        itemsPerView = calculateItemsPerView();
        itemWidth = 100 / itemsPerView;
        
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.width = `${itemWidth}%`;
        });
        
        moveCarousel();
    }
    
    // Mover carrossel para a posição atual
    function moveCarousel() {
        const offset = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${offset}%)`;
        updateDots();
    }
    
    // Navegar para um índice específico
    function goToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, items.length - itemsPerView));
        moveCarousel();
    }
    
    // Navegar para o próximo
    function next() {
        if (currentIndex < items.length - itemsPerView) {
            currentIndex++;
            moveCarousel();
        }
    }
    
    // Navegar para o anterior
    function prev() {
        if (currentIndex > 0) {
            currentIndex--;
            moveCarousel();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    
    // Permitir navegação por clique nos cards
    document.querySelectorAll('.carousel-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.carousel-item') === this) {
                const rect = this.getBoundingClientRect();
                const clickPosition = e.clientX - rect.left;
                const halfWidth = rect.width / 2;
                
                if (clickPosition > halfWidth) {
                    next();
                } else {
                    prev();
                }
            }
        });
    });
    
    // Lidar com redimensionamento da tela
    window.addEventListener('resize', function() {
        updateCarousel();
    });
    
    // Inicializar
    createDots();
    updateCarousel();
    
    // Navegação por teclado para acessibilidade
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            next();
        } else if (e.key === 'ArrowLeft') {
            prev();
        }
    });
}

// Integração com o código JS existente
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
    
    // Improved progress bars animation
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach(bar => {
            const originalWidth = bar.getAttribute('style');
            if (!originalWidth) return;
            
            const widthValue = originalWidth.match(/width:\s*(\d+)%/);
            if (!widthValue) return;
            
            bar.style.width = '0';
            void bar.offsetWidth;
            
            bar.style.width = widthValue[1] + '%';
        });
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        progressObserver.observe(skillsSection);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            this.reset();
        });
    }
    
    // Responsive adjustments for viewport changes
    function handleResize() {
        if (window.innerWidth >= 768 && mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Inicializar o carrossel de certificações
    if (document.querySelector('.cert-carousel')) {
        initCertificationsCarousel();
    }
});