import { useState } from "react";
import { v4 as uuid } from "uuid";
import { TodoItem } from "../TodoItem";

export default function TodoList() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([
    { id: uuid(), text: "Clean" },
    { id: uuid(), text: "Play" },
    { id: uuid(), text: "Work" }
  ]);

  const [dropdownValues, setDropdownValues] = useState(() =>
    todoList.map((x) => ({ id: x.id, value: "" }))
  );

  const dropdownOptions = [
    { label: "", value: "" },
    { label: "Edit", value: "Edit" },
    { label: "Remove", value: "Remove" }
  ];

  const createNewToDoItem = () => {
    let item;
    if (todoItem !== "") {
      item = { id: uuid(), text: todoItem };
      setTodoList([...todoList, item]);
    }
    setTodoItem("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    createNewToDoItem();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createNewToDoItem();
    }
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <span>A simple React Todo List App</span>
      <div className="container">
        <input
          type="text"
          name="todoItem"
          className="input"
          // placeholder="Add New Item"
          value={todoItem}
          onChange={(e) => {
            setTodoItem(e.currentTarget.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="button-add"
          disabled={!todoItem}
        >
          Add Todo
        </button>
        {todoList.length !== 0 && (
          <div className="counter">
            {todoList.length === 1 ? "1 Item" : todoList.length + " Items"}
          </div>
        )}
        <div className="list">
          {todoList.length ? (
            todoList.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                dropdownOptions={dropdownOptions}
                dropdownValues={dropdownValues}
                setDropdownValues={setDropdownValues}
                todoList={todoList}
                setTodoList={setTodoList}
              />
            ))
          ) : (
            <p>No items in list.</p>
          )}
        </div>
      </div>
    </div>
  );
}
