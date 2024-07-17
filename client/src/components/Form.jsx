import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const createTodo = (text) => {
  return () =>
    fetch("http://localhost:8000/todo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: text }),
    });
};
const Form = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const todoMutation = useMutation({
    mutationFn: createTodo(text),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      setText("");
    },
    onError: () => {
      console.log("error");
      setText("");
    },
  });
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={(e) => todoMutation.mutate()}>Create</button>
    </div>
  );
};

export default Form;
