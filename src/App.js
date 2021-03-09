import React, { useState, useContext } from "react";
import { ListContext } from "./context/Context";
import "./App.css";
import List from "./components/List";
import uuid from "react-uuid";
import { Button, TextField } from "@material-ui/core";

function App() {
  const [listState, setListState] = useContext(ListContext);
  const [listTitle, setListTitle] = useState("");
  const [editing, setEditing] = useState(false);

  const handleAddList = () => {
    setListState((prevState) => [
      ...prevState,
      {
        id: uuid(),
        title: listTitle,
        cards: [],
      },
    ]);
    setEditing(!editing);
    setListTitle("");
  };

  const handleChange = (e) => {
    setListTitle(e.target.value);
  };

  return (
    <div className="App">
      <div className="list-container">
        {listState.map((list) => (
          <List
            title={list.title}
            cards={list.cards}
            id={list.id}
            key={list.id}
          />
        ))}
        <div>
          {editing ? (
            <div>
              <form onSubmit={handleAddList}>
                {/* <input
                  type="text"
                  placeholder="Add new list"
                  value={listTitle}
                  onChange={handleChange}
                /> */}
                <TextField
                  type="text"
                  placeholder="Add new list"
                  value={listTitle}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Add new list"
                  variant="outlined"
                />
                <Button
                  onClick={handleAddList}
                  className="btn-addList"
                  variant="contained"
                  color="primary"
                >
                  Add a new list
                </Button>
              </form>
            </div>
          ) : (
            <Button variant="outlined" onClick={() => setEditing(!editing)}>
              Add another list
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
