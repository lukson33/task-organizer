import React, { useState, useContext } from "react";
import { Delete } from "@material-ui/icons";
import "./Item.css";

export default function Item({
  item,
  handleEditSubmit,
  handleChecked,
  handleDelete,
  hidden,
}) {
  const { task, finished, id } = item;

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const handleEdit = () => {
    setEditing(!editing);
  };

  const itemChange = (e) => {
    setEditValue(e.target.value);
  };

  const itemSubmit = (e) => {
    e.preventDefault();
    handleEditSubmit(id, e, editValue);
    setEditing(!editing);
  };

  const itemCheck = () => {
    handleChecked(id);
  };

  const itemDelete = () => {
    handleDelete(id);
  };

  const isHidden = (finished) => {
    if (hidden && finished === true) {
      return "none";
    } else if (hidden && finished === false) {
      return "block";
    } else {
      return;
    }
  };

  return (
    <div style={{ display: isHidden(finished) }}>
      {editing ? (
        <form onSubmit={itemSubmit}>
          <input
            className="item-input"
            type="text"
            placeholder={task}
            onChange={itemChange}
          />
        </form>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <input type="checkbox" checked={finished} onChange={itemCheck} />
            <h3
              className="hover"
              style={{
                textDecoration: finished ? "line-through" : null,
                marginLeft: 10,
              }}
              onClick={handleEdit}
            >
              {task}
            </h3>
          </div>
          <Delete style={{ cursor: "pointer" }} onClick={itemDelete}>
            Delete
          </Delete>
        </div>
      )}
    </div>
  );
}
