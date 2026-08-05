# Editing lessons

You do **not** need to know React to change lesson content. Everything a teacher
would want to change lives in this folder.

```
content/
  modules/          one file per lesson, numbered in teaching order
  dictionary.json   the Indian Sign Language money glossary
```

## Changing a lesson

Open the file for the lesson, for example `modules/01-what-is-money.json`.
Each lesson has three versions, one per age group: `"7-9"`, `"10-12"`, `"13-15"`.

```jsonc
"7-9": {
  "title": "What is money?",
  "video": {
    "src": "https://.../placeholder.mp4",   // <- put your real video URL here
    "poster": "https://.../placeholder.jpg",// <- the picture shown before playing
    "durationLabel": "3 minutes",
    "captions": [
      { "src": "/captions/placeholder-en.vtt", "label": "English", "srclang": "en", "default": true }
    ],
    "signInterpreter": {
      "src": null,        // <- URL of the small ISL interpreter video, when you have it
      "language": "isl"
    }
  },
  "summary": [ "One short sentence.", "Another short sentence." ],
  "keyWords": ["money", "coin"],
  "quiz": { ... }
}
```

### Rules for writing summary sentences

1. One idea per sentence. Aim for 12 words or fewer.
2. No idioms and no metaphors. Write "spend all your money", not "break the bank".
3. Use the rupee symbol `₹` and amounts a child would recognise.
4. Prefer nouns over pronouns. Write "the shop", not "it".

### Quiz questions

A question needs a picture, two to four picture answers, and the index of the
correct one (counting from 0).

```jsonc
{
  "id": "q1",
  "prompt": "Which one is money?",          // keep under 8 words
  "image": { "icon": "wallet", "alt": "An open wallet" },
  "options": [
    { "icon": "coin",  "label": "Coin" },
    { "icon": "toy",   "label": "Toy car" }
  ],
  "correctIndex": 0,
  "hint": "Money is what you give the shop."   // shown after a wrong answer
}
```

`icon` must be a name from `src/components/icons/ConceptIcon.jsx`. Open that file
to see the full list of available pictures. If you need a new picture, ask a
developer to add it - do not invent a name, or the answer will show a blank box.

## Adding a new lesson

1. Copy any file in `modules/` and give it the next number.
2. Change `"id"` to something short, lowercase and hyphenated. It becomes part
   of the web address, so it must be unique.
3. Set `"order"` to the position you want it to appear in on the journey map.
4. Add the file to the list at the top of `content/index.js`.
