import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteList } from "../store/lists";
import styles from "../styles/TodoList.module.scss";
import TrashIcon from "./icons/TrashIcon";
import Separator from "./Separator";
import TodoItem from "./TodoItem";
import AddItem from "./AddItem";
import { getListItems } from "../store/items";

const TodoList = ({ _id, name, items }) => {
    const state = useSelector((state) => state);
    const listItems = state.entities.items.items.filter((item) =>
        items.includes(item._id)
    );

    const dispatch = useDispatch();

    const handleDeleteList = () => {
        dispatch(deleteList(_id));
    };

    return (
        <div className={styles.TodoList}>
            <div className={styles.TodoListHeader}>
                <h4>{name}</h4>
                <div className={styles.TodoListButtons}>
                    <button
                        className={styles.TodoListDelete}
                        onClick={handleDeleteList}
                    >
                        <TrashIcon />
                    </button>
                </div>
            </div>
            <Separator />
            <ul>
                {listItems.map((item, idx) => (
                    <React.Fragment key={item._id}>
                        <TodoItem {...item} />
                        {idx === listItems.length - 1 && <Separator />}
                    </React.Fragment>
                ))}
            </ul>
            <AddItem listId={_id} />
        </div>
    );
};

export default TodoList;
