import { ADD_TASK_TO_COLUMNS, GET_ALL_COLUMNS, MOVE_ITEM_FROM_COLUMN_TO_COLUMN, UPDATE_ITEMS_INDEX_AT_COLUMNS } from '../constant';
import uuid from "uuid/v4";

const initialState = {
    columns: [
        {
            id: uuid(),
            name: "Resources",
            items: []
        },
        {
            id: uuid(),
            name: "To do",
            items: []
        },
        {
            id: uuid(),
            name: "Doing",
            items: []
        },
        {
            id: uuid(),
            name: "Done",
            items: []
        }
    ],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COLUMNS:
            return {
                ...state,
                allColumns: initialState.columns
            }
        case MOVE_ITEM_FROM_COLUMN_TO_COLUMN:
            return {
                ...state
            };
        case ADD_TASK_TO_COLUMNS:
            return {
                ...state
            };
        case UPDATE_ITEMS_INDEX_AT_COLUMNS:
            return {
                ...state
            }
        default:
            return state;
    }
};