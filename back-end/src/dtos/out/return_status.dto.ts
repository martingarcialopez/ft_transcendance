import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

@Exclude()
export class ReturnStatusDto {


    @Expose()
    @IsString()
    readonly status: string;

    @Expose()
    @IsString()
    readonly msg: string;
}
