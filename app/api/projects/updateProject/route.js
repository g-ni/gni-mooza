import { ddbDocClient } from "../../../../config/ddbDocClient";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function PUT(req) {
  const response = await req.json();
  const { cutList, imageList, price, projectId, userId, chat } = response;

  const timeStamp = new Date().toLocaleString("en-GB");
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
      let cutListArr = project.Item.CutList;
      if (cutList !== null) {
        cutListArr.push({ value: cutList, timeStamp });
      }
      let priceArr = project.Item.Price;
      if (price !== null) {
        priceArr.push({ value: price, timeStamp });
      }

      let imageListArr = project.Item.ImageList;
      if (imageList !== null) {
        imageListArr.push({ value: imageList, timeStamp });
      }

      const params = {
        TableName: process.env.NEXT_PUBLIC_TABLE_PROJECTS,
        Key: {
          ProjectId: projectId,
          UserId: userId,
        },
        UpdateExpression:
          "SET CutList = :cutListArr, ImageList = :imageListArr, Price = :priceArr, Chats = :chatArr",
        ExpressionAttributeValues: {
          ":cutListArr": cutListArr,
          ":imageListArr": imageListArr,
          ":priceArr": priceArr,
          ":chatArr": chatArr,
        },
        ReturnValues: "ALL_NEW",
      };

      const updatedProject = await ddbDocClient.update(params);

      return NextResponse.json(updatedProject.Attributes, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "couldnt find project" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "couldnt update project", error },
      { status: 400 }
    );
  }
}
