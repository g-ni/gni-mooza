import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { ddbDocClient } from "@/config/ddbDocClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  try {
    const user = await ddbDocClient.query({
      TableName: process.env.NEXT_PUBLIC_TABLE_USERS,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    });

    if (user.Items.length === 0) {
      return NextResponse.json(
        { message: "user doesnt exist in dynamodb" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(user.Items[0], {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      null,
      { message: "getting user by email failed", error },
      { status: 400 }
    );
  }
}
