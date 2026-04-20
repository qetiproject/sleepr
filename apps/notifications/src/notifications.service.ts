import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  async notifyEmail({ email }: NotifyEmailDto) {
    console.log(email, 'email');
  }
  // private readonly transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: this.configService.get('SMTP_USER'),
  //     clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
  //     clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
  //   },
  // });

  // async notifyEmail({ email, text }: NotifyEmailDto) {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //   await this.transporter.sendMail({
  //     from: this.configService.get('SMTP_USER'),
  //     to: email,
  //     subject: 'Sleepr Notification',
  //     text,
  //   });
  // }
}
