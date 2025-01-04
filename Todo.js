import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";

// Get data from localStorage
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  return lists ? JSON.parse(lists) : [];
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState(null);
  const [toggleButton, setToggleButton] = useState(false);

  // Add or Edit an Item
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data");
    } else if (toggleButton && isEditItem) {
      // Handle edit mode
      setItems(
        items.map((curElem) =>
          curElem.id === isEditItem ? { ...curElem, name: inputdata } : curElem
        )
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      // Handle add mode
      const newItem = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, newItem]);
      setInputData("");
    }
  };

  // Edit the Item
  const editItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setInputData(itemToEdit.name);
      setIsEditItem(id);
      setToggleButton(true);
    }
  };

  // Delete an Item
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  // Remove All Items
  const removeAll = () => {
    setItems([]);
  };

  // Persist data in localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo logo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>

          {/* Input Section */}
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i
                className="far fa-edit add-btn"
                onClick={addItem}
                title="Edit Item"
              ></i>
            ) : (
              <i
                className="fa fa-plus add-btn"
                onClick={addItem}
                title="Add Item"
              ></i>
            )}
          </div>

          {/* Show To-Do Items */}
          <div className="showItems">
            {items.map((curElem) => (
              <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(curElem.id)}
                    title="Edit"
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(curElem.id)}
                    title="Delete"
                  ></i>
                </div>
              </div>
            ))}
          </div>

          {/* Remove All Button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
