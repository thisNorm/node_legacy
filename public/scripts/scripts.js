(function (global, $) {  
    var $menu = $('.floating-menu li.m'), // 메뉴 항목  
        $contents = $('.scroll'),        // 스크롤 대상 섹션들  
        $doc = $('html, body');          // 문서(document)  
  
    $(function () {  
      // 섹션으로 스크롤 이동  
      $menu.on('click', 'a', function (e) {  
        e.preventDefault();  // 기본 앵커 동작 방지  
        var $target = $(this).parent(),   // 클릭된 메뉴  
            idx = $target.index(),        // 메뉴 인덱스  
            section = $contents.eq(idx),  // 해당 섹션  
            offsetTop = section.offset().top; // 해당 섹션의 Y축 위치  
            
        // 부드러운 스크롤 이동  
        $doc.stop().animate({  
          scrollTop: offsetTop  
        }, 800);  
      });  
    });  
  
    // 스크롤 시 메뉴 활성화 상태 업데이트  
    $(window).on('scroll', function () {  
      var scltop = $(window).scrollTop(); // 현재 스크롤 위치  
  
      // 각 섹션 위치를 비교하여 활성화 메뉴 업데이트  
      $.each($contents, function (idx, item) {  
        var $target = $contents.eq(idx),  
            targetTop = $target.offset().top;  
  
        if (targetTop <= scltop) {  
          $menu.removeClass('on');  
          $menu.eq(idx).addClass('on');  
        }  
  
        // 스크롤이 최상단에 가까우면 활성화 클래스 제거  
        if (scltop < 200) {  
          $menu.removeClass('on');  
        }  
      });  
    });  
  
    // TOP 버튼 동작  
    var btnTop = $('.btn-top');  
    btnTop.on('click', 'a', function (e) {  
      e.preventDefault(); // 클릭 기본 동작 방지  
      $doc.stop().animate({  
        scrollTop: 0 // 최상단으로 이동  
      }, 800);  
    });  
  })(window, jQuery);