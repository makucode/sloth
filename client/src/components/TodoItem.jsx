import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, updateItem } from "../store/items";
import styles from "../styles/TodoItem.module.scss";
import CheckIcon from "./icons/CheckIcon";
import PencilIcon from "./icons/PencilIcon";
import XIcon from "./icons/XIcon";

const TodoItem = ({ _id, todo, isComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currIsComplete, setCurrIsComplete] = useState(isComplete);
    const [currentTodo, setCurrentTodo] = useState(todo);

    const dispatch = useDispatch();

    useEffect(() => {
        if (currIsComplete !== isComplete) {
            dispatch(updateItem(_id, currentTodo, currIsComplete));
        }
    }, [currIsComplete]);

    const handleCompleteTodo = () => {
        setCurrIsComplete(!currIsComplete);
    };

    const handleUpdateTodo = () => {
        dispatch(updateItem(_id, currentTodo, currIsComplete));
        setIsEditing(false);
    };

    const handleDeleteItem = () => {
        dispatch(deleteItem(_id));
    };

    return (
        <li className={styles.TodoItem}>
            {isEditing && (
                <input
                    type="text"
                    placeholder={currentTodo}
                    value={currentTodo}
                    onChange={(e) => setCurrentTodo(e.target.value)}
                />
            )}
            {!isEditing && (
                <span
                    onClick={handleCompleteTodo}
                    style={{
                        textDecoration: currIsComplete
                            ? "line-through"
                            : "none",
                    }}
                >
                    {currentTodo}
                </span>
            )}
            <div className={styles.TodoItemButtons}>
                {isEditing && (
                    <>
                        <button onClick={handleUpdateTodo}>
                            <CheckIcon />
                        </button>
                        <button
                            className={styles.ItemDelete}
                            onClick={() => setIsEditing(false)}
                        >
                            <XIcon />
                        </button>
                    </>
                )}
                {!isEditing && (
                    <>
                        {!currIsComplete && (
                            <button onClick={(e) => setIsEditing(true)}>
                                <PencilIcon />
                            </button>
                        )}

                        <button
                            className={styles.ItemDelete}
                            onClick={handleDeleteItem}
                        >
                            <XIcon />
                        </button>
                    </>
                )}
            </div>
        </li>
    );
};

export default TodoItem;
