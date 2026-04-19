import { PAYMENTS_SERVICE } from '@app/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) paymentsService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return await this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  // async create(
  //   createReservationDto: CreateReservationDto,
  //   { email, _id: userId }: UserDto,
  // ) {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  //   return await this.paymentsService
  //     .send('create_charge', {
  //       ...createReservationDto.charge,
  //       email,
  //     })
  //     .pipe(
  //       map((res) => {
  //         return this.reservationsRepository.create({
  //           ...createReservationDto,
  //           invoiceId: res.id,
  //           timestamp: new Date(),
  //           userId,
  //         });
  //       }),
  //     );
  // }

  async findAll() {
    return await this.reservationsRepository.find({});
  }

  async findOne(_id: string) {
    return await this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return await this.reservationsRepository.findOneAndDelete({ _id });
  }
}
