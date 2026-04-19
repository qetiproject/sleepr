import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(@Payload() data: PaymentsCreateChargeDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.paymentsService.createCharge(data);
  }
}
