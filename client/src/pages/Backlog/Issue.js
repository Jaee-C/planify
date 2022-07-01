import React from "react";
import { Draggable } from "react-beautiful-dnd";

import TableCell from "./TableCell";

const Issue = ({ issue, index, isDragging }) => (
  <Draggable draggableId={issue.id.toString()} index={index} style={{width:"100%"}}>
    {(provided, snapshot) => (
      <tr
        key={issue.id}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <TableCell isDragging={isDragging}>{issue.id}</TableCell>
        <TableCell isDragging={isDragging}>{issue.title}</TableCell>
        <TableCell isDragging={isDragging}>{issue.status}</TableCell>
        <TableCell isDragging={isDragging}>{issue.assignee}</TableCell>
      </tr>
    )}
  </Draggable>
);

export default Issue;
