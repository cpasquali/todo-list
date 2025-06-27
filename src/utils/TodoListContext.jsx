import { createContext, useContext, useEffect, useState } from "react";

const TodoListContext = createContext();

export const TodoListContextProvider = ({ children }) => {
  const todoListInLocalStorage = () => {
    try {
      const data = localStorage.getItem("todoList");
      if (!data || data === "undefined") return [];
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer o parsear localStorage:", error);
      return [];
    }
  };

  const [todoList, setTodoList] = useState(todoListInLocalStorage());
  const [filteredTodoList, setFilteredTodoList] = useState(todoList);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    setFilteredTodoList(todoList);
  }, [todoList]);

  return (
    <TodoListContext.Provider
      value={{ todoList, setTodoList, filteredTodoList, setFilteredTodoList }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export const useLocalStorage = () => useContext(TodoListContext);
