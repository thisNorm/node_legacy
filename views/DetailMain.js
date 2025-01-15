import React, { useRef } from 'react';  
import DetailNav from './DetailNav';  
import DetailReview from './DetailReview';  
import DetailClassDescription from './DetailClassDescription';  
import DetailCurriculum from './DetailCurriculum';  
import DetailCreator from './DetailCreator';  
import DetailCommunity from './DetailCommunity';  
import DetailRefundPolicy from './DetailRefundPolicy';  

const DetailMain = () => {  
  const scrollRef = useRef([]); // 배열 형태의 ref 생성  

  return (  
    <>  
      {/* NavBar에 scrollRef 전달 */}  
      <DetailNav scrollRef={scrollRef} />  

      {/* 각 섹션에 scrollRef 전달 */}  
      <DetailReview ref={scrollRef} />  
      <DetailClassDescription ref={scrollRef} />  
      <DetailCurriculum ref={scrollRef} />  
      <DetailCreator ref={scrollRef} />  
      <DetailCommunity ref={scrollRef} />  
      <DetailRefundPolicy ref={scrollRef} />  
    </>  
  );  
};  

export default DetailMain;