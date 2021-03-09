import uuid from "react-uuid";

export const startData = () => [
  {
    id: uuid(),
    title: "Done",
    cards: [
      {
        id: uuid(),
        task: "Eat lunch",
        description: "",
        items: [],
      },
      {
        id: uuid(),
        task: "Go to gym",
        description: "",
        items: [],
      },
    ],
  },

  {
    id: uuid(),
    title: "To Do",
    cards: [
      {
        id: uuid(),
        task: "Walk the dog",
        description: "",
        items: [],
      },
    ],
  },
];
