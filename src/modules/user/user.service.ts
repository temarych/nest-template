import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private prisma: PrismaService) {}

  public async create(data: Omit<User, 'id'>): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  public async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  public async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async update(
    id: string,
    data: Partial<Omit<User, 'id'>>,
  ): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  public async isEmailUnique(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user === null;
  }

  public async remove(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
