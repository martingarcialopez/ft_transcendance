import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

@Exclude()
export class MessageSnippetDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    readonly sender: string;

    @Expose()
    @IsString()
    readonly content: string;
}
