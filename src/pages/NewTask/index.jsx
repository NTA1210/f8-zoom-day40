import classNames from "classnames/bind";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "@/libs/react-redux";

//scss
import styles from "./NewTask.module.scss";
import { useState } from "react";

// Comp
import { TaskForm } from "@/components";

const cx = classNames.bind(styles);

function NewTask() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const handleAddNewTask = async (value) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    try {
      const data = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: value,
        }),
      }).then((res) => res.json());

      dispatch({
        type: "ADD_TASK",
        payload: {
          data,
        },
      });
      dispatch({
        type: "SET_ERROR",
        payload: null,
      });
    } catch (e) {
      dispatch({
        type: "SET_ERROR",
        payload: e.message,
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }

    navigate("/");
  };
  return (
    <div className={cx("container")}>
      <div className={cx("new-task")}>
        <h1>Add new task</h1>
        <TaskForm onSubmit={handleAddNewTask} isLoading={loading} />
      </div>
    </div>
  );
}

export default NewTask;
