import { useEffect, useState } from "react";
import { IListOptions, IListResultMeta } from "../services/api/rest/rest";

interface ISUPaginationProps {
  meta: IListResultMeta;
  sortFields?: { field: string; name: string }[];
  pageSizes?: number[];
  onChange: (options: IListOptions) => void;
}

export default function SUPagination({
  meta,
  pageSizes,
  onChange,
  sortFields,
}: ISUPaginationProps) {
  const pagesBlocks: number[][] = [[]];

  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(meta.page);

  useEffect(() => {
    setLoading(false);
    setCurrentPage(meta.page);
  }, [meta, sortFields]);

  for (let page = 1; page <= meta.totalPages; page++) {
    pagesBlocks[pagesBlocks.length - 1].push(page);
  }

  function changePageSize(val: number) {
    setLoading(true);
    onChange({
      pageSize: val,
      page: meta.page,
      sortBy: meta.sortBy,
      sortDir: meta.sortDir,
    });
  }

  function changePage(newPage: number) {
    setCurrentPage(newPage);
    setLoading(true);
    onChange({
      pageSize: meta.pageSize,
      page: newPage,
      sortBy: meta.sortBy,
      sortDir: meta.sortDir,
    });
  }

  const shoPageSizes = pageSizes || [10, 20, 50, 100];

  return (
    <>
      <div className="pt-1 pb-1 mr-5">
        Total items: {meta.total} | Shown: {meta.pageSize * meta.page + 1}-
        {Math.min(meta.pageSize * meta.page + meta.pageSize, meta.total)} | Per
        page:
        <select
          className="p-2 ml-2 rounded border-grey-800 border-2 bg-white"
          value={meta.pageSize}
          onChange={(e) => changePageSize(parseInt(e.target.value))}
          disabled={isLoading}>
          {shoPageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex">
        {pagesBlocks.map((block) => {
          return block.map((pageNum) => (
            <button
              type="button"
              key={`goto_${pageNum}`}
              className={`cursor-pointer pt-1 pb-1 pl-4 pr-4 mr-1 hover:bg-grey-100 rounded ${
                currentPage === pageNum - 1
                  ? "!bg-blue-700 text-white !pointer-events-none !cursor-default"
                  : ""
              }`}
              onClick={
                currentPage === pageNum - 1
                  ? undefined
                  : () => changePage(pageNum - 1)
              }>
              {pageNum}
            </button>
          ));
        })}
      </div>
    </>
  );
}
