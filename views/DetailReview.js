import React, { forwardRef } from 'react';  

const DetailReview = forwardRef((props, ref) => {  
  return (  
    <section ref={(reviewRef) => (ref.current[0] = reviewRef)}>  
      <h2>후기</h2>  
      <p>이곳은 후기 섹션입니다.</p>  
    </section>  
  );  
});  

export default DetailReview;