import { IsString, Matches } from 'class-validator';

export class CreateSchoolYearDto {
  @IsString()
  @Matches(/^\d{4}-\d{4}$/)
  label: string;
}
