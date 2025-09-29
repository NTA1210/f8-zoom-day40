import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

//scss
import styles from "./TaskForm.module.scss";

import { useDispatch, useSelector } from "@/libs/react-redux";

const cx = classNames.bind(styles);

function TaskForm({
  initialData,
  onSubmit,
  submitText = "Create",
  isLoading = false,
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(initialData);
    setValue(initialData || "");

    inputRef.current.focus();
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value === "") {
      dispatch({
        type: "SET_ERROR",
        payload: "Please enter task title",
      });
      return;
    }

    onSubmit(value);
  };
  return (
    <form className={cx("task-form")} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        id="title"
        placeholder="Enter task title"
        className={cx("input", { error: error })}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {error && <p className={cx("error")}>{error}</p>}

      <div className={cx("actions")}>
        <button className={cx("btn", "add")} disabled={isLoading}>
          {submitText}
        </button>
        <button
          type="button"
          className={cx("btn", "cancel")}
          onClick={() => {
            navigate("/");
            dispatch({
              type: "SET_ERROR",
              payload: null,
            });
          }}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
