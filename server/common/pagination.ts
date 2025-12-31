export type PaginationResult<T> = {
    totalCount: number;
    list: T[];
    pageNum: number;
    pageSize: number;
    pages: number;
    nextPage: number | null;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasNextPage: boolean;
  };


  export function buildPaginationResult<T>(params: {
    list: T[];
    totalCount: number;
    page: number;
    size: number;
  }): PaginationResult<T> {
    const { list, totalCount, page, size } = params;
  
    const pages = Math.ceil(totalCount / size);
  
    return {
      totalCount,
      list,
      pageNum: page,
      pageSize: size,
      pages,
      nextPage: page < pages ? page + 1 : null,
      isFirstPage: page === 1,
      isLastPage: page === pages,
      hasNextPage: page < pages,
    };
  }