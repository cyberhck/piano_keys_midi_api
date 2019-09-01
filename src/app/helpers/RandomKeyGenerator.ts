import {TNote} from "./MidiHelper";

export const RandomKeyGenerator = (notes: TNote[]) => {
  const randomIndex = Math.floor(Math.random() * 100) % notes.length;
  return notes[randomIndex];
};
