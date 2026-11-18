// Width and height of each prepared photo in public/photos/family (needed so the page never shifts while images load).
// The low-resolution originals (640 px wide) are listed as they are: the page shows them small instead of stretching them.
export const photoSize = {
  hero: [1600, 1200],
  "mom-1": [1600, 1200], "mom-2": [1200, 1600],
  "dad-1": [640, 480], "dad-2": [1600, 1200],
  "sister-1": [640, 480], "sister-2": [1600, 1200],
  "brother-1": [1600, 1200], "brother-2": [1600, 1200],
  "grow-1": [1600, 1200], "grow-2": [1600, 1200], "grow-3": [1600, 1200], "grow-4": [640, 480], "grow-5": [1600, 1200], "grow-6": [1600, 1200],
  "leave-1": [640, 480], "leave-2": [640, 480], "leave-3": [1200, 1600], "leave-4": [1280, 960], "leave-5": [960, 1280],
  "more-1": [1600, 1200], "more-2": [640, 480], "more-3": [1600, 1200], "more-4": [1600, 1200], "more-5": [1200, 1600],
} as const;

export type PhotoId = keyof typeof photoSize;
// Every photo except the hero has a caption (the hero has alt text), so the dictionary is checked against this.
export type CaptionId = Exclude<PhotoId, "hero">;
