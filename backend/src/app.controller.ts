import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('images/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
