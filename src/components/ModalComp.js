import React, { useState, useContext, useEffect } from "react";
import { ListContext } from "../context/Context";
import uuid from "react-uuid";
import {
  Add,
  CheckCircleOutline,
  Cancel,
  Subtitles,
  Toc,
} from "@material-ui/icons";
import { Button, TextField } from "@material-ui/core";
import Item from "./Item";
import "./ModalComp.css";

export default function ModalComp({
  task,
  id,
  listId,
  handleModal,
  title,
  handleDesc,
  description,
}) {
  const [listState, setListState] = useContext(ListContext);

  //find the list, then the card, then display the items
  const stateItems = listState
    .find((list) => list.id === listId)
    .cards.find((card) => card.id === id).items;

  const [items, setItems] = useState(stateItems);
  const [itemText, setItemText] = useState("");
  const [desc, setDesc] = useState("");
  const descState = description ? false : true;
  const [editDesc, setEditDesc] = useState(descState);
  const [hidden, setHidden] = useState(false);

  //functions
  const closeModal = () => {
    handleModal();
  };

  const handleChange = (e) => {
    setItemText(e.target.value);
  };

  useEffect(() => {
    const newState = listState.map((list) => {
      if (list.id === listId) {
        const updated = list.cards.map((card) => {
          if (card.id === id) {
            return {
              ...card,
              items: [...items],
            };
          } else {
            return card;
          }
        });
        return {
          ...list,
          cards: [...updated],
        };
      } else {
        return list;
      }
    });
    setListState(newState);
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemText === "") {
      return;
    } else {
      setItems((prev) => [
        ...prev,
        {
          task: itemText,
          finished: false,
          id: uuid(),
        },
      ]);
      setItemText("");
    }
  };

  const handleChecked = (id) => {
    setHidden(false);
    const updated = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          finished: !item.finished,
        };
      } else {
        return item;
      }
    });
    setItems(updated);
    console.log(stateItems);
  };

  const handleDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  };

  const handleEditSubmit = (id, e, editValue) => {
    e.preventDefault();
    if (editValue === "") {
      return;
    } else {
      const updated = items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            task: editValue,
          };
        } else {
          return item;
        }
      });
      setItems(updated);
    }
  };

  const handleDescription = (e) => {
    e.preventDefault();
    if (desc === "") {
      return;
    } else {
      handleDesc(desc);
      setDesc("");
      setEditDesc(false);
    }
  };

  const changeDesc = (e) => {
    setDesc(e.target.value);
  };

  return (
    <div className="ModalComp">
      <Cancel className="cancel-icon" onClick={closeModal} />
      <div className="flex-center">
        <Subtitles />
        <h2>{task}</h2>
      </div>
      <h4>
        In list <span>{title}</span>{" "}
      </h4>
      <div className="flex-center">
        <Toc />
        <h3>Description</h3>
      </div>

      {editDesc ? (
        <div>
          {/* <input
            type="text"
            className="input"
            onChange={changeDesc}
            value={desc}
            placeholder="Add a more detailed description..."
          ></input> */}
          <TextField
            className="desc-textfield"
            onChange={changeDesc}
            value={desc}
            placeholder="Add a more detailed description..."
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="outlined"
          />
          <Button
            className="btn-green"
            onClick={handleDescription}
            variant="contained"
          >
            Save
          </Button>
        </div>
      ) : (
        <p onClick={() => setEditDesc(true)} className="desc">
          {description}
        </p>
      )}

      <div className="item-container">
        <div className="flex-center">
          <CheckCircleOutline />
          <p style={{ marginLeft: 10 }}>Checklist</p>
        </div>
        <Button variant="contained" onClick={() => setHidden(!hidden)}>
          Hide completed items
        </Button>
      </div>
      {stateItems.map((item) => (
        <Item
          item={item}
          key={item.id}
          handleEditSubmit={handleEditSubmit}
          handleChecked={handleChecked}
          handleDelete={handleDelete}
          hidden={hidden}
        />
      ))}
      <form className="flex-center" onSubmit={handleSubmit}>
        <Add />
        {/* <input
          style={styles.input}
          type="text"
          placeholder="Add task"
          value={itemText}
          onChange={handleChange}
        /> */}
        <TextField
          className="modal-input"
          type="text"
          placeholder="Add task"
          value={itemText}
          onChange={handleChange}
          id="outlined-basic"
          label="Add task"
          variant="outlined"
        />
      </form>
    </div>
  );
}
