import { ddbDocClient } from "../../../../config/ddbDocClient";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_PROJECTS,
      FilterExpression: "UserId = :sortKeyValue",
      ExpressionAttributeValues: {
        ":sortKeyValue": userId,
      },
    };

    const projects = await ddbDocClient.scan(params);
    if (projects) {
      return NextResponse.json(projects.Items, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "couldnt get projects by user", error },
      { status: 400 }
    );
  }
}
