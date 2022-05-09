import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

@Exclude()
export class RoomSnippetDto {

    @Expose()
    @IsNumber()
    readonly id: number;

}
