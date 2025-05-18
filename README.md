# Tamper-proof chat - integrity assurance with ECDSA in every messages.

A simple chat app with basic authentication and digital signatures.

## Getting Started

First, prepare the `env` file, see example at [`.env.example`]("./.env.example"):

Then run the development environment with

```bash
docker compose --profile dev up [--build]
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses the following tech stack
* Node.js + npm
* Next.js
* Socket.IO + express
* MongoDB + Prisma ODM
* Docker (for dev environment and deployment)

## Caveat
Current implementation creates and stores users' private keys in the client's (browser) Origin private file system (OPFS), and has not implemented any method to extract the private key if needed. User can only send message from a single client (that allows OPFS, incognito/private browser will not work!), but user can login from other clients to read the messages.
