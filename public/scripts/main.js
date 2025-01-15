// main.js  

async function loadSection(sectionId) {  
    try {  
        const response = await fetch(`/sections/${sectionId}`);  
        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  
        const content = await response.text();  
        const sectionElement = document.getElementById(sectionId);  
        if (sectionElement) {  
            sectionElement.innerHTML = content;  

            // 섹션별 특수 처리  
            if (sectionId === 'profile') {  
                loadProfileResources();  
            } else if (sectionId === 'stack') {  
                // 스택 섹션의 이미지 로드 확인  
                checkStackImages();  
            }  
        }  
    } catch (error) {  
        console.error(`Error loading ${sectionId} section:`, error);  
        const sectionElement = document.getElementById(sectionId);  
        if (sectionElement) {  
            sectionElement.innerHTML = `<div class="error-message">Failed to load ${sectionId} section. Please try again later.</div>`;  
        }  
    }  
}  

function checkStackImages() {  
    const images = document.querySelectorAll('.stack-img');  
    images.forEach(img => {  
        img.onerror = function() {  
            console.error(`Failed to load image: ${img.src}`);  
            // 이미지 로드 실패시 대체 이미지나 텍스트로 교체 가능  
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
            loadSection('contact')  
        ]);  

        // More 버튼 이벤트 설정  
        const moreBtn = document.getElementById('moreBtn');  
        if (moreBtn) {  
            moreBtn.addEventListener('click', function(e) {  
                e.preventDefault();  
                document.getElementById('profile').scrollIntoView({ behavior: 'smooth' });  
            });  
        }  

        // 프로그레스 바 초기화  
        updateProgressBar();  

        // 스크롤 이벤트 리스너 추가  
        window.addEventListener('scroll', updateProgressBar);  

    } catch (error) {  
        console.error('Initialization error:', error);  
    }  
}  

// DOM 로드 시 초기화  
document.addEventListener('DOMContentLoaded', initialize);  

// 에러 처리를 위한 전역 이벤트 리스너  
window.addEventListener('unhandledrejection', function(event) {  
    console.error('Unhandled promise rejection:', event.reason);  
});