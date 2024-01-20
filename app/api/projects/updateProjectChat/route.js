import { ddbDocClient } from "../../../../config/ddbDocClient";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function PUT(req) {
  const response = await req.json();
  const { userId, projectId, chat } = response;

  try {
    const project = await ddbDocClient.get({
      TableName: process.env.NEXT_PUBLIC_TABLE_PROJECTS,
      Key: {
        ProjectId: projectId,
        UserId: userId,
      },
    });

    if (project) {
      const prevChatArr = project.Item.Chats;
      const chatArr = prevChatArr.concat(chat);

      const params = {
        TableName: process.env.NEXT_PUBLIC_TABLE_PROJECTS,
        Key: {
          ProjectId: projectId,
          UserId: userId,
        },
        UpdateExpression: "SET Chats = :chatArr",
        ExpressionAttributeValues: {
          ":chatArr": chatArr,
        },
        ReturnValues: "ALL_NEW",
      };

      try {
        const updatedChat = await ddbDocClient.update(params);

        return NextResponse.json(updatedChat.Attributes, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { message: "couldnt update project", error },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "couldnt find project" },
      { status: 400 }
    );
  }
}
