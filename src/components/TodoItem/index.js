import { useState } from "react";

export const TodoItem = ({
  item,
  dropdownOptions,
  dropdownValues,
  setDropdownValues,
  todoList,
  setTodoList
}) => {
  const [todoText, setTodoText] = useState(item.text);
  const [isEditing, setIsEditing] = useState(false);

  const editItem = (itemId) => {
    setIsEditing(!isEditing);
  };

  const deleteItem = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const handleDropdownChange = (event, itemId) => {
    setDropdownValues([
      ...dropdownValues,
      { id: itemId, value: event.target.value }
    ]);
    if (event.target.value === "Edit") {
      editItem(itemId);
    } else if (event.target.value === "Remove") {
      deleteItem(itemId);
    }
  };

  const handleEditChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleEditSave = (event) => {
    const updatedList = todoList.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, text: todoText };
      }
      return todo;
    });
    setTodoList(updatedList);
    setIsEditing(false);
  };

  let ItemResult;

  if (isEditing) {
    ItemResult = (
      <div className="edit-mode-wrapper">
        <input
          className="item-edit-mode"
          type="text"
          id={item.id}
          name={todoText}
          value={todoText}
          onChange={handleEditChange}
        />
        <button className="button-save" onClick={handleEditSave}>
          Save
        </button>
      </div>
    );
  } else {
    ItemResult = (
      <div className="item-wrapper" key={item.id}>
        <input
          className="item-checkbox"
          type="checkbox"
          id={item.id}
          name={todoText}
          value={todoText}
        />
        <label
          className="item-label"
          htmlFor={todoText}
        // onClick={() => deleteItem(itemId)}
        >
          {todoText}
        </label>
        <select
          className="item-select"
          value={dropdownValues[item.id]}
          onChange={(event) => handleDropdownChange(event, item.id)}
        >
          {dropdownOptions.map((option) => (
            <option
              key={item.id + todoText + option.label}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return ItemResult;
};
