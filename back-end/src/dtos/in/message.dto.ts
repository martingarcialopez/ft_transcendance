import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MessageDto {

  @IsNumber()
  @IsNotEmpty()
  public userId: number;

	@IsString()
	@IsNotEmpty()
  public sender: string;

  @IsString()
  @IsNotEmpty()
  public contentToSend: string;

  @IsNumber()
  @IsNotEmpty()
  public channelIdDst: number;

}
