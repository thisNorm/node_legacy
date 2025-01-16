document.addEventListener('DOMContentLoaded', () => {  
    // 디버깅을 위한 콘솔 로그 추가  
    console.log('Modal script loaded');  

    const modalBtns = document.querySelectorAll('.profile-btn');  
    console.log('Modal buttons:', modalBtns);  

    const modals = {  
        hobby: document.getElementById('hobbyModal'),  
        personality: document.getElementById('personalityModal')  
    };  
    console.log('Modals:', modals);  

    // 모달 열기  
    modalBtns.forEach(btn => {  
        btn.addEventListener('click', (e) => {  
            e.preventDefault(); // 기본 동작 방지  
            const modalType = btn.getAttribute('data-modal');  
            console.log('Clicked modal type:', modalType);  
            
            const targetModal = modals[modalType];  
            if (targetModal) {  
                console.log('Opening modal:', modalType);  
                targetModal.style.display = 'block';  
                document.body.style.overflow = 'hidden';  
            }  
        });  
    });  

    // 모달 닫기  
    document.querySelectorAll('.close-modal').forEach(closeBtn => {  
        closeBtn.addEventListener('click', () => {  
            const modal = closeBtn.closest('.modal');  
            if (modal) {  
                modal.style.display = 'none';  
                document.body.style.overflow = '';  
            }  
        });  
    });  

    // 모달 외부 클릭시 닫기  
    window.addEventListener('click', (event) => {  
        if (event.target.classList.contains('modal')) {  
            event.target.style.display = 'none';  
            document.body.style.overflow = '';  
        }  
    });  

    // ESC 키로 모달 닫기  
    document.addEventListener('keydown', (event) => {  
        if (event.key === 'Escape') {  
            Object.values(modals).forEach(modal => {  
                if (modal) modal.style.display = 'none';  
            });  
            document.body.style.overflow = '';  
        }  
    });  
});