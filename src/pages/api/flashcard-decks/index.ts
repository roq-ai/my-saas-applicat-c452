import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { flashcardDeckValidationSchema } from 'validationSchema/flashcard-decks';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFlashcardDecks();
    case 'POST':
      return createFlashcardDeck();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFlashcardDecks() {
    const data = await prisma.flashcard_deck
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'flashcard_deck'));
    return res.status(200).json(data);
  }

  async function createFlashcardDeck() {
    await flashcardDeckValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.group_flashcard_deck?.length > 0) {
      const create_group_flashcard_deck = body.group_flashcard_deck;
      body.group_flashcard_deck = {
        create: create_group_flashcard_deck,
      };
    } else {
      delete body.group_flashcard_deck;
    }
    const data = await prisma.flashcard_deck.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
