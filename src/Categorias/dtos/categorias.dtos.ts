import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @IsArray()
  idsProdutos: string[];

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  idCategoriaAntiga: string;
}
