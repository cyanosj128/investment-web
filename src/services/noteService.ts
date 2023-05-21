import { API } from '.';
import { Note, NewNote } from '@/models/Note';

export const NoteService = {
  async getAllNotes() {
    try {
      return (await API.get<Note[]>('/note')).data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
  async postNewNote(newNote: NewNote) {
    try {
      const resp = await API.post('/note', newNote);
      return resp;
    } catch (err) {
      console.log(err);
    }
  },
};
