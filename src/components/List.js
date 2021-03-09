import React, { useState, useContext } from "react";
import uuid from "react-uuid";
import { ListContext } from "../context/Context";
import Card from "./Card";
import Modal from "react-modal";
import { Delete } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import "./List.css";

export default function List({ title, cards, id }) {
  const [inputText, setInputText] = useState("");
  const [listState, setListState] = useContext(ListContext);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputText === "") {
      return;
    } else {
      const newState = listState.map((list) => {
        if (list.id === id) {
          return {
            ...list,
            cards: [
              ...list.cards,
              {
                id: uuid(),
                task: inputText,
                description: "",
                items: [],
              },
            ],
          };
        } else {
          return list;
        }
      });
      setListState(newState);
      //clear input
      setInputText("");
    }
  };

  const handleDelete = () => {
    const newState = listState.filter((list) => list.id !== id);
    setListState(newState);
  };

  return (
    <div className="List">
      <Delete className="delete-list" onClick={handleDelete} fontSize="small" />
      <h2>{title}</h2>
      {cards.map((card) => (
        <div>
          <Card
            task={card.task}
            done={card.done}
            id={card.id}
            key={card.id}
            listId={id}
            title={title}
            description={card.description}
          />
        </div>
      ))}
      <form onSubmit={handleAdd} className="form-center">
        {/* <Add style={{ color: "#fff" }} /> */}
        {/* <input
          type={inputText}
          placeholder="Add another card"
          value={inputText}
          onChange={handleChange}
          style={styles.input}
        /> */}
        <TextField
          className="text-field"
          type="text"
          placeholder="Add card"
          value={inputText}
          onChange={handleChange}
          id="outlined-basic"
          label={cards.length > 0 ? "Add another card" : "Add first card"}
          variant="outlined"
        />
      </form>

      <Modal>
        <h2>Modal</h2>
      </Modal>
    </div>
  );
}
