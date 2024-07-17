import { useQuery } from "@tanstack/react-query";
import "./App.css";
import Form from "./components/Form";

function App() {
  const { data } = useQuery({
    queryKey: ["todo"],
    queryFn: async () =>
      await (await fetch("http://localhost:8000/todo")).json(),
  });
  console.log(data);
  return (
    <div
      className="App"
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Form />
      <div>
        {data &&
          data.data &&
          data.data.map((todo) => <li key={todo.title}>{todo.title}</li>)}
      </div>
    </div>
  );
}

export default App;
