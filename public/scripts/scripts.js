(function (global, $) {  
  const $menu = $('.floating-menu a');  
  let isScrolling = false;  
  
  // 네비게이션 클릭 이벤트  
  $menu.on('click', function(e) {  
      e.preventDefault();  
      const sectionId = $(this).attr('href').substring(1);  
      
      // 섹션 로드 및 스크롤  
      loadSection(sectionId);  
      scrollToSection($(`#${sectionId}`));  
      
      // 메뉴 활성화 상태 업데이트  
      $menu.removeClass('active');  
      $(this).addClass('active');  
  });  

  // 휠 이벤트 처리  
  $(window).on('wheel', function(e) {  
      if (isScrolling) return;  
      
      const $sections = $('section.section');  
      const currentScrollTop = $(window).scrollTop();  
      let targetSection;  

      // 현재 보이는 섹션 찾기  
      $sections.each(function(index) {  
          const sectionTop = $(this).offset().top;  
          if (currentScrollTop >= sectionTop - 100) {  
              if (e.originalEvent.deltaY > 0 && index < $sections.length - 1) {  
                  // 아래로 스크롤  
                  targetSection = $sections.eq(index + 1);  
              } else if (e.originalEvent.deltaY < 0 && index > 0) {  
                  // 위로 스크롤  
                  targetSection = $sections.eq(index - 1);  
              }  
          }  
      });  

      if (targetSection) {  
          scrollToSection(targetSection);  
      }  
  });  

  // 스크롤 이벤트 처리  
  $(window).on('scroll', function() {  
      const scrollTop = $(window).scrollTop();  
      
      // 각 섹션의 위치를 확인하여 메뉴 활성화  
      $('section.section').each(function() {  
          const $section = $(this);  
          const sectionTop = $section.offset().top;  
          const sectionId = $section.attr('id');  
          
          if (scrollTop >= sectionTop - 100) {  
              $menu.removeClass('active');  
              $(`.floating-menu a[href="#${sectionId}"]`).addClass('active');  
          }  
      });  
  });  

  // 섹션으로 스크롤하는 함수  
  function scrollToSection($target) {  
      isScrolling = true;  
      
      $('html, body').animate({  
          scrollTop: $target.offset().top  
      }, 800, function() {  
          setTimeout(() => {  
              isScrolling = false;  
          }, 100);  
      });  
  }  
})(window, jQuery);