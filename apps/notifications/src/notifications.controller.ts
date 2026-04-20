import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  // eslint-disable-next-line @typescript-eslint/require-await
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.notificationsService.notifyEmail(data);
  }
}
