import { Controller } from '@nestjs/common';
import { PaginatedResponse } from '../dto/paginated-response.dto';
import { SuccessResponse } from '../dto/success-reponse.dto';
import { ErrorCodes } from '../constains/error-code';
import { ErrorResponse } from '../dto/error-response.dto';

@Controller()
export class BaseController {
  protected createSuccessResponse<T>(data: T): SuccessResponse<T> {
    return {
      code: ErrorCodes.OK.code,
      data,
    };
  }

  protected createPaginatedResponse<T>(
    data: T[],
    paginated: {
      pageNum: number;
      pageSize: number;
      totalCount: number;
    },
  ): PaginatedResponse<T> {
    const pageCount = Math.ceil(paginated.totalCount / paginated.pageSize);
    const hasPreviousPage = paginated.pageNum > 0;
    const hasNextPage = paginated.pageNum < pageCount - 1;
    return {
      code: ErrorCodes.OK.code,
      data,
      pagination: {
        ...paginated,
        hasPreviousPage,
        hasNextPage,
      },
    };
  }
}
