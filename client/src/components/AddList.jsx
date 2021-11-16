import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../store/lists";
import styles from "../styles/AddList.module.scss";

const AddList = () => {
    const [newList, setNewList] = useState("");

    const dispatch = useDispatch();

    const handleAddList = (e) => {
        e.preventDefault();
        dispatch(createList(newList));
        setNewList("");
    };

    return (
        <div className={styles.AddList}>
            <form className={styles.AddListForm} onSubmit={handleAddList}>
                <input
                    type="text"
                    placeholder="Enter a name"
                    value={newList}
                    onChange={(e) => setNewList(e.target.value)}
                />
                <button type="submit">
                    <span>Add New List</span>
                </button>
            </form>
        </div>
    );
};

export default AddList;
