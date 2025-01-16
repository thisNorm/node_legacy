// document.addEventListener('DOMContentLoaded', function() {  
//     const stackItems = document.querySelectorAll('.stack-item');  
    
//     // 스크롤 감지 및 애니메이션  
//     function checkScroll() {  
//         stackItems.forEach(item => {  
//             const rect = item.getBoundingClientRect();  
//             const isVisible = (rect.top <= window.innerHeight * 0.8);  
            
//             if (isVisible) {  
//                 item.style.opacity = '1';  
//             }  
//         });  
//     }  

//     // 초기 체크  
//     checkScroll();  
    
//     // 스크롤 이벤트  
//     window.addEventListener('scroll', checkScroll);  

//     // 스택 아이템 클릭 이벤트  
//     stackItems.forEach(item => {  
//         item.addEventListener('click', function() {  
//             const stackName = this.querySelector('.stack-name').textContent;  
//             showStackInfo(stackName);  
//         });  
//     });  
// });  

// function showStackInfo(stackName) {  
//     // 여기에 클릭 시 표시할 상세 정보 로직 추가  
//     console.log(`Clicked: ${stackName}`);  
// }