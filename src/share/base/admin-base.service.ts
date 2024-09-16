import { ConfigService } from "@nestjs/config";
import { join } from "path";

export class AdminBaseService {
    public readonly fileLink = this.configSV.get('FILE_URL');
    public readonly uploadPath = this.configSV.get<string>('FILE_PATH_SERVER');

    constructor(public configSV: ConfigService) {
    }
}