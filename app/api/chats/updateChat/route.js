import { ddbDocClient } from "../../../../config/ddbDocClient";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function PUT(req) {
  const response = await req.json();
  const { chatId, chatObj } = response;

  try {
    const chat = await ddbDocClient.get({
      TableName: process.env.NEXT_PUBLIC_TABLE_CHATS,
      Key: {
        ChatId: chatId,
      },
    });

    if (chat) {
      let chatArr = chat.Item[0].Chats;
      chatArr.push(chatObj);

      const params = {
        TableName: process.env.NEXT_PUBLIC_TABLE_CHATS,
        Key: {
          ChatId: chatId,
        },
        UpdateExpression: "SET Chats = :chatArr",
        ExpressionAttributeValues: {
          ":chatArr": chatArr,
        },
        ReturnValues: "ALL_NEW",
      };

      const updatedChat = await ddbDocClient.update(params);

      return NextResponse.json(updatedChat, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "couldnt find chat to update", error },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "couldnt update chat", error },
      { status: 400 }
    );
  }
}
