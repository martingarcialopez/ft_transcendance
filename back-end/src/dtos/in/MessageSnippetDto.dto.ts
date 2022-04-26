import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

@Exclude()
export class MessageSnippetDto {

    @Expose()
    @IsNumber()
    readonly id: number;

}
