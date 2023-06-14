import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { groupFlashcardDeckValidationSchema } from 'validationSchema/group-flashcard-decks';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGroupFlashcardDecks();
    case 'POST':
      return createGroupFlashcardDeck();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGroupFlashcardDecks() {
    const data = await prisma.group_flashcard_deck
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'group_flashcard_deck'));
    return res.status(200).json(data);
  }

  async function createGroupFlashcardDeck() {
    await groupFlashcardDeckValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.group_flashcard_deck.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
