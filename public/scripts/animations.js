document.addEventListener('DOMContentLoaded', function () {  
    // 성능 최적화를 위한 throttle 함수  
    function throttle(func, limit) {  
        let lastFunc;  
        let lastRan;  
        return function() {  
            const context = this;  
            const args = arguments;  
            if (!lastRan) {  
                func.apply(context, args);  
                lastRan = Date.now();  
            } else {  
                clearTimeout(lastFunc);  
                lastFunc = setTimeout(function() {  
                    if ((Date.now() - lastRan) >= limit) {  
                        func.apply(context, args);  
                        lastRan = Date.now();  
                    }  
                }, limit - (Date.now() - lastRan));  
            }  
        }  
    }  

    // 공통 애니메이션 함수  
    function checkElementsInView(elements, animationCallback) {  
        const windowHeight = window.innerHeight;  
        const windowTop = window.pageYOffset;  
        const windowBottom = windowTop + windowHeight;  

        elements.forEach((element, index) => {  
            const elementRect = element.getBoundingClientRect();  
            const elementTop = elementRect.top + windowTop;  
            const elementBottom = elementTop + elementRect.height;  

            // 요소가 화면에 보이는지 확인  
            if (elementTop <= windowBottom - 100 && elementBottom >= windowTop) {  
                requestAnimationFrame(() => {  
                    setTimeout(() => {  
                        animationCallback(element);  
                    }, index * 100);  
                });  
            } else {  
                resetElement(element);  
            }  
        });  
    }  

    // 요소 초기화 함수  
    function resetElement(element) {  
        if (!element.classList.contains('animated')) {  
            element.style.opacity = '0';  
            element.style.transform = 'translateY(50px)';  
        }  
    }  

    // 애니메이션 함수  
    function animateElement(element) {  
        if (!element.classList.contains('animated')) {  
            element.style.opacity = '1';  
            element.style.transform = 'translateY(0)';  
            element.classList.add('animated');  
        }  
    }  

    // 섹션별 애니메이션 함수들  
    const animationFunctions = {  
        'blog-section': () => checkElementsInView(  
            document.querySelectorAll('.blog-card'),  
            animateElement  
        ),  
        'stack-section': () => checkElementsInView(  
            document.querySelectorAll('.stack-item'),  
            animateElement  
        ),  
        'project-section': () => checkElementsInView(  
            document.querySelectorAll('.project-card'),  
            animateElement  
        ),  
        'contact-section': () => checkElementsInView(  
            document.querySelectorAll('.contact-item'),  
            animateElement  
        )  
    };  

    // 모든 요소 초기화  
    const allItems = document.querySelectorAll('.blog-card, .stack-item, .project-card, .contact-item');  
    allItems.forEach(item => {  
        item.style.opacity = '0';  
        item.style.transform = 'translateY(50px)';  
        item.style.transition = 'all 0.6s ease';  
    });  

    // 스크롤 이벤트 핸들러  
    function handleScroll() {  
        Object.values(animationFunctions).forEach(func => func());  
    }  

    // 스크롤 이벤트에 throttle 적용  
    const throttledScroll = throttle(handleScroll, 100);  

    // 스크롤 이벤트 리스너 등록  
    window.addEventListener('scroll', throttledScroll);  
    // 초기 로드시 실행  
    handleScroll();  

    // resize 이벤트에도 애니메이션 체크 추가  
    window.addEventListener('resize', throttle(handleScroll, 100));  
});