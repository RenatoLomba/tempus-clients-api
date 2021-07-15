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
    const dataFormatted: Prisma.ClientCreateInput = {
      ...data,
      dtBirth: new Date(data.dtBirth.toLocaleString()),
      cpf: data.cpf.replace(/[.,-\s]/g, ''),
    };
    return this.prisma.client.create({
      data: { ...dataFormatted },
    });
  }

  async updateClient(params: {
    where: Prisma.ClientWhereUniqueInput;
    data: Prisma.ClientUpdateInput;
  }): Promise<Client> {
    const { data, where } = params;
    const dataFormatted: Prisma.ClientUpdateInput = {
      ...data,
      dtBirth: data.dtBirth && new Date(data.dtBirth.toString()),
      cpf:
        data.cpf &&
        typeof data.cpf === 'string' &&
        data.cpf.replace(/[.,-\s]/g, ''),
    };
    return this.prisma.client.update({
      where,
      data: { ...dataFormatted },
    });
  }

  async deleteUser(where: Prisma.ClientWhereUniqueInput): Promise<Client> {
    return this.prisma.client.delete({ where });
  }
}
