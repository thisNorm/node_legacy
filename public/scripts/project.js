// function loadProjectResources() {
//     // CSS 로드 체크 및 추가  
//     if (!document.querySelector('link[href="/styles/project.css"]')) {
//         const projectStyle = document.createElement('link');
//         projectStyle.rel = 'stylesheet';
//         projectStyle.href = '/styles/project.css';
//         document.head.appendChild(projectStyle);
//     }

//     // 프로젝트 이미지 로드 체크  
//     const projectImages = document.querySelectorAll('.project-img');
//     projectImages.forEach(img => {
//         img.onerror = function () {
//             console.error(`Failed to load project image: ${img.src}`);
//             img.src = '/images/placeholder.png';
//         };
//     });
// }

// // 프로젝트 카드 클릭 이벤트  
// document.querySelectorAll('.project-card').forEach(card => {
//     card.addEventListener('click', function () {
//         // 프로젝트 상세 정보를 보여주는 모달 등을 구현할 수 있습니다  

//         // 스크롤 감지 및 애니메이션  
//         function checkScroll() {
//             stackItems.forEach(item => {
//                 const rect = item.getBoundingClientRect();
//                 const isVisible = (rect.top <= window.innerHeight * 0.8);

//                 if (isVisible) {
//                     item.style.opacity = '1';
//                 }
//             });
//         }

//         // 초기 체크  
//         checkScroll();

//         // 스크롤 이벤트  
//         window.addEventListener('scroll', checkScroll);
//     });
// });