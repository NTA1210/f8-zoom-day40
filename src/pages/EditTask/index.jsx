import classNames from "classnames/bind";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "@/libs/react-redux";

//scss
import styles from "./EditTask.module.scss";
import { useEffect, useState } from "react";

// Comp
import { TaskForm } from "@/components";

const cx = classNames.bind(styles);

function EditTask() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    const getData = async () => {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });
      const res = await fetch("http://localhost:3001/tasks");
      const data = await res.json();
      const task = data.find((task) => task.id === id);

      if (!task) {
        navigate("/");
        return;
      }
      setValue(task.title);

      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    };
    getData();
  }, [id, navigate, dispatch]);

  const handleUpdateNewTask = async (value) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    try {
      const data = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: value,
        }),
      }).then((res) => res.json());

      dispatch({
        type: "UPDATE_TASK",
        payload: {
          data,
        },
      });
      dispatch({
        type: "SET_ERROR",
        payload: "",
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
        <h1>Edit task</h1>

        <TaskForm
          submitText="Update"
          initialData={value}
          onSubmit={handleUpdateNewTask}
          isLoading={loading}
        />
      </div>
    </div>
  );
}

export default EditTask;
