import { ddbDocClient } from "../../../../config/ddbDocClient";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  const response = await req.json();
  const { chatId, projectId, userId, chats } = response;

  const params = {
    TableName: process.env.NEXT_PUBLIC_TABLE_CHATS,
    Item: {
      ChatId: chatId,
      ProjectId: projectId,
      UserId: userId,
      CreationDate: new Date().toLocaleDateString("en-GB"),
      Chats: chats,
    },
  };

  try {
    const chat = await ddbDocClient.put(params);

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "couldnt update project", error },
      { status: 400 }
    );
  }
}
