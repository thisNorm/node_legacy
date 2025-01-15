// 섹션 로드 함수 수정  
async function loadSection(sectionId) {  
  try {  
      const response = await fetch(`/sections/${sectionId}`);  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);  
      const content = await response.text();  
      document.getElementById(sectionId).innerHTML = content;  

      // 프로필 섹션일 경우 필요한 CSS와 Font Awesome 추가  
      if (sectionId === 'profile') {  
          // profileStyle.css 추가  
          if (!document.querySelector('link[href="/styles/profileStyle.css"]')) {  
              const profileStyle = document.createElement('link');  
              profileStyle.rel = 'stylesheet';  
              profileStyle.href = '/styles/profileStyle.css';  
              document.head.appendChild(profileStyle);  
          }  

          // Font Awesome 추가  
          if (!document.querySelector('link[href*="font-awesome"]')) {  
              const fontAwesome = document.createElement('link');  
              fontAwesome.rel = 'stylesheet';  
              fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';  
              document.head.appendChild(fontAwesome);  
          }  
      }  
  } catch (error) {  
      console.error(`Error loading ${sectionId} section:`, error);  
  }  
}  

// initialize 함수 수정  
function initialize() {  
  // 기존 코드 유지  
  // 나머지 섹션들 로드  
  loadSection('profile');  
  loadSection('blog');  
  loadSection('visit');  
  loadSection('contact');  

  // More 버튼 이벤트 리스너  
  const moreBtn = document.getElementById('moreBtn');  
  if (moreBtn) {  
      moreBtn.addEventListener('click', function(e) {  
          e.preventDefault();  
          scrollToSection('profile');  
      });  
  }  

  // 네비게이션 설정  
  setupNavigation();  

  // 초기 프로그레스 바 업데이트  
  updateProgressBar();  

  // 타이핑 효과 초기화  
  initTypingEffect();  
}