import React from "react";

interface MarkTextProps {
  content: string;
  mark: string;
}

export const MarkText: React.FC<MarkTextProps> = props => {
  const chops = props.content.split(new RegExp(`(${props.mark})`));
  return (
    <span>
      {chops.map((chop, index) =>
        chop === props.mark ? <mark key={index}>{chop}</mark> : chop
      )}
    </span>
  );
};
