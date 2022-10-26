import { Controller, Get, Param, Response } from '@nestjs/common'
import { UserService } from './user.service';
import { InjectRedis} from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
        @InjectRedis() private readonly redis: Redis
        ) { }

    @Get('/get/:url')
    async create(@Response() res, @Param('url') url) {
        const a = await this.userService.createPDF(url);
        const aString = a.toString(('base64'))
        // const aBuffer = Buffer.from(aString,'base64')
      const b=  await this.redis.set('data',a);
      console.log(b);
      
        const test = await this.redis.getBuffer('data')
        // console.log(test);
        
        
        res.setHeader('Content-Length','Content-Type', 'application/pdf', test.length);
        res.send(test)
    }

    @Get(':url')
    async createYT(@Response() res, @Param('url') url: string) {
        const data = await this.userService.createPDF(`${url}.com`);

        res.setHeader('Content-Length', data.length);

        res.setHeader('Content-Type', 'application/pdf');

        return url

    }

}