import { Body, Controller, Post } from "@nestjs/common";
import { createCustomGameDto } from "src/dtos/in/createCustomGame.dto";
import { PongService } from "src/services/pong.service";

@Controller('pong')
export class PongController {

    constructor(private pongService: PongService) {}

    @Post('/createCustomGame')
    createCustomGame(@Body() data: createCustomGameDto) : Promise<string> {

        return this.pongService.createCustomGame(data.userId, data.difficulty, data.maxScore);
    }



}