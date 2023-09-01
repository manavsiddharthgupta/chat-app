# Sendo - Your Global Chat Hub

Welcome to Sendo, Your Global Chat Hub! Sendo is an exciting project that brings people from all around the world together in real-time conversations. Whether you're looking to make new friends, learn about different cultures, or simply chat with people who share your interests, Sendo has a space for you.

## Features

Sendo offers a range of features to enhance your global chat experience:

- Real-time Chat: Chat with people from around the world in real-time.
- Chat Rooms: Explore various chat rooms, each dedicated to a specific topic or interest.
- User Profiles: Create a profile to showcase your interests and connect with like-minded individuals.
- Emojis: Express yourself with a wide range of emojis.

## Technologies

Sendo is built with the following technologies:

- React
- TypeScript
- Tailwind CSS
- ShadCn
- Apollo Client
- Node.js
- Express
- Apollo Server
- GraphQL
- PubSub along with graphql-subscriptions
- Passport.js
- Prisma
- PlanetScale

## Installation

To run Sendo locally, 

- clone the repository
```bash
git clone https://github.com/manavsiddharthgupta/sendo.git
```

- go to the project directory(backend)
```bash 
cd backend
```

- install dependencies
```bash
npm install
```

- add .env file with the following variables
```bash
DATABASE_URL=** your database url **
GOOGLE_CLIENT_ID=** your google client id **
GOOGLE_CLIENT_SECRET=** your google client secret **
JWT_SECRET=** your jwt secret **
```

- Run the migrations:
```bash
npx prisma migrate dev --name init
```

- run the server
```bash
npm run start
```

- go to the project directory(Frontend)
```bash 
cd ../frontend
```

- install dependencies
```bash
npm install
```

- run the app
```bash
npm run start
```
This is a React.js project bootstrapped with create-react-app.

Open http://localhost:3000 with your browser to see the result.

My GraphQL Playground is running at http://localhost:4000/graphql

You can start contributing to the project by creating a new branch and making a pull request.