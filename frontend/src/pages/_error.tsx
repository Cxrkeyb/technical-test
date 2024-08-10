import React from 'react';

import { Head } from '@/components';

const NotFoundPage = () => {
  return (
    <>
      <Head title="Error 404" />
      <div className="flex flex-col items-center justify-center gap-16 my-20">
        <span className="text-gray-500">404</span>
        <h2 className="text-4xl font-[400] ">Página no encontrada</h2>
      </div>
    </>
  );
};

export default NotFoundPage;
