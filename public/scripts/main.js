// main.js  

async function loadSection(sectionId) {
    if (sectionId === 'home') return;

    try {
        // CSS 로드  
        if (sectionId === 'blog') {
            await new Promise((resolve) => {
                const blogStyle = document.createElement('link');
                blogStyle.rel = 'stylesheet';
                blogStyle.href = '/styles/blog.css';
                blogStyle.onload = resolve;
                document.head.appendChild(blogStyle);
            });
        }

        // 섹션 콘텐츠 로드  
        const response = await fetch(`/${sectionId}`); // 경로 수정  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.innerHTML = content;

            // Font Awesome 로드  
            if (!document.querySelector('link[href*="font-awesome"]')) {
                await new Promise((resolve) => {
                    const fontAwesome = document.createElement('link');
                    fontAwesome.rel = 'stylesheet';
                    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
                    fontAwesome.onload = resolve;
                    document.head.appendChild(fontAwesome);
                });
            }

            // 섹션별 특수 처리  
            switch (sectionId) {
                case 'profile':
                    loadProfileResources();
                    break;
                case 'stack':
                    checkStackImages();
                    break;
                case 'project':
                    loadProjectResources();
                    break;
                case 'blog':
                    initializeBlogAnimations();
                    break;
                case 'contact':
                    initializeContactAnimations();
                    break;
            }

            // 섹션 로드 후 애니메이션 초기화  
            initializeSectionAnimations(sectionId);
        }
    } catch (error) {
        console.error(`Error loading ${sectionId} section:`, error);
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.innerHTML = `<div class="error-message">Failed to load ${sectionId} section. Please try again later.</div>`;
        }
    }
}

function initializeSectionAnimations(sectionId) {
    // animations.js의 해당 섹션 애니메이션 초기화  
    switch (sectionId) {
        case 'blog':
            if (typeof animateBlogCards === 'function') {
                animateBlogCards();
            }
            break;
        case 'stack':
            if (typeof animateStackItems === 'function') {
                animateStackItems();
            }
            break;
        case 'project':
            if (typeof animateProjectCards === 'function') {
                animateProjectCards();
            }
            break;
    }
}

function checkStackImages() {
    const images = document.querySelectorAll('.stack-img');
    images.forEach(img => {
        img.onerror = function () {
            console.error(`Failed to load image: ${img.src}`);
            // img.src = '/images/placeholder.png';  
        };
    });
}

function loadProfileResources() {
    // CSS 로드 체크 및 추가  
    if (!document.querySelector('link[href="/styles/profileStyle.css"]')) {
        const profileStyle = document.createElement('link');
        profileStyle.rel = 'stylesheet';
        profileStyle.href = '/styles/profileStyle.css';
        document.head.appendChild(profileStyle);
    }

    // Font Awesome 로드 체크 및 추가  
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }
}

function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

async function initialize() {
    try {
        // 모든 섹션 병렬로 로드  
        await Promise.all([
            loadSection('profile'),
            loadSection('blog'),
            loadSection('stack'),
            loadSection('project'),
            loadSection('contact')
        ]);

        // More 버튼 이벤트 설정  
        const moreBtn = document.getElementById('moreBtn');
        if (moreBtn) {
            moreBtn.addEventListener('click', function (e) {
                e.preventDefault();
                document.getElementById('profile').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // 프로그레스 바 초기화  
        updateProgressBar();

        // 스크롤 이벤트 리스너 추가  
        window.addEventListener('scroll', () => {
            updateProgressBar();
            // 모든 섹션의 애니메이션 체크  
            if (typeof checkAllSectionAnimations === 'function') {
                checkAllSectionAnimations();
            }
        });

    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// DOM 로드 시 초기화  
document.addEventListener('DOMContentLoaded', initialize);

// Blog 애니메이션 초기화 함수  
function initializeBlogAnimations() {
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.5s ease';
    });
}

function loadBlogResources() {
    // CSS 로드 체크 및 추가  
    if (!document.querySelector('link[href="/styles/blog.css"]')) {
        const blogStyle = document.createElement('link');
        blogStyle.rel = 'stylesheet';
        blogStyle.href = '/styles/blog.css';
        document.head.appendChild(blogStyle);
    }
}

// Contact 애니메이션 초기화 함수  
function initializeContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Project 리소스 로드 함수  
function loadProjectResources() {
    if (!document.querySelector('link[href="/styles/project.css"]')) {
        const projectStyle = document.createElement('link');
        projectStyle.rel = 'stylesheet';
        projectStyle.href = '/styles/project.css';
        document.head.appendChild(projectStyle);
    }

    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(img => {
        img.onerror = function () {
            console.error(`Failed to load project image: ${img.src}`);
            img.src = '/images/placeholder.png';
        };
    });
}

// 모든 섹션 애니메이션 체크 함수  
function checkAllSectionAnimations() {
    const sections = ['blog', 'stack', 'project'];
    sections.forEach(sectionId => {
        initializeSectionAnimations(sectionId);
    });
}

// 에러 처리를 위한 전역 이벤트 리스너  
window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled promise rejection:', event.reason);
});