import { useState } from "react";
export default function WatchForm({ onAdd }) {
  const [text, setText] = useState("");
  // TASK 2: make the input controlled. Keep its text in state (useState("")).

  function handleSubmit(e) {
    e.preventDefault();
  if (!text.trim()) return;
  onAdd(text);
  setText("");
    // TODO: stop the page reload, ignore empty text, call onAdd(text), clear the box
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Add a movie to watch" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

