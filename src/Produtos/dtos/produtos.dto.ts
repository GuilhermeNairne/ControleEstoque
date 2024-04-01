import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ProdutoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  categoriaId: string;

  @IsNumber()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  preço: number;

  @IsNumber()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(3)
  quantidade: number;
}
