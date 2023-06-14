const mapping: Record<string, string> = {
  'flashcard-decks': 'flashcard_deck',
  groups: 'group',
  'group-flashcard-decks': 'group_flashcard_deck',
  'group-members': 'group_member',
  pdfs: 'pdf',
  schedules: 'schedule',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
