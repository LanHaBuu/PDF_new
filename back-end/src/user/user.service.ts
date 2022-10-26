import { Injectable } from '@nestjs/common'
import puppeteer from 'puppeteer'
import * as fs from 'fs'
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { InjectRedis} from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class UserService {
    // constructor(@InjectQueue('PDF') private audioQueue: Queue) {}
    constructor(
        @InjectRedis() private readonly redis: Redis // or // @InjectRedis(DEFAULT_REDIS_NAMESPACE) private readonly redis: Redis
      ) {}

    async get(link: string) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(link, { waitUntil: 'networkidle0' });
        const pdf = await page.pdf({ format: 'A4' });
        await browser.close();
        return pdf
    }

    createPDF(url): Promise<Buffer> {
        return this.saveFile(url) as unknown as  Promise<Buffer>
    }

    saveFile(url) {
        return new Promise((resolve) => {
            const fileName = `${url.replace(/\./g, '').replace('https://', '').replace('com', '')}.pdf`;
            fs.readFile(fileName, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    this.get(`https://${url}.com`).then(pdf => {
                        fs.writeFile(fileName, pdf, () => { })
                        resolve(pdf)
                    })
                }
            });
        })
    }


}