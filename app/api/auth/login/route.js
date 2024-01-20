import { ddbDocClient } from "../../../../config/ddbDocClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {

  const response = await req.json();
  const { email, password } = response;
  const user = await ddbDocClient.query({
    TableName: process.env.NEXT_PUBLIC_TABLE_USERS,
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  });

  if (user && (await bcrypt.compare(password, user.Items[0].password))) {
    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Wrong email or password!" },
      { status: 400 }
    );
  }
}
