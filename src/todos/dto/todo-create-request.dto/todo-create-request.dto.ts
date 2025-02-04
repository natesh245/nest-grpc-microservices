import { IsString, MaxLength } from 'class-validator';
export class TodoCreateRequestDto {
  @IsString()
  @MaxLength(50)
  public name: string;

  @IsString()
  public description: string;
}
