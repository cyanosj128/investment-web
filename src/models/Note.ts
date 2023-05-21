export interface Note {
  id: number;
  startAt: number;
  endAt: number;
  description: string;
  title: string;
}

export type NewNote = Omit<Note, 'id'>;
