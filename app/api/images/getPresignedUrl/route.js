const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("IN ROUTE PRESIGNED GET!");
  const { searchParams } = new URL(req.url);
  const bucket = searchParams.get("bucket");
  const key = searchParams.get("key");
  const imageType = searchParams.get("imageType");
  let myKey;

  if (imageType === "template") {
    myKey = key;
  } else {
    myKey = key + "_img.svg";
  }

  // Configure AWS SDK with credentials
  const awsConfig = {
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  };
  const expirationTimeInSeconds = 3600;
  // Instantiate a new S3 client
  const client = new S3Client(awsConfig);

  try {
    // Create a presigned URL for downloading an object
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: myKey,
    });
    const presignedUrl = await getSignedUrl(client, command, {
      expiresIn: expirationTimeInSeconds,
    });

    if (presignedUrl) {
      console.log("GOT PRESIGNED URL!!!!!!!");
      console.log(presignedUrl);
      return NextResponse.json(presignedUrl, { status: 200 });
    }
  } catch (error) {
    console.log("EROOR IN PRE SIGNED");
    console.log(error);
    return NextResponse.json(
      { message: "couldnt get a presignedUrl", error },
      { status: 400 }
    );
  }
}
