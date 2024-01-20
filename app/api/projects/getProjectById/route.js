import { ddbDocClient } from "../../../../config/ddbDocClient";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const userId = searchParams.get("userId");

  try {
    const project = await ddbDocClient.get({
      TableName: process.env.NEXT_PUBLIC_TABLE_PROJECTS,
      Key: {
        ProjectId: projectId,
        UserId: userId,
      },
    });

    if (project) {
      return NextResponse.json(project.Item, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "couldnt find project by id", error },
      { status: 400 }
    );
  }
}
