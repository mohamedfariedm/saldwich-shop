'use client';

import React, { useEffect } from 'react'

const Page = () => {
    useEffect(() => {
      // إعادة التوجيه عند تحميل الصفحة
      window.location.href = '/Menu.pdf';
    }, []);
  
    return (
      <div>
        {/* يمكنك وضع أي نص هنا، ولكن لن يتم عرضه لأن الزائر سيتم إعادة توجيهه */}
      </div>
    );
  }
  
  export default Page;
  
