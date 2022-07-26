import { Expose } from "class-transformer";

export class UserDto {

    @Expose()
    id: number;
  
    @Expose()
    login42: string;
  
    @Expose()
    username: string;
  
    @Expose()
    firstname: string;
  
    @Expose()
    lastname: string;
  
    @Expose()
    twofa: boolean;
  
    @Expose()
    avatar: string;
  
    @Expose()
    status: string;
  
}