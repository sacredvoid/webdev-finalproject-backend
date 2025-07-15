# MapVerse Backend

MapVerse is a web application that allows users to discover and participate in events happening around them. This repository contains the backend codebase built with Node.js, Express.js, and MongoDB.

## Project Overview

The MapVerse backend provides a RESTful API and handles core functionalities such as:

- **User Management**: Supports different user roles with varying levels of access:
  - **Admin Users**: Have full 'view', 'create', 'attend', and 'modify' privileges. Can perform all CRUD operations on data.
  - **Registered Users**: Have 'view', 'create', and 'attend' privileges. Can view data, create new events, and register for events.
  - **Guest Users**: Have limited 'view' privileges to access public event data.
- **Event Management**: Provides CRUD operations for managing event data with the following key properties:
  - Event name, start/end dates, location (venue, address, coordinates)
  - Description, published status, reservation requirements 
  - Tags, images, host details (name, email)
  - Text search indexes for efficient searches
- **File Upload/Download**: Ability to upload and download files (e.g., event images, documents) using Firebase Storage integration.
- **Authentication**: Secure authentication and authorization mechanisms.

## Technologies Used

- **Node.js** and **Express.js** for the web server and API
- **MongoDB** and **Mongoose** for the database and object data modeling (ODM)
- **Firebase** and **Firebase Admin SDK** for file storage and management
- **express-session** for handling user sessions
- **cors** for Cross-Origin Resource Sharing (CORS) support
- **multer** and **multer-firebase-storage** for file upload handling

## Project Structure

The main components of the project are organized as follows:

- **app.js**: Entry point of the application, sets up Express server and connects to the database.
- **controllers/**: Contains route handlers for different features (user, event, file, auth).
- **mongo_db/models/**: Defines the data models using Mongoose schemas.
  - **event-models/event-model.js**: Schema for event data.
  - **user-models/**: Schemas for different user types (admin, guest, registered, organization).
- **mongo_db/daos/**: Data access objects (DAOs) for interacting with the database.
- **mongo_db/schemas/**: Mongoose schemas for data validation.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (v4 or later)
- Firebase account (for file storage)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sacredvoid/webdev-finalproject-backend.git
```

2. Install dependencies:

```bash
cd webdev-finalproject-backend
npm install
```

3. Set up environment variables:

Create a `.env` file in the project root with the following variables:

```
MONGODB_URI=<your_mongodb_uri>
FIREBASE_PROJECT_ID=<your_firebase_project_id>
FIREBASE_PRIVATE_KEY=<your_firebase_private_key>
FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
```

4. Start the server:

```bash
npm start
```

The server will start running on `http://localhost:4000`.

## License

This project is licensed under the [MIT License]().
