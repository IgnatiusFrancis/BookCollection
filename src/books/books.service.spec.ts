import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import {
  mockGetAllBooks,
  mockBook,
  mockImages,
  mockUpdatedBook,
  mockUpdateBookDto,
  bookSelect,
  mockBooks,
  bookId,
} from '../mocks';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BooksService', () => {
  let service: BooksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: PrismaService,
          useValue: {
            book: {
              findMany: jest.fn().mockReturnValue(mockGetAllBooks),
              create: jest.fn().mockReturnValue(mockBook),
              update: jest.fn().mockReturnValue(mockUpdatedBook),
              delete: jest.fn().mockReturnValue(mockBook),
              findUnique: jest.fn().mockReturnValue(mockBook),
            },
            image: {
              createMany: jest.fn().mockReturnValue(mockImages),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getAllBooks', () => {
    it('should return a list of books with images', async () => {
      // Mock the prismaService.book.findMany method
      const mockFindMany = jest.fn().mockResolvedValue(mockBooks);
      jest
        .spyOn(prismaService.book, 'findMany')
        .mockImplementation(mockFindMany);

      // Call the service method
      const result = await service.findAll();

      // Assertion
      expect(result).toEqual({
        result: mockBooks,
        success: true,
      });

      // Verify that prismaService.book.findMany was called with the correct parameters
      expect(mockFindMany).toHaveBeenCalledWith({
        orderBy: {
          id: 'asc',
        },
        include: {
          images: true,
        },
      });
    });

    it('should throw NotFoundException when no books are found', async () => {
      // Mock the prismaService.book.findMany method to return an empty array
      jest.spyOn(prismaService.book, 'findMany').mockResolvedValue([]);

      // Call the service method and expect it to throw NotFoundException
      await expect(service.findAll()).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should retrieve a book by ID', async () => {
      // Mock the prismaService.book.findUnique method to return the mock book
      jest.spyOn(prismaService.book, 'findUnique').mockResolvedValue(mockBook);

      // Call the service method
      const result = await service.findOne(bookId);

      // Assertion
      expect(result).toEqual({
        result: mockBook,
        success: true,
      });

      // Verify that prismaService.book.findUnique was called with the correct parameters
      expect(prismaService.book.findUnique).toHaveBeenCalledWith({
        where: {
          id: bookId,
        },
        include: {
          images: true,
        },
      });
    });

    it('should throw NotFoundException if book is not found', async () => {
      // Mock data
      const bookId = 1;

      // Mock the prismaService.book.findUnique method to return null (no book found)
      jest.spyOn(prismaService.book, 'findUnique').mockResolvedValue(null);

      // Call the service method and expect it to throw a NotFoundException
      await expect(service.findOne(bookId)).rejects.toThrowError(
        NotFoundException,
      );

      // Verify that prismaService.book.findUnique was called with the correct parameters
      expect(prismaService.book.findUnique).toHaveBeenCalledWith({
        where: {
          id: bookId,
        },
        include: {
          images: true,
        },
      });
    });
  });
});
