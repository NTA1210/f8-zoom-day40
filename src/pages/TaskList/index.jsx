import classNames from "classnames/bind";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "@/libs/react-redux";

//scss
import styles from "./TaskList.module.scss";

// Comp
import { TaskItem } from "@/components";

const cx = classNames.bind(styles);

function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });
      const res = await fetch("http://localhost:3001/tasks");
      const data = await res.json();
      dispatch({
        type: "SET_TASKS",
        payload: data,
      });
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    };
    getData();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete this task?");
    if (!confirm) return;

    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  const handleEdit = (id) => {
    navigate(`/${id}/edit`);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("task-list")}>
        <header className={cx("header")}>
          <h1>Task List</h1>
          <button
            className={cx("btn", "new")}
            onClick={() => navigate("/new-task")}
          >
            New Task
          </button>
        </header>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <h6>No tasks found</h6>
        )}
      </div>
    </div>
  );
}

export default TaskList;
