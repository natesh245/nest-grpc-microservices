import { IsString, MaxLength } from 'class-validator';
export class TodoUpdateRequestDto {
  @IsString()
  public uuid: string;
  @IsString()
  @MaxLength(50)
  public name: string;

  @IsString()
  public description: string;
}
