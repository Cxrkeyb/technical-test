import { useFormikContext } from 'formik';
import React from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface PageEnumerationProps {
  totalPages: number;
  userView?: boolean;
}

const PageEnumeration: React.FC<PageEnumerationProps> = ({
  totalPages,
  userView = false,
}) => {
  const { setFieldValue, values } = useFormikContext<{ page: number }>(); // Aquí especificamos el tipo de values
  const currentPage = values.page;

  const handleClick = (pageNumber: number) => {
    setFieldValue('page', pageNumber);
  };

  const getPageRange = () => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    const range: number[] = [];

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  if (totalPages === 1 || totalPages === 0) {
    return null;
  }

  return (
    <div>
      <div
        className={`flex flex-row items-center justify-center ${
          userView && 'gap-8'
        }`}
      >
        {currentPage !== 1 && (
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold ${
              userView ? 'rounded-full p-3' : 'rounded-l-lg px-4 py-3'
            }  ${currentPage === 1 ? 'bg-gray-400' : ''}`}
            onClick={() => handleClick(currentPage === 1 ? 1 : currentPage - 1)}
            disabled={currentPage === 1}
          >
            <BsArrowLeft />
          </button>
        )}
        {getPageRange().map((pageNumber) => (
          <button
            key={pageNumber}
            className={`
          bg-gray-200 text-gray-800 font-bold py-2 w-10
            ${pageNumber === currentPage && 'bg-primary'}
            ${pageNumber === totalPages && currentPage === totalPages && !userView ? 'rounded-r-lg' : 'hover:bg-primary-foreground'}
            ${pageNumber === 1 && currentPage === 1 ? 'rounded-l-lg' : ''}
          `}
            onClick={() => handleClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage !== totalPages && (
          <button
            className={`bg-gray-200 hover:bg-primary-foreground text-gray-800 font-bold ${
              userView ? 'rounded-lg p-3' : 'rounded-r py-3 px-4'
            }`}
            onClick={() =>
              handleClick(
                currentPage === totalPages ? totalPages : currentPage + 1,
              )
            }
            disabled={currentPage === totalPages}
          >
            <BsArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default PageEnumeration;
