import { Controller, Get, Request } from '@nestjs/common';
import { Request as ExpressRequest, Router } from 'express';

@Controller()
export class AppController {
  @Get()
  getRootApp(): string {
    return 'API is working!';
  }
}
