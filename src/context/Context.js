import React, { useState, createContext } from "react";
import { startData } from "../startData";

export const ListContext = React.createContext();

export const ListProvider = (props) => {
  //set cart context
  const [listState, setListState] = useState(startData);
  return (
    <ListContext.Provider value={[listState, setListState]}>
      {props.children}
    </ListContext.Provider>
  );
};
