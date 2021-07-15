import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client, Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) { } // eslint-disable-line

  async client(client: Prisma.ClientWhereUniqueInput): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: client,
    });
  }

  async clients(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClientWhereUniqueInput;
    where?: Prisma.ClientWhereInput;
    orderBy?: Prisma.ClientOrderByInput;
  }): Promise<Client[]> {
    return this.prisma.client.findMany({ ...params });
  }

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({
      data: { ...data, dtBirth: new Date(data.dtBirth.toLocaleString()) },
    });
  }

  async updateClient(params: {
    where: Prisma.ClientWhereUniqueInput;
    data: Prisma.ClientUpdateInput;
  }): Promise<Client> {
    const { data, where } = params;
    return this.prisma.client.update({
      where,
      data: { ...data, dtBirth: new Date(data.dtBirth.toString()) },
    });
  }

  async deleteUser(where: Prisma.ClientWhereUniqueInput): Promise<Client> {
    return this.prisma.client.delete({ where });
  }
}
