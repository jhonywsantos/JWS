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
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Calcular itens visíveis com base no tamanho da tela
    function calculateItemsPerView() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) {
            return 3;
        } else if (screenWidth >= 768) {
            return 2;
        } else {
            return 1;
        }
    }
    
    // Atualizar o carrossel
    function updateCarousel() {
        itemsPerView = calculateItemsPerView();
        itemWidth = 100 / itemsPerView;
        
        items.forEach(item => {
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
        } else {
            // Voltar para o início se estiver no final
            currentIndex = 0;
            moveCarousel();
        }
    }
    
    // Navegar para o anterior
    function prev() {
        if (currentIndex > 0) {
            currentIndex--;
            moveCarousel();
        } else {
            // Ir para o final se estiver no início
            currentIndex = Math.max(0, items.length - itemsPerView);
            moveCarousel();
        }
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
    
    // Permitir navegação por teclado para acessibilidade
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            next();
        } else if (e.key === 'ArrowLeft') {
            prev();
        }
    });
    
    // Lidar com redimensionamento da tela
    window.addEventListener('resize', function() {
        updateCarousel();
    });
    
    // Inicializar
    createDots();
    updateCarousel();
    
    // Auto-rotate carousel (opcional)
    let autoRotateInterval = setInterval(next, 5000);
    
    // Pausar auto-rotação quando o mouse estiver sobre o carrossel
    container.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    container.addEventListener('mouseleave', () => {
        autoRotateInterval = setInterval(next, 5000);
    });
}