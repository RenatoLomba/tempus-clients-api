import { Client as ClientModel } from '.prisma/client';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { cpf } from 'cpf-cnpj-validator';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) { } // eslint-disable-line

  @Get()
  async findAll(): Promise<ClientModel[]> {
    return this.clientService.clients({ orderBy: { dtRegistered: 'desc' } });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClientModel> {
    return this.clientService.client({ id });
  }

  @Get('filtered/:searchString')
  async findFiltered(
    @Param('searchString') searchString: string,
  ): Promise<ClientModel[]> {
    return this.clientService.clients({
      where: { OR: [{ name: { contains: searchString } }] },
    });
  }

  @Post()
  async create(@Body() postData: CreateClientDto): Promise<ClientModel> {
    if (!cpf.isValid(postData.cpf))
      throw new BadRequestException(['CPF inválido!']);
    return this.clientService.createClient({ ...postData });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientModel> {
    if (updateClientDto.cpf && !cpf.isValid(updateClientDto.cpf))
      throw new BadRequestException(['CPF inválido!']);

    return this.clientService.updateClient({
      where: { id },
      data: { ...updateClientDto },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ClientModel> {
    return this.clientService.deleteUser({ id });
  }
}
