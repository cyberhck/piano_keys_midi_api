import {MidiHelper} from "./MidiHelper";

describe("MidiHelper", () => {
  it("should throw error when numbers are out of range", () => {
    expect(() => MidiHelper.getNote(128)).toThrow();
  });
  it("should be able to determine octave correctly", () => {
    const expectations = [
      {key: 0, expectedOctave: 0},
      {key: 1, expectedOctave: 0},
      {key: 10, expectedOctave: 0},
      {key: 11, expectedOctave: 0},
      {key: 12, expectedOctave: 1},
      {key: 13, expectedOctave: 1},
      {key: 23, expectedOctave: 1},
      {key: 24, expectedOctave: 2},
      {key: 34, expectedOctave: 2},
      {key: 35, expectedOctave: 2},
      {key: 36, expectedOctave: 3},
      {key: 46, expectedOctave: 3},
      {key: 48, expectedOctave: 4},
      {key: 59, expectedOctave: 4},
      {key: 60, expectedOctave: 5},
      {key: 71, expectedOctave: 5},
      {key: 72, expectedOctave: 6},
      {key: 83, expectedOctave: 6},
      {key: 84, expectedOctave: 7},
      {key: 95, expectedOctave: 7},
      {key: 96, expectedOctave: 8},
      {key: 107, expectedOctave: 8},
      {key: 108, expectedOctave: 9},
      {key: 119, expectedOctave: 9},
      {key: 120, expectedOctave: 10},
      {key: 127, expectedOctave: 10}
    ];
    expectations.forEach((x) => {
      expect(MidiHelper.getNote(x.key).octave).toBe(x.expectedOctave);
    });
  });
  it("should be able to determine note correctly", () => {
    const expectations = [
      {key: 0, expectedNote: "C"},
      {key: 1, expectedNote: "C#"},
      {key: 2, expectedNote: "D"},
      {key: 3, expectedNote: "D#"},
      {key: 4, expectedNote: "E"},
      {key: 5, expectedNote: "F"},
      {key: 6, expectedNote: "F#"},
      {key: 7, expectedNote: "G"},
      {key: 8, expectedNote: "G#"},
      {key: 9, expectedNote: "A"},
      {key: 10, expectedNote: "A#"},
      {key: 11, expectedNote: "B"},
      {key: 12, expectedNote: "C"},
      {key: 25, expectedNote: "C#"},
      {key: 38, expectedNote: "D"},
      {key: 51, expectedNote: "D#"},
      {key: 64, expectedNote: "E"},
      {key: 77, expectedNote: "F"},
      {key: 90, expectedNote: "F#"},
      {key: 103, expectedNote: "G"},
      {key: 116, expectedNote: "G#"},
      {key: 117, expectedNote: "A"},
      {key: 118, expectedNote: "A#"},
      {key: 119, expectedNote: "B"},
      {key: 120, expectedNote: "C"}
    ];
    expectations.forEach((x) => {
      expect(MidiHelper.getNote(x.key).note).toBe(x.expectedNote);
    });
  });
});
