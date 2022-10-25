import { Module } from '@nestjs/common';
import { PdfModule } from './PDF/pdf.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PdfModule, UserModule],

})
export class AppModule { }
