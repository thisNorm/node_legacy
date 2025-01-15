import React, { useEffect, useRef, useState } from 'react';  

const DETAIL_NAV = [  
  { idx: 0, name: '후기' },  
  { idx: 1, name: '클래스 소개' },  
  { idx: 2, name: '커리큘럼' },  
  { idx: 3, name: '크리에이터' },  
  { idx: 4, name: '커뮤니티' },  
  { idx: 5, name: '환불 정책' },  
];  

const DetailNav = ({ scrollRef }) => {  
  const [navIndex, setNavIndex] = useState(null); // 현재 클릭된 목차 인덱스  
  const navRef = useRef([]); // 목차 버튼 DOM 배열 관리  

  // 클릭 시 해당 섹션으로 스크롤 이동  
  useEffect(() => {  
    if (navIndex !== null) {  
      scrollRef.current[navIndex]?.scrollIntoView({ behavior: 'smooth' });  
      setNavIndex(null); // 초기화  
    }  
  }, [navIndex, scrollRef]);  

  // 현재 스크롤 위치에 따라 NavBar 버튼 스타일 업데이트  
  useEffect(() => {  
    const changeNavBtnStyle = () => {  
      scrollRef.current.forEach((ref, idx) => {  
        if (ref.offsetTop - 180 < window.scrollY) {  
          navRef.current.forEach((btn) => btn.classList.remove('active')); // 모든 버튼 비활성화  
          navRef.current[idx]?.classList.add('active'); // 현재 섹션에 해당하는 버튼 활성화  
        }  
      });  
    };  

    window.addEventListener('scroll', changeNavBtnStyle);  

    return () => {  
      window.removeEventListener('scroll', changeNavBtnStyle);  
    };  
  }, [scrollRef]);  

  return (  
    <nav>  
      {DETAIL_NAV.map(({ idx, name }) => (  
        <button  
          key={idx}  
          ref={(btn) => (navRef.current[idx] = btn)}  
          onClick={() => setNavIndex(idx)}  
        >  
          {name}  
        </button>  
      ))}  
    </nav>  
  );  
};  

export default DetailNav;