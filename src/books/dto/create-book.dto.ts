import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  id: number;
  title: String;
  author: String;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: String;
  price: number;
  images: Image[];
}

export class Image {
  @IsString()
  @IsNotEmpty()
  url: string;
}
