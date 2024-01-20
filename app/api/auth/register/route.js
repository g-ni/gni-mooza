import { ddbDocClient } from "../../../../config/ddbDocClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req) {
  const res = await req.json();
  const { email, password } = res;
  if (!email || !password) {
    return NextResponse.json(
      { message: "Please fill in all the fields" },
      { status: 400 }
    );
  }

  const existingUser = await ddbDocClient.query({
    TableName: process.env.NEXT_PUBLIC_TABLE_USERS,
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  });

  if (existingUser.Count) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 208 }
    );
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //put request params
  const params = {
    TableName: process.env.NEXT_PUBLIC_TABLE_USERS,
    Item: {
      UserId: uuidv4(),
      CreationDate: new Date().toLocaleString(),
      userType: "",
      name: "",
      email: email,
      password: hashedPassword,
      tier: "",
      mobileNumber: "",
      location: "",
    },
  };
  const user = await ddbDocClient.put(params);
  if (user.$metadata.httpStatusCode === 200) {
    const createdUser = await ddbDocClient.query({
      TableName: process.env.NEXT_PUBLIC_TABLE_USERS,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    });
    if (createdUser.Items[0]) {
      return NextResponse.json(
        {
          userId: createdUser.Items[0].UserId,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "error in query function" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid user data" }, { status: 400 });
  }
}
