import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const book = await this.prismaService.book.findUnique({
        where: {
          title: createBookDto.title,
        },
      });

      if (book) {
        throw new Error('A book already exist with this title');
      }

      const newBook = await this.prismaService.book.create({
        data: {
          title: createBookDto.title,
          author: createBookDto.author,
          description: createBookDto.description,
          price: createBookDto.price,
        },
      });
      return {
        message: 'Book created successfully',
        result: newBook,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
