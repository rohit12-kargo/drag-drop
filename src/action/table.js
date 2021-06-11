import { GET_ALL_COLUMNS, ADD_TASK_TO_COLUMNS, MOVE_ITEM_FROM_COLUMN_TO_COLUMN, UPDATE_ITEMS_INDEX_AT_COLUMNS } from '../constant';

// Get Columns
export const getColumns = () => {
    return {
        type: GET_ALL_COLUMNS
    };
};

// Add Items To Column  
export const addItemsToColumns = (itemData, columnId) => (dispatch, getState) => {
    const { allColumns } = getState().tables;
    if (allColumns) {
        const addItemToColumn = [...allColumns];
        const tableIdx = addItemToColumn.findIndex((t) => t.id === columnId);
        if (tableIdx !== -1 && Array.isArray(addItemToColumn[tableIdx].items)) {
            const isPresent = addItemToColumn[tableIdx].items.find(item => item.id === itemData.id);
            if (!isPresent) {
                addItemToColumn[tableIdx].items.push(itemData);
            }
        }
        dispatch({
            type: ADD_TASK_TO_COLUMNS,
            payload: addItemToColumn
        })
    }
};

// Move Items From Column To Column 
export const moveItemFromColumnToColumn = (columnId, itemId) => (dispatch, getState) => {
    const { allColumns } = getState().tables;
    if (allColumns) {
        const moveItemToColumn = [...allColumns];
        const tableIdx = moveItemToColumn.findIndex((t) => t.id === columnId);
        if (tableIdx !== -1 && Array.isArray(moveItemToColumn[tableIdx].items)) {
            moveItemToColumn[tableIdx].items = moveItemToColumn[tableIdx].items.filter(f => f.id !== itemId);
        }
        dispatch({
            type: MOVE_ITEM_FROM_COLUMN_TO_COLUMN,
            payload: moveItemToColumn,
        })
    }
};

// Update Index Of Items In Column
export const updateItemIndexOFColumn = (columnId, UpdatedItems) => (dispatch, getState) => {
    const { allColumns } = getState().tables;
    console.log('UpdatedItems', UpdatedItems);
    if (allColumns) {
        const moveItemToColumn = [...allColumns];
        const tableIdx = moveItemToColumn.findIndex((t) => t.id === columnId);
        if (tableIdx !== -1 && Array.isArray(moveItemToColumn[tableIdx].items)) {
            moveItemToColumn[tableIdx].items = UpdatedItems;
        }
        dispatch({
            type: UPDATE_ITEMS_INDEX_AT_COLUMNS,
            payload: moveItemToColumn,
        })
    }
};