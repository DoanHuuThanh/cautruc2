import { ApiProperty } from '@nestjs/swagger';
import { ErrorCodes } from '../constains/error-code';

export class SuccessResponse<T> {
  @ApiProperty({
    example: ErrorCodes.OK.code,
    description: 'Response code',
  })
  readonly code: string;

  readonly data: T;
}
