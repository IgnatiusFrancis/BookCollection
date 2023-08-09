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
} from '../mocks';

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
              update: jest.fn().mockReturnValue(mockBook),
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
    it('should call prisma book.findMany with correct params', async () => {
      const mockPrismaFindManyBooks = jest
        .fn()
        .mockReturnValue(mockGetAllBooks);

      jest
        .spyOn(prismaService.book, 'findMany')
        .mockImplementation(mockPrismaFindManyBooks);

      await service.findAll();

      expect(mockPrismaFindManyBooks).toBeCalledWith({
        select: {
          images: {
            select: { url: true },
            take: 1,
          },
        },
      });
    });

    it('should throw not found exception if no books are found', async () => {
      const mockPrismaFindManyBooks = jest.fn().mockReturnValue([]);

      jest
        .spyOn(prismaService.book, 'findMany')
        .mockImplementation(mockPrismaFindManyBooks);

      await expect(service.findAll()).rejects.toThrowError(NotFoundException);
    });
  });

  describe('createBook', () => {
    const mockCreateBookParams = {
      id: 1,
      title: 'Springboot course for beginners genesis',
      author: 'Bucky Roberts',
      description: 'Beginners guild to spring boot',
      price: 5000,
      image: 'img4',
      images: [
        {
          url: 'img4',
        },
      ],
    };

    it('should call prisma home.create with the correct payload', async () => {
      const mockCreateBook = jest.fn().mockReturnValue(mockBook);

      jest
        .spyOn(prismaService.book, 'create')
        .mockImplementation(mockCreateBook);

      await service.create(mockCreateBookParams);

      expect(mockCreateBook).toBeCalledWith({
        data: {
          title: 'Springboot course for beginners genesis',
          author: 'Bucky Roberts',
          description: 'Beginners guild to spring boot',
          price: 5000,
          image: 'img4',
          images: [
            {
              url: 'img4',
            },
          ],
        },
      });
    });

    it('should call prisma image.createMany with the correct payload', async () => {
      const mockCreateManyImage = jest.fn().mockReturnValue(mockImages);

      jest
        .spyOn(prismaService.image, 'createMany')
        .mockImplementation(mockCreateManyImage);

      await service.create(mockCreateBookParams);

      expect(mockCreateManyImage).toBeCalledWith({
        data: [
          {
            url: 'img8',
            book_id: 1,
          },
        ],
      });
    });
  });

  describe('updateBook', () => {
    it('should update the book and associated images', async () => {
      const mockUpdateBook = jest.fn().mockReturnValue(mockUpdatedBook);
      jest
        .spyOn(prismaService.book, 'update')
        .mockImplementation(mockUpdateBook);

      const mockCreateManyImage = jest.fn().mockReturnValue(mockImages);
      jest
        .spyOn(prismaService.image, 'createMany')
        .mockImplementation(mockCreateManyImage);

      const result = await service.update(1, mockUpdateBookDto);

      expect(result).toEqual({
        message: 'Book updated successfully',
        result: { ...mockUpdatedBook, images: mockImages },
        success: true,
      });

      expect(mockUpdateBook).toBeCalledWith({
        where: { id: 1 },
        data: {
          title: 'Datastructures and Algotithm for beginners',
          author: 'Bucky Roberts',
          description: 'This is a beginners guild to Datastructures',
          price: 5000,
        },
      });

      expect(mockCreateManyImage).toBeCalledWith({
        data: [
          {
            url: 'https://www.udemy.com/course/datastructurescncpp/',
            book_id: 1,
          },
        ],
      });
    });

    it('should throw NotFoundException if book does not exist', async () => {
      jest.spyOn(prismaService.book, 'findUnique').mockResolvedValue(null);

      await expect(service.update(1, mockUpdateBookDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('removeBook', () => {
    it('should remove the book and associated images', async () => {
      const mockFindUniqueBook = jest.fn().mockReturnValue(mockBook);
      jest
        .spyOn(prismaService.book, 'findUnique')
        .mockImplementation(mockFindUniqueBook);

      const mockDeleteManyImage = jest.fn().mockResolvedValue({ count: 2 });
      jest
        .spyOn(prismaService.image, 'deleteMany')
        .mockImplementation(mockDeleteManyImage);

      const mockDeleteBook = jest.fn().mockReturnValue({ id: 1 });
      jest
        .spyOn(prismaService.book, 'delete')
        .mockImplementation(mockDeleteBook);

      const result = await service.remove(1);

      expect(result).toEqual({
        message: 'Book deleted successfully',
        success: true,
      });

      expect(mockFindUniqueBook).toBeCalledWith({
        where: { id: 1 },
      });

      expect(mockDeleteManyImage).toBeCalledWith({
        where: { book_id: 1 },
      });

      expect(mockDeleteBook).toBeCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if book does not exist', async () => {
      jest.spyOn(prismaService.book, 'findUnique').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return the book with images', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual({
        result: { ...mockBook, images: mockImages },
        success: true,
      });

      expect(prismaService.book.findUnique).toBeCalledWith({
        where: { id: 1 },
        include: {
          images: true,
        },
      });
    });

    it('should throw NotFoundException if book does not exist', async () => {
      jest.spyOn(prismaService.book, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
