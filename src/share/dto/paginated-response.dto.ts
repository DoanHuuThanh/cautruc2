import { ApiProperty } from '@nestjs/swagger';
import { ErrorCodes } from '../constains/error-code';

export class Pagination {
  totalCount: number;

  pageNum: number;

  pageSize: number;

  hasPreviousPage: boolean;

  hasNextPage: boolean;
}

export class PaginatedResponse<T> {
  @ApiProperty({
    example: ErrorCodes.OK.code,
    description: 'Response code',
  })
  readonly code: string;
  data: T[];

  @ApiProperty({
    type: Pagination,
    description: 'Total number of the data',
  })
  pagination: Pagination;
}
