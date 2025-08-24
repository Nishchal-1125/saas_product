export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export class PaginationUtil {
  static createPaginatedResult<T>(
    data: T[],
    total: number,
    options: PaginationOptions
  ): PaginatedResult<T> {
    const { page, limit } = options;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  static getSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  static validatePaginationOptions(options: Partial<PaginationOptions>): PaginationOptions {
    return {
      page: Math.max(1, options.page || 1),
      limit: Math.min(100, Math.max(1, options.limit || 10)),
      sortBy: options.sortBy,
      sortOrder: options.sortOrder || 'ASC',
    };
  }
}
