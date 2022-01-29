import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [update, setUpdate] = useState("");
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [object, setObject] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => setTodo(data));
  }, [todo]);

  const hendleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: new Date().getTime(),
        content: inputValue,
      }),
    }).catch((e) => console.error(e));

    e.target[0].value = null;
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    }).catch((e) => console.error(e));
  };

  const updateTodo = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/todos/${object.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: update,
      }),
    }).catch((e) => console.error(e));

    e.target[0].value = null;
  };

  return (
    <>
      <form onSubmit={(e) => hendleSubmit(e)}>
        <input onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {modal && (
        <form onSubmit={(e) => updateTodo(e)}>
          <input
            placeholder={object.content}
            onChange={(e) => setUpdate(e.target.value)}
          />
          <button>Update</button>
          <button onClick={() => setModal(false)} >x</button>
        </form>
      )}

      {todo.map((t) => {
        return (
            <li key={t.id}>
              {t.content}
              <button onClick={() => deleteTodo(t.id)}>X</button>
              <button onClick={() => {
                setModal(true)
                setObject(t)
              }}>Update</button>
            </li>
        );
      })}
    </>
  );
}

export default App;
