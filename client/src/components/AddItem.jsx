import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createItem } from "../store/items";
import styles from "../styles/AddItem.module.scss";

const AddItem = ({ listId }) => {
    const [newTodo, setNewTodo] = useState("");

    const dispatch = useDispatch();

    const handleAddItem = (e) => {
        e.preventDefault();
        dispatch(createItem({ todo: newTodo, list_id: listId }));
        setNewTodo("");
    };

    return (
        <form className={styles.AddItem} onSubmit={handleAddItem}>
            <input
                type="text"
                placeholder="New todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                required
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddItem;
