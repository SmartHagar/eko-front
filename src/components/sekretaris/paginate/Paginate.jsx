/** @format */

import React from "react";
import Pagination from "react-js-pagination";

const Paginate = ({ pageData, setPage, total }) => {
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const setPaginate = () => {
    if (pageData.current_page && pageData.last_page > 1) {
      const { current_page, per_page, total } = pageData;
      return (
        <Pagination
          innerClass="inline-flex items-center -space-x-px"
          activePage={current_page}
          itemsCountPerPage={per_page}
          totalItemsCount={total}
          pageRangeDisplayed={5}
          itemClass=""
          activeClass=""
          prevPageText="Sebelumnya"
          nextPageText="Selanjutnya"
          hideDisabled={true}
          activeLinkClass="text-my-blue"
          linkClassFirst="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          linkClassLast="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          linkClass="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onChange={handlePageChange.bind(this)}
        />
      );
    }
  };

  return (
    <div className="">
      <nav aria-label="Page navigation example">{setPaginate()}</nav>
    </div>
  );
};

export default Paginate;
