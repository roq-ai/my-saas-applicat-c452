import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { groupFlashcardDeckValidationSchema } from 'validationSchema/group-flashcard-decks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.group_flashcard_deck
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getGroupFlashcardDeckById();
    case 'PUT':
      return updateGroupFlashcardDeckById();
    case 'DELETE':
      return deleteGroupFlashcardDeckById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGroupFlashcardDeckById() {
    const data = await prisma.group_flashcard_deck.findFirst(
      convertQueryToPrismaUtil(req.query, 'group_flashcard_deck'),
    );
    return res.status(200).json(data);
  }

  async function updateGroupFlashcardDeckById() {
    await groupFlashcardDeckValidationSchema.validate(req.body);
    const data = await prisma.group_flashcard_deck.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteGroupFlashcardDeckById() {
    const data = await prisma.group_flashcard_deck.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
