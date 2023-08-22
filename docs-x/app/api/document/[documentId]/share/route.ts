import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams {
  documentId: string;
}

export async function POST(
  request: Request,
  { params }: { params: Iparams }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const documentId = params.documentId;
    console.log(body);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { members, everyOne } = body;

    const existingDocument = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });

    // Fetch existing collaborators for the document
    const existingCollaborators = await prisma.collaborator.findMany({
      where: {
        documentId: documentId,
      },
    });

    // Filter out existing collaborators from the members
    const newMembers = members.filter(
      (member: any) =>
        !existingCollaborators.some(
          (collab) => collab.userId === member?.value
        )
    );

    // Create new collaborators for the filtered members
    const collabPromises = newMembers.map(async (member: any) => {
      const newCollab = await prisma.collaborator.create({
        data: {
          userId: member?.value,
          documentId: documentId,
        },
      });
      return newCollab;
    });

    const colabs = await Promise.all(collabPromises);

    const updatedDocument = await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        collabUsers: {
          connect: colabs.map((colab) => ({
            id: colab.id,
          })),
        },
      },
    });

    if (!updatedDocument) {
      return new NextResponse('error sharing document', { status: 404 });
    }

    return  NextResponse.json(updatedDocument);
  } catch (error: any) {
    console.log("Error while sharing document: ", error);
    return new NextResponse('Internal error while sharing the Document', { status: 500 });
  }
}
