import classNames from "classnames/bind";
import { useDispatch } from "@/libs/react-redux";

//scss
import styles from "./TaskItem.module.scss";

const cx = classNames.bind(styles);

function TaskItem({ task, onEdit, onDelete, isDeleting }) {
  const dispatch = useDispatch();

  // delete task

  return (
    <div className={cx("task-item")}>
      <h1 className={cx("title")}>{task.title}</h1>
      <div className={cx("actions")}>
        <button
          className={cx("delete", "btn")}
          disabled={isDeleting}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
        <button className={cx("edit", "btn")} onClick={() => onEdit(task.id)}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
