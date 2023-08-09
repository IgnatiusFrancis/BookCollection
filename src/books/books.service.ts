import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    try {
      // Get the first book that appears with the given title
      const bookTitle = await this.prismaService.book.findFirst({
        where: {
          title: createBookDto.title,
        },
      });

      // Throw error if book already exist
      if (bookTitle) {
        throw new Error('Book already exist with this title');
      }

      // Create book
      const book = await this.prismaService.book.create({
        data: {
          title: createBookDto.title,
          author: createBookDto.author,
          description: createBookDto.description,
          price: createBookDto.price,
        },
      });

      // Map through the array of images and associate each image with the book by setting the 'book_id' field
      const bookImages = createBookDto.images.map((image) => {
        // Spread the properties of the 'image' object and add the 'book_id' field
        return { ...image, book_id: book.id };
      });

      // Create multiple image records in the database, associating them with the book
      await this.prismaService.image.createMany({ data: bookImages });

      // Attach the images to the book object
      const bookWithImages = { ...book, images: bookImages };

      return {
        message: 'Book created successfully',
        result: bookWithImages,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const books = await this.prismaService.book.findMany({
      orderBy: {
        id: 'asc', // Sort by id in ascending order
      },
    });

    if (!books.length) {
      throw new NotFoundException('No book found');
    }

    return {
      result: books,
      success: true,
    };
  }

  async findOne(id: number) {
    try {
      // Check if the book with the given id exists and include the images
      const book = await this.prismaService.book.findUnique({
        where: {
          id,
        },
        include: {
          images: true,
        },
      });

      // throw error if not found
      if (!book) {
        throw new NotFoundException('Invalid book ID');
      }

      return {
        result: book,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      // Check if the book with the given id exists
      const book = await this.prismaService.book.findUnique({
        where: {
          id,
        },
      });

      // throw error if not found
      if (!book) {
        throw new NotFoundException('Invalid book ID');
      }

      // update the book field
      const updatedBook = await this.prismaService.book.update({
        where: { id },
        data: {
          title: updateBookDto.title,
          author: updateBookDto.author,
          description: updateBookDto.description,
          price: updateBookDto.price,
        },
      });

      const bookImages = updateBookDto.images.map((image) => {
        return { ...image, book_id: book.id };
      });

      await this.prismaService.image.createMany({ data: bookImages });

      // Attach the images to the updated book object
      const updatedBookWithImage = { ...updatedBook, images: bookImages };

      return {
        message: 'Book updated successfully',
        result: updatedBookWithImage,
        success: true,
      };
    } catch (error) {
      // Handle error appropriately
      throw error(error);
    }
  }

  async remove(id: number) {
    // Check if the book with the given id exists
    const existingBook = await this.prismaService.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }

    // Delete Images
    await this.prismaService.image.deleteMany({
      where: { book_id: id },
    });

    //Delete Book
    await this.prismaService.book.delete({
      where: { id },
    });

    return {
      message: 'Book deleted successfully',
      success: true,
    };
  }
}
