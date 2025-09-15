import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello from NestJS + HTMX + Handlebars + pnpm + npx!' };
  }

  @Get('partial')
  @Render('partial')
  partial() {
    return { fragment: 'This is a partial loaded by HTMX.' };
  }
}
