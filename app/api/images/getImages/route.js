import { NextResponse } from "next/server";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const company = searchParams.get("company");
  const furnitureType = searchParams.get("furnitureType");
  const model = searchParams.get("model");

  const prefix = `${company}/${furnitureType}`;

  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },

    region: "us-east-1",
  });

  const command = new ListObjectsCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_TEMPLATES_BUCKET,
    Prefix: prefix,
  });

  try {
    const contentList = await client.send(command);

    if (contentList) {
      const files = contentList.Contents.filter((object) =>
        object.Key.endsWith(".svg")
      );

      return NextResponse.json(files, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "couldnt get content of templates bucket", error },
      { status: 400 }
    );
  }
}
