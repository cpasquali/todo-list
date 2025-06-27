import { useRef, useState } from "react";
import { useLocalStorage } from "../utils/TodoListContext";

export const Sidebar = () => {
  const { todoList, setTodoList, setFilteredTodoList } = useLocalStorage();
  const [newTodoDescriptcion, setNewTodoDescriptcion] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const errorMessageRef = useRef(null);
  const inputRef = useRef(null);

  const handleAddTask = () => {
    if (!newTodoDescriptcion) {
      errorMessageRef.current.classList.remove("error-message-disable");
      errorMessageRef.current.classList.add("error-message");
      inputRef.current.style.border = "1px solid rgb(240, 39, 39)";
      setTimeout(() => {
        errorMessageRef.current.classList.add("error-message-disable");
        errorMessageRef.current.classList.remove("error-message");
        inputRef.current.style.border = "none";
      }, 2000);
      return;
    }

    const newTodo = {
      id: todoList.length + 1,
      description: newTodoDescriptcion,
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]);
    setNewTodoDescriptcion("");
  };

  const handleAllCompleteTask = () => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((t) => {
        return { ...t, isCompleted: true };
      })
    );
  };

  const handleAllIncompleteTask = () => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((t) => ({ ...t, isCompleted: false }))
    );
  };

  const handleDeleteAllTask = () => {
    setTodoList([]);
  };

  const handleFilterTodo = (e) => {
    if (e.target.value === "complete") {
      setFilteredTodoList(todoList.filter((t) => t.isCompleted));
      setSelectedOption("complete");
    } else if (e.target.value === "incomplete") {
      setFilteredTodoList(todoList.filter((t) => !t.isCompleted));
      setSelectedOption("incomplete");
    } else {
      setFilteredTodoList(todoList);
      setSelectedOption("all");
    }
  };

  return (
    <section className="sidebar">
      <div className="sidbar-top">
        <h2>Agrega un item</h2>
        <input
          type="text"
          value={newTodoDescriptcion}
          ref={inputRef}
          onChange={(e) => setNewTodoDescriptcion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          placeholder="Escribe aqui..."
        />
        <p className="error-message-disable" ref={errorMessageRef}>
          Campo incompleto
        </p>
        <button className="btn-sidebar" onClick={handleAddTask}>
          Agregar a la lista
        </button>
        <div className="radio-container">
          <label htmlFor="all-radio">Mostrar Todas</label>
          <input
            type="radio"
            id="all-radio"
            value="all"
            onChange={handleFilterTodo}
            checked={selectedOption === "all"}
          />
        </div>
        <div className="radio-container">
          <label htmlFor="complete-radio">Completadas</label>
          <input
            type="radio"
            id="complete-radio"
            value="complete"
            onChange={handleFilterTodo}
            checked={selectedOption === "complete"}
          />
        </div>
        <div className="radio-container">
          <label htmlFor="incomplete-radio">Pendientes</label>
          <input
            type="radio"
            id="incomplete-radio"
            value="incomplete"
            onChange={handleFilterTodo}
            checked={selectedOption === "incomplete"}
          />
        </div>
      </div>
      <div className="sidebar-bottom">
        <button className="btn-sidebar" onClick={handleAllCompleteTask}>
          Marcar todas como completadas
        </button>
        <button className="btn-sidebar" onClick={handleAllIncompleteTask}>
          Marcar todas como incompletas
        </button>
        <button className="btn-sidebar" onClick={handleDeleteAllTask}>
          Eliminar todas
        </button>
      </div>
    </section>
  );
};
