// export class room_id_name_DTO {
// 	id: number;
// 	name : string;
// }
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

@Exclude()
export class RoomSnippetDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    readonly room_name: string;

}
