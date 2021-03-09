import React, { useState, useContext } from "react";
import { ListContext } from "../context/Context";
import Modal from "react-modal";
import ModalComp from "./ModalComp";
import { Delete, Edit } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import "./Card.css";
Modal.setAppElement("*"); // suppresses modal-related test warnings.

export default function Card({ task, id, listId, title, description }) {
  const [listState, setListState] = useContext(ListContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    const newState = listState.map((list) => {
      if (list.id === listId) {
        const newCards = list.cards.filter((card) => card.id !== id);
        return {
          ...list,
          cards: newCards,
        };
      } else {
        return list;
      }
    });
    setListState(newState);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleUpdate = () => {
    if (newTask === "") {
      setIsEditing(!isEditing);
    } else {
      const newState = listState.map((list) => {
        if (list.id === listId) {
          const updated = list.cards.map((card) => {
            if (card.id === id) {
              return {
                ...card,
                task: newTask,
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
      setNewTask("");
      setIsEditing(false);
    }
  };

  const handleDesc = (desc) => {
    if (desc === "") {
      return;
    } else {
      const newState = listState.map((list) => {
        if (list.id === listId) {
          const updated = list.cards.map((card) => {
            if (card.id === id) {
              return {
                ...card,
                description: desc,
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
    }
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="Card">
      {isEditing ? (
        <div>
          <form onSubmit={handleUpdate} className="margin-left">
            {/* <input
              type="text"
              placeholder="Edit todo..."
              onChange={handleChange}
              value={newTask}
            /> */}
            <TextField
              type="text"
              placeholder="Edit todo"
              value={newTask}
              onChange={handleChange}
              id="outlined-basic"
              label="Edit todo..."
              variant="outlined"
            />
            {/* <button>Update</button> */}
          </form>
        </div>
      ) : (
        <p className="margin-left" onClick={handleModal}>
          {task}
        </p>
      )}

      <div className="card-container">
        <Delete className="card-icon" onClick={handleDelete} fontSize="small">
          Delete task
        </Delete>
        <Edit className="card-icon" onClick={handleEdit} fontSize="small">
          Edit task
        </Edit>
      </div>

      <Modal
        isOpen={modalOpen}
        style={{
          content: {
            margin: "0 auto",
            width: "700px",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Roboto",
          },
          overlay: {
            zIndex: 100,
          },
        }}
      >
        <ModalComp
          task={task}
          description={description}
          handleModal={handleModal}
          handleDesc={handleDesc}
          id={id}
          listId={listId}
          title={title}
        />
      </Modal>
    </div>
  );
}
