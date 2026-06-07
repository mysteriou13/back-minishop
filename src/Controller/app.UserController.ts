import { Controller, Post,Body } from '@nestjs/common';
import { AppService } from '../Service/app.Users-service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('inscription')
  getInscription(@Body() body: any) {
    return this.appService.getInscription( body);
  }

  @Post('connection')
  getConnexion(@Body() body: any): string {
    return this.appService.getConnexion(body);
  }
}
