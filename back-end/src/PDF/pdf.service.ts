import { Injectable } from '@nestjs/common'
import puppeteer from 'puppeteer'
import * as fs from 'fs'

@Injectable()
export class PdfService {
    async get(link: string) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(link, { waitUntil: 'networkidle0' });
        const pdf = await page.pdf({ format: 'A4' });
        await browser.close();
        return pdf
    }

    createPDF(url): any {
        return this.saveFile(url)

    }

    saveFile(url) {
        return new Promise((resolve, reject) => {
            const fileName = `${url.replace(/\./g, '').replace('https://', '')}.pdf`;
            fs.readFile(fileName, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    this.get('https://' + url).then(pdf => {
                        fs.writeFile(fileName, pdf, () => { })
                        resolve(pdf)
                    })
                }
            });
        })
    }



}