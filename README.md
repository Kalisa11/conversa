
# Conversa messenger

## Description
Conversa allows users to chat with each other in real-time and exchange messages, images, and more. This document will guide you through the setup, installation, and usage of the app.


## Features

- User authentication and registration
- Sending text messages and images
- Group chat
- Real-time messaging
- Emojis and stickers support
- User online status indication
- Message read receipts


## Installation
Follow the instructions below to set up the Messenger app locally on your machine.

### Prerequisites
Before you start, make sure you have the following installed:

- Node.js (version 18 or above)
- npm or yarn
- MongoDB (or you can use MongoDB Atlas or any other cloud-based MongoDB service)
- API testing tool such as Postman or Insomnia (optional)

### Local installation

1. Clone the repo

```bash
git clone https://github.com/Kalisa11/conversa.git
cd conversa
```

2. Install the dependencies
```bash
npm install
# or
yarn install
```

3. Configure Environment Variables:
```bash
DATABASE_URL=
NEXTAUTH_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

```
4. Start the development server
```bash
npm run dev
# or
yarn dev

```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`
`NEXTAUTH_SECRET`
`NEXT_PUBLIC_PUSHER_APP_KEY`
`PUSHER_APP_ID`
`PUSHER_SECRET`
`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
`GITHUB_ID`
`GITHUB_SECRET`
`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`


## Tech Stack

**Front end:** TailwindCSS, Next.js 13, Headless UI

**Backend:** MongoDB, Prisma, Axios, Pusher-js

**Authentication:** NextAuth

**State management:** Zustand


## Authors

- [Kalisa H](https://github.com/honorekalisa)
