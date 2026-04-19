import { Controller, Get } from '@nestjs/common';
import { PeymentsService } from './peyments.service';

@Controller()
export class PeymentsController {
  constructor(private readonly peymentsService: PeymentsService) {}

  @Get()
  getHello(): string {
    return this.peymentsService.getHello();
  }
}
