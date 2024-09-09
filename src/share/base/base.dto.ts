import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({
    description: 'Id of item',
  })
  id: number;

  @ApiProperty({
    description: 'Created at',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last updated at',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The user that created by',
  })
  createdBy: string;

  @ApiProperty({
    description: 'The most recently updated by',
  })
  updatedBy: string;
}
