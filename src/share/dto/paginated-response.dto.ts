import { ApiProperty } from '@nestjs/swagger';
import { ErrorCodes } from '../constains/error-code';

export class Pagination {
  @ApiProperty({
    example: 200,
    description: 'Total number of the data',
  })
  totalCount: number;
  @ApiProperty({
    example: 0,
    description: 'Number of page, start with 0',
  })
  pageNum: number;
  @ApiProperty({
    example: 100,
    description: 'Max number of items each page',
  })
  pageSize: number;

  @ApiProperty({
    example: true,
    description: 'Has previous page or not',
  })
  hasPreviousPage: boolean;

  @ApiProperty({
    example: true,
    description: 'Has next page or not',
  })
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
