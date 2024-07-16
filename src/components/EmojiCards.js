import React from "react";

// My imports.
import {List} from "./List";
import {Card} from "./Card";

export function EmojiCards({ emojis }) {
  return (
    <div className="divide-y divide-slate-100">
      <List>
        {emojis.map((emoji, index) => (
          <Card key={index} index={index} emoji={emoji} />
        ))}
      </List>
    </div>
  );
}