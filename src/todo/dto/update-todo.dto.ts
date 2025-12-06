import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  foodiePoints?: number;
}
