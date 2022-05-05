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
  @IsString()
  @IsNotEmpty()
  public fromUser: string;

  @IsString()
  @IsNotEmpty()
  public contentToSend: string;

  @IsNumber()
  @IsNotEmpty()
  public channelIdDst: number;

  @IsString()
  @IsNotEmpty()
  public channelName: string;
}
