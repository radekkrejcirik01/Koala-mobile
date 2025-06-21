export interface QuestionInterface {
  id: number;
  message: string;
  isDefault?: boolean;
}

export const QUESTIONS: QuestionInterface[] = [
  { id: 1, message: 'How is it going today?', isDefault: true },
  { id: 2, message: 'How was school today?', isDefault: true },
  { id: 3, message: 'How was it at work today?', isDefault: true }
];
