import React from "react";
interface IPaginationProps {
  page: number;
  update: Function;
}
export default function Pagination({ page, update }: IPaginationProps) {
  const nums = Array.from({ length: 10 }, (_, i) => i + 1);
  function getNumber(pageNumber: number | string) {
    if (pageNumber == "dec") {
      if (page <= 1) {
        return;
      } else {
        update(page - 1);
      }
    } else if (pageNumber == "inc") {
      update(page + 1);
    } else {
      update(pageNumber);
    }
  }

  return (
    <nav aria-label="..." className="py-4 d-flex justify-content-center align-items-center  ">
      <ul className="pagination pagination-md ">
        <li onClick={() => getNumber("dec")} className="page-item">
          <a className="page-link bg-transparent text-white ">Previous</a>
        </li>
        {nums.map((pageNum: number) => (
          <li onClick={() => getNumber(pageNum)} key={pageNum} className="page-item">
            <a className="page-link bg-transparent text-white ">{pageNum}</a>
          </li>
        ))}
        <li onClick={() => getNumber("inc")} className="page-item">
          <a className="page-link bg-transparent text-white ">Next</a>
        </li>
      </ul>
    </nav>
  );
}
