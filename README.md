# Book CRUD Operations API

Welcome to the Book CRUD Operations API documentation. This API allows you to manage books and their information using Prisma and PostgreSQL. Below are the steps to set up, run, and test the API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

# Prerequisites

- Nestjs 
- PostgreSQL database

#Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IgnatiusFrancis/BookCollection.git
   cd BookCollection
   cd books

   #Install dependencies:
   npm install
   
# Configuration

Create a .env file in the root directory and configure the following environment variables:
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# Usage
# Starting the Server
To start the API server, run the following command:
npm start or npm run start

The API will be accessible at http://localhost:6000.


# api-endpoints
 Create a Book

    URL: /books
Method: Post
Response: For more details, please refer to the API documentation at the following URL:
[API Documentation](https://www.postman.com/ignatiusfrancis/workspace/book-collection-api/collection/19595090-1634b028-85e2-4b8f-aa51-f20538897a5c?action=share&creator=19595090)


Get All Books

   URL: /books
Method: GET
Response: For more details, please refer to the API documentation at the following URL:
[API Documentation](https://www.postman.com/ignatiusfrancis/workspace/book-collection-api/collection/19595090-1634b028-85e2-4b8f-aa51-f20538897a5c?action=share&creator=19595090)

 Get a Book by ID

    URL: /books/:id
Method: GET
Response: For more details, please refer to the API documentation at the following URL:
[API Documentation](https://www.postman.com/ignatiusfrancis/workspace/book-collection-api/collection/19595090-1634b028-85e2-4b8f-aa51-f20538897a5c?action=share&creator=19595090)


 Update a Book

    URL: /books/:id
    Method: PUT
Response: For more details, please refer to the API documentation at the following URL:
[API Documentation](https://www.postman.com/ignatiusfrancis/workspace/book-collection-api/collection/19595090-1634b028-85e2-4b8f-aa51-f20538897a5c?action=share&creator=19595090)

 Delete a Book

    URL: /books/:id
    Method: DELETE
Response: For more details, please refer to the API documentation at the following URL:
[API Documentation](https://www.postman.com/ignatiusfrancis/workspace/book-collection-api/collection/19595090-1634b028-85e2-4b8f-aa51-f20538897a5c?action=share&creator=19595090)

    Response: Detailed response information is available in the [View API Documentation](https://www.postman.com/ignatiusfrancis/workspace/book-collection-api/collection/19595090-1634b028-85e2-4b8f-aa51-f20538897a5c?action=share&creator=19595090)
.

