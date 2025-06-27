import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { TodoList } from "./components/TodoList";
import { TodoListContextProvider } from "./utils/TodoListContext";

function App() {
  return (
    <TodoListContextProvider>
      <div className="app">
        <TodoList />
        <Sidebar />
      </div>
    </TodoListContextProvider>
  );
}

export default App;
