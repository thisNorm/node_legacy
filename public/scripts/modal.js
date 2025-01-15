// public/scripts/modal.js  
document.addEventListener('DOMContentLoaded', function() {  
    console.log('Modal script loaded'); // 스크립트 로드 확인  

    const modalBtns = document.querySelectorAll('.profile-btn');  
    console.log('Modal buttons found:', modalBtns.length); // 버튼 엘리먼트 확인  

    const modals = {  
        hobby: document.getElementById('hobbyModal'),  
        personality: document.getElementById('personalityModal')  
    };  
    console.log('Modals found:', {  
        hobby: !!modals.hobby,  
        personality: !!modals.personality  
    }); // 모달 엘리먼트 확인  

    // 모달 열기  
    modalBtns.forEach(btn => {  
        btn.addEventListener('click', function(e) {  
            e.preventDefault();  
            const modalType = this.getAttribute('data-modal');  
            console.log('Button clicked:', modalType); // 클릭 이벤트 확인  
            
            const targetModal = modals[modalType];  
            if (targetModal) {  
                console.log('Opening modal:', modalType);  
                targetModal.style.display = 'block';  
            } else {  
                console.log('Modal not found for type:', modalType);  
            }  
        });  
    });  

    // 모달 닫기 (X 버튼)  
    const closeButtons = document.querySelectorAll('.close-modal');  
    console.log('Close buttons found:', closeButtons.length); // 닫기 버튼 확인  

    closeButtons.forEach(button => {  
        button.addEventListener('click', function() {  
            const modal = this.closest('.modal');  
            if (modal) {  
                console.log('Closing modal');  
                modal.style.display = 'none';  
            }  
        });  
    });  

    // 모달 외부 클릭시 닫기  
    window.addEventListener('click', function(event) {  
        if (event.target.classList.contains('modal')) {  
            event.target.style.display = 'none';  
        }  
    });  
});