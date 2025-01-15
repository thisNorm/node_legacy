document.addEventListener('DOMContentLoaded', function() {  
    // 블로그 카드 애니메이션 효과  
    const blogCards = document.querySelectorAll('.blog-card');  
    
    // 스크롤 애니메이션 (선택사항)  
    function checkCards() {  
        const triggerBottom = window.innerHeight * 0.8;  

        blogCards.forEach(card => {  
            const cardTop = card.getBoundingClientRect().top;  

            if (cardTop < triggerBottom) {  
                card.style.opacity = '1';  
                card.style.transform = 'translateY(0)';  
            }  
        });  
    }  

    // 초기 상태 설정  
    blogCards.forEach(card => {  
        card.style.opacity = '0';  
        card.style.transform = 'translateY(50px)';  
        card.style.transition = 'all 0.5s ease';  
    });  

    // 스크롤 이벤트 리스너  
    window.addEventListener('scroll', checkCards);  
    
    // 초기 체크  
    checkCards();  
});