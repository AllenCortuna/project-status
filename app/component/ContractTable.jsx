import React from "react";
import Link from "next/link";
import { format } from "date-fns";

const ContractTable = ({ data, isLogin, handleDetails }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-2 mx-1 text-xs rounded-lg ${
            currentPage === i
              ? "bg-primary text-white"
              : "bg-gray-200 text-zinc-600"
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  return (
    <div className="flex flex-col mx-auto mt-5 scroll-container h-auto">
      {/* PAGINATION */}
      {data.length > itemsPerPage && (
        <div className="flex justify-between items-center mb-5">
          <button
            className={`px-4 py-2 bg-primary text-xs text-white rounded-md ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <div>{renderPageNumbers()}</div>
          <button
            className={`px-4 py-2 bg-primary text-xs text-white rounded-md ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {/* TABLE */}
      <table className="table table-zebra max-w-[72rem] table-pin-rows border shadow-sm border-zinc-300 ">
        <thead>
          <tr className="text-xs text-zinc-500">
            <th className="text-xs">Contract with no Award</th>
            <th className="w-40">Pre Bid</th>
            <th className="w-40">Bidding</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((info, ind) => (
            <tr key={ind} className="hover">
              <td
                className="text-xs tooltip text-zinc-500 hover:cursor-pointer text-left"
                data-tip="Click to copy."
                onClick={() => navigator.clipboard.writeText(info.projectName)}
              >
                <span className="text-xs text-primary font-bold">
                  {info.contractID}
                </span>
                :&nbsp;
                {info.projectName}
              </td>
              <td className="text-xs text-zinc-500">
                {format(new Date(info?.preBid), "MMM-d-yyyy") || ""}
              </td>
              <td className="text-xs text-zinc-500">
                {format(new Date(info?.bidding), "MMM-d-yyyy") || ""}
              </td>
              <td>
                {isLogin ? (
                  <span className="btn btn-primary btn-sm text-xs text-white">
                    <Link href={`/update-contract/${info._id}`}>update</Link>
                  </span>
                ) : (
                  <button
                    className="btn btn-sm text-xs btn-primary text-white"
                    onClick={() => handleDetails(info)}
                  >
                    view
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTable;
