export class PaginationDto {
  page?: number = 1;
  limit?: number = 10;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC' = 'ASC';

  get skip(): number {
    return ((this.page || 1) - 1) * (this.limit || 10);
  }
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
