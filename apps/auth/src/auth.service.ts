import { UserDocument } from '@app/common/models/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(user: UserDocument, response: Response) {}
}
