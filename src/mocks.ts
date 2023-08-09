export const mockUpdatedBook = {
  id: 1,
  title: 'Updated Title',
  author: 'Updated Author',
  description: 'Updated Description',
  price: 5000,
};

export const mockUpdateBookDto = {
  id: 1,
  title: 'Datastructures and Algotithm for beginners',
  author: 'Bucky Roberts',
  description: 'This is a beginners guild to Datastructures',
  price: 5000,
  images: [{ url: 'https://www.udemy.com/course/datastructurescncpp/' }],
};

export const mockGetAllBooks = [
  {
    id: 1,
    title: 'Springboot course for beginners genesis',
    author: 'Bucky Roberts',
    description: 'Beginners guild to spring boot',
    price: 5000,
    images: [
      {
        url: 'img4',
      },
    ],
  },
];

export const bookId = 1;
export const mockBook = {
  id: bookId,
  title: 'Datastructures and Algotithm for beginners',
  author: 'Bucky Roberts',
  description: 'This is a beginners guild to Datastructures',
  price: 5000,
  created_at: new Date('2023-08-09T10:00:00Z'),
  updated_at: new Date('2023-08-09T11:00:00Z'),
  images: [
    { id: 1, url: 'image1', book_id: bookId },
    { id: 2, url: 'image2', book_id: bookId },
  ],
};

export const mockImages = [
  {
    id: 8,
    url: 'img8',
  },
  {
    id: 9,
    url: 'img9',
  },
];

export const bookSelect = {
  id: true,
  title: true,
  author: true,
  description: true,
  price: true,
};

// Mock data
export const mockBooks = [
  {
    id: 1,
    title: 'Book 1',
    images: [{ id: 1, url: 'image1' }],
  },
  {
    id: 2,
    title: 'Book 2',
    images: [{ id: 2, url: 'image2' }],
  },
];
