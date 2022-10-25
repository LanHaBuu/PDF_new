import { Controller, Get, Param, Response } from '@nestjs/common'
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/get/:url')
    async create(@Response() res, @Param('url') url) {
        const a = await this.userService.createPDF(url);
        res.setHeader('Content-Length', a.length);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        res.send(a)
    }

    @Get(':url')
    async createYT(@Response() res, @Param('url') url: string) {
        const data = await this.userService.createPDF(`${url}.com`);

        res.setHeader('Content-Length', data.length);

        res.setHeader('Content-Type', 'application/pdf');

        return this.userService.createPDF(`${url}.com`)

    }

}