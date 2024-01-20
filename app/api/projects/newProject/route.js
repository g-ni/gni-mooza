import { ddbDocClient } from "../../../../config/ddbDocClient";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  const response = await req.json();
  const {
    cutList,
    imageList,
    price,
    chatId,
    templateId,
    userId,
    projectId,
    chat,
  } = response;
  const timeStamp = new Date().toLocaleString("en-GB");
  //put request params
  const params = {
    TableName: process.env.NEXT_PUBLIC_TABLE_PROJECTS,
    Item: {
      ProjectId: projectId,
      UserId: userId,
      CreationDate: new Date().toLocaleString("en-GB"),
      ImageList: imageList,
      CutList: cutList,
      Price: price,
      ChatId: chatId,
      TemplateId: templateId,
      Chats: chat,
    },
  };

  const result = await ddbDocClient.put(params);
  if (result) {
    try {
      const project = await ddbDocClient.get({
        TableName: process.env.NEXT_PUBLIC_TABLE_PROJECTS,
        Key: {
          ProjectId: projectId,
          UserId: userId,
        },
      });

      return NextResponse.json(project.Item, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "couldnt get new project ", error },
        { status: 400 }
      );
    }
  } else {
    console.log("PROJECT NOT CREATED!!! ");

    return NextResponse.json(
      { message: "Invalid project data" },
      { status: 400 }
    );
  }
}
