import React from "react";

export default function MovieForm(props) {
  return (
    <form>
      <label>
        Title:
        <input name="title" />
      </label>
      <label>
        Director:
        <input name="director" />
      </label>
      <label>
        Metascore:
        <input name="score" />
      </label>
      <label>
        Stars:
        <input name="stars" />
      </label>
      <input type="submit" />
    </form>
  );
}
