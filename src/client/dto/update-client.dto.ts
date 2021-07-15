import {
  IsDateString,
  IsNumber,
  IsOptional,
  MaxDate,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @MaxLength(150, { message: 'Campo deve conter no máximo 150 caracteres!' })
  name?: string;

  @IsOptional()
  @MaxLength(14, { message: 'Campo deve conter no máximo 14 caracteres!' })
  cpf?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Campo deve ser uma data válida!' })
  @MaxDate(new Date(), {
    message: 'Data de nascimento não pode ser maior que a data atual!',
  })
  dtBirth?: string | Date;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Campo deve ser numérico com até 2 casas decimais!' },
  )
  @Min(0, { message: 'Valor mínimo deve ser 0!' })
  familyIncome?: number;
}
