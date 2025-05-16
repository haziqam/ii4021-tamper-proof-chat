import { Schema, Types, model } from 'mongoose';

interface IUser {
    username: String;
    password: String;
    publicKey: String;
    chatrooms: Types.ObjectId[];
}

interface IChatroom {
    users: Types.ObjectId[];
    messages: Types.ObjectId[];
}

interface IMessages {
    messages: IMessage[];
}

interface IMessage {
message: String;
hash: String;
signature: String;
sentAt: Date;
readAt: Date;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    publicKey: { type: String, required: true },
    chatrooms: [{ type: Schema.Types.ObjectId, ref: 'Chatroom' }]
});

// const chatroomSchema = new Schema<IChatroom>({
//   users   : [{ type: Schema.Types.ObjectId, ref: 'User' }]
//   messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }]
// })

// const messagesSchema = new Schema<Imessages> ({
    
// })

// const messageSchema = new Schema<IMessage> ({
//   id         String @id @default (auto()) @map("_id") @db.ObjectId
//   message    String
//   hash       String
//   signature  String
//   sentAt     DateTime
//   readAt     DateTime
//   Chatroom   Chatroom ? @relation(fields: [chatroomId], references: [id])
//   chatroomId String ? @db.ObjectId
// })

export const User = model<IUser>('User', userSchema)