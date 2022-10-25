import { Controller, Get, Response, Param } from '@nestjs/common'
import { PdfService } from './pdf.service'

@Controller('/pdf')
export class PdfController {
    constructor(private pdfService: PdfService) { }

    @Get('/get/:url')
    async create(@Response() res, @Param('url') url) {
        const a = await this.pdfService.createPDF(url);
        res.setHeader('Content-Length', a.length);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        res.send(a)
    }

    @Get(':url')
    async createYT(@Response() res) {
        this.pdfService.createPDF('youtube.com')
        this.pdfService.createPDF('facebook.com')
        this.pdfService.createPDF('google.com')
        return
    }


}