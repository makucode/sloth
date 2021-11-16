import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/items";
import { fetchLists } from "../store/lists";
import styles from "../styles/TodoLists.module.scss";
import AddList from "./AddList";
import Loader from "./Loader";
import TodoList from "./TodoList";

const TodoLists = () => {
    const lists = useSelector((state) => state.entities.lists);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLists());
        dispatch(fetchItems());
    }, [dispatch]);

    return (
        <div className={styles.TodoLists}>
            {lists.loading && lists.lists.length < 1 && <Loader />}
            {!lists.loading && (
                <>
                    {lists.lists.map((list) => (
                        <TodoList key={list._id} {...list} />
                    ))}
                    <AddList />
                    {lists.lists.length % 3 !== 0 && (
                        <div className={styles.Filler}></div>
                    )}
                </>
            )}
        </div>
    );
};

export default TodoLists;
