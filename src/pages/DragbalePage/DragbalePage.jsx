import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Input from '../../component/Input';
import uuid from "uuid/v4";

import { getColumns, addItemsToColumns, moveItemFromColumnToColumn, updateItemIndexOFColumn } from '../../action/table';

import './Dragbale.css';

const itemsFromBackend = [
  { id: 1, content: "First task" },
  { id: 2, content: "Second task" },
  { id: 3, content: "Third task" },
  { id: 4, content: "Fourth task" },
  { id: 5, content: "Fifth task" }
];

const itemsFromBackends = [
  { id: 4, content: "Fourth task" },
  { id: 5, content: "Fifth task" }
];

const columnsFromBackend = {
  1: {
    name: "Requested",
    items: itemsFromBackend
  },
  2: {
    name: "To do",
    items: []
  },
  3: {
    name: "In Progress",
    items: []
  },
  4: {
    name: "Done",
    items: []
  }
};

const DragbalePage = () => {

  const dispatch = useDispatch();
  const { allColumns } = useSelector(state => state.tables);
  const columns = allColumns ? allColumns : [];
  console.log('columns', columns);

  useEffect(() => {
    dispatch(getColumns());
  }, [dispatch]);

  const onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(el => {
        if (el.id === source.droppableId) {
          return el;
        }
      });
      const destColumn = columns.find(el => {
        if (el.id === destination.droppableId) {
          return el;
        }
      });
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      dispatch(moveItemFromColumnToColumn(sourceColumn.id, removed.id));

      const draGData = { id: destItems[0].id, content: destItems[0].content };
      dispatch(addItemsToColumns(draGData, destColumn.id));
    } else {
      const column = columns.find(el => {
        if (el.id === source.droppableId) {
          return el;
        }
      });
      debugger;
      const copiedItems = [...column.items];
      debugger;
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      dispatch(updateItemIndexOFColumn(column.id, copiedItems));
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns)}
      >
        {columns.length > 0 && columns.map((column, index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={column.id}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                        <Input placeholder="Add a Card...." onBlur={e => {
                          const itemData = { id: uuid(), content: e.target.value };
                          dispatch(addItemsToColumns(itemData, column.id));
                        }} />
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  )
}

export default DragbalePage
