import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const company = searchParams.get("company");
  const furnitureType = searchParams.get("furnitureType");
  const model = searchParams.get("model");

  const key = `${company}/${furnitureType}/${model}/template_initial_info.json`;

  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },

    region: "us-east-1",
  });

  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_TEMPLATES_BUCKET,
    Key: key,
  });

  try {
    const data = await client.send(command);
    // console.log(contentList);
    if (data) {
      const parsedData = await data.Body.transformToString();
      const jsonData = JSON.parse(parsedData);

      return NextResponse.json(jsonData, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "couldnt get initial data json", error },
      { status: 400 }
    );
  }
}
