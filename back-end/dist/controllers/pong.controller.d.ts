import { createCustomGameDto } from "src/dtos/in/createCustomGame.dto";
import { PongService } from "src/services/pong.service";
export declare class PongController {
    private pongService;
    constructor(pongService: PongService);
    createCustomGame(data: createCustomGameDto): Promise<string>;
}
