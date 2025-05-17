import { ChatroomModel, PublicUserModel } from "@/models/Chatroom";
import { ChatPageModel, MessageModel } from "@/models/Message";
import { UserModel } from "@/models/User";

type message = {
    senderUsername: string;
    receiverUsername: string;
    message: string;
    sentAt: Date;
    messageHash: string;
    signature: {
        r: string;
        s: string;
    };
};

function transformMessage(pageId: string, message: message, index: number): MessageModel {
    return {
        id: `${pageId}-${index}`,
        senderUsername: message.senderUsername,
        receiverUsername: message.receiverUsername,
        message: message.message,
        sentAt: message.sentAt,
        messageHash: message.messageHash,
        signature: message.signature
    };
};

export function transformMessages(pageId: string, message: message[]): MessageModel[] {
    return message.map(transformMessage.bind(null, pageId));
};

export function transformPublicMember(user: UserModel): PublicUserModel {
    return {
        username: user.username,
        publicKey: user.publicKey
    };
};


type SimplePageModel = {
    id: string,
    chatroomId: string,
    messages: Omit<MessageModel, "id">[]
}

export function joinChatroomWithLastMessages(chatrooms: ChatroomModel[], lastPages: SimplePageModel[]): ChatroomModel[] {
    const chatroomMap: { [id: string]: number } = {}
    chatrooms.forEach((chatroom, index) => {
        chatroomMap[chatroom.id] = index
    })
    lastPages.forEach((page) => {
        const lastMessageIndex = page.messages.length
        const chatroomIndex = chatroomMap[page.chatroomId]
        chatrooms[chatroomIndex].lastMessage = transformMessage(
            page.id,
            page.messages[lastMessageIndex],
            lastMessageIndex
        )
    })
    return chatrooms
}