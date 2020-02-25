import React from "react";

interface MarkTextProps {
  content: string;
  mark: string;
  markComponent?: React.ComponentType;
}

export const MarkText: React.FC<MarkTextProps> = props => {
  const MarkComponent = props.markComponent ? props.markComponent : "mark";
  const chops = props.content.split(new RegExp(`(${props.mark})`, "gi"));
  return (
    <span>
      {chops.map((chop, index) =>
        chop.toLocaleLowerCase() === props.mark.toLocaleLowerCase() ? (
          <MarkComponent key={index}>{chop}</MarkComponent>
        ) : (
          chop
        )
      )}
    </span>
  );
};
