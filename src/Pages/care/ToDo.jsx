import { useState } from "react";

const ToDo = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  console.log("todoList", todoList);

  const addToDo = () => {
    if (newTodo.trim() !== "") {
      setTodoList([...todoList, { text: newTodo.trim() }]);
      setNewTodo("");
    }
  };
  return (
    <>
      <h1>TO DO LIST</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addToDo}>Add</button>

      
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
              <input
                type="checkbox"
              />
            <span> {todo.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDo;
