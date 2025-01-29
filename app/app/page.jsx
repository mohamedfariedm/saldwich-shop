'use client';

import React, { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    // إعادة التوجيه عند تحميل الصفحة
    window.location.href = 'https://apps.apple.com/sa/app/%D8%B3%D8%A7%D9%84%D8%AF%D9%88%D8%AA%D8%B4/id1538574421?l=ar';
  }, []);

  return (
    <div>
      {/* يمكنك وضع أي نص هنا، ولكن لن يتم عرضه لأن الزائر سيتم إعادة توجيهه */}
    </div>
  );
}

export default Page;
