import { useState, useEffect, SetStateAction, useRef } from "react";
import "./toDoList.css";
// new imports
//new imports 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowsRotate,

  // these are all fontawesome icons
  faSpinner,
  faPenToSquare,
  faComment,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ToDoList = () => {
  const colors = ["#dc3445", "#ffc107", "#198754"];
  const bootstrapBlue = "#0c6dfd";
  const maxWidth = 520;

  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [modifyMode, setModifyMode] = useState(false);
  const [taskToModify, setTaskToModify] = useState("");
  const [message, setMessage] = useState("Get Started!");
  const [commentMode, setCommentMode] = useState(false);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const submitTask = () => {
    if (input) {
      if (!modifyMode) {
        let newTask = {
          description: input,
          status: colors[0],
          comment: "",
        };
        setTaskList([...taskList, newTask]);
        setMessage("Task submitted");
      } else {
        const updatedList = taskList.map((task) => {
          if (task.description === taskToModify) {
            return {
              ...task,
              description: input,
            };
          }
          return task;
        });
        setTaskList(updatedList);
        setModifyMode(false);
        setCommentMode(false);
        setTaskToModify("");
        setMessage("Task modified");
      }
      setInput("");
    } else {
      setMessage("Error");
    }
  };

  const clearAll = () => {
    setInput("");
    setTaskList([]);
    setSelectedList([]);
    setModifyMode(false);
    setTaskToModify("");
    setMessage("Get Started!");
    setCommentMode(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitTask();
    }
  };

  const listSwitcher = (code) => {
    let sortedList = taskList.filter((task) => task.status === code);
    setSelectedList(sortedList);
    setCommentMode(false);
    setModifyMode(false);
  };

  const blueButtonRef = useRef(null);

  useEffect(() => {
    setSelectedList(taskList);
    blueButtonRef.current.click();
  }, [taskList]);

  addEventListener("keydown", handleKeyPress);

  return (
    <div id="wrap" className="bg-light">
      <div id="header">
        <h2>React prog #2: To do list</h2>
        <p style={{ textAlign: "right", fontSize: "0.9rem" }}>{message}</p>
      </div>

      <div id="first-line-wrap" className="input-group mb-3">
        <button
          id="submit-button"
          onClick={() => {
            submitTask();
          }}
          className="btn btn-outline-secondary bg-dark"
          type="button"
        >
          <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
        </button>
        <button
          id="clear-button"
          onClick={() => {
            clearAll();
          }}
          className="btn btn-outline-secondary bg-dark"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowsRotate} style={{ color: "white" }} />
        </button>
        <input
          onChange={handleChange}
          id="input-field"
          value={input}
          type="text"
          className="form-control"
          placeholder=""
          aria-label=""
          aria-describedby="basic-addon1"
        />
      </div>

      <div id="second-row">
        <div
          id="sorting-buttons-wrap"
          className="btn-group btn-group-toggle"
          data-toggle="buttons"
          style={{ width: maxWidth }}
        >
          <label className="btn btn-secondary bg-danger">
            <input
              name="task-group"
              type="radio"
              id="red-button"
              value="toDo"
              onClick={() => {
                listSwitcher(colors[0]);
                setMessage("List sorted");
              }}
            />{" "}
            To do
          </label>
          <label className="btn btn-secondary bg-warning">
            <input
              name="task-group"
              type="radio"
              id="yellow-button"
              value="workInProgress"
              onClick={() => {
                listSwitcher(colors[1]);
                setMessage("List sorted");
              }}
            />{" "}
            In progress
          </label>
          <label className="btn btn-secondary bg-success">
            <input
              name="task-group"
              type="radio"
              id="green-button"
              value="done"
              onClick={() => {
                listSwitcher(colors[2]);
                setMessage("List sorted");
              }}
            />{" "}
            Done
          </label>
          <label className="btn btn-secondary bg-primary">
            <input
              name="task-group"
              type="radio"
              id="blue-button"
              value="allTasks"
              ref={blueButtonRef}
              onClick={() => {
                setMessage("List sorted");
                setSelectedList(taskList);
              }}
            />{" "}
            All tasks
          </label>
        </div>
        <div id="counter-wrap">
          <div>
            <div className="me-auto">Total</div>
            <span className="badge bg-primary rounded-pill">
              {taskList.length}
            </span>
          </div>

          <div>
            <div className="me-auto">To do</div>
            <span className="badge bg-primary rounded-pill">
              {taskList.filter((task) => task.status === colors[0]).length}
            </span>
          </div>
          <div>
            <div className="me-auto">In progress</div>
            <span className="badge bg-primary rounded-pill">
              {taskList.filter((task) => task.status === colors[1]).length}
            </span>
          </div>
          <div>
            <div className="me-auto">Done</div>
            <span className="badge bg-primary rounded-pill">
              {taskList.filter((task) => task.status === colors[2]).length}
            </span>
          </div>
        </div>
      </div>

      <ol style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {selectedList.map((task, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <li style={{ width: "380px", textAlign: "left" }}>
                {task.description}
              </li>
              <p
                style={{
                  fontSize: "0.7rem",
                  textAlign: "right",
                  color: bootstrapBlue,
                }}
              >
                {task.comment || null}
              </p>
            </div>

            <div id="task-buttons-wrap" style={{ display: "flex", gap: "5px" }}>
              <button
                style={{ background: `${task.status}`, color: "black" }}
                onClick={() => {
                  setTaskList((prevState) => {
                    const updatedTaskList = [...prevState];
                    let actualIndex = colors.findIndex(
                      (color) => color === task.status
                    );
                    let newIndex = (actualIndex + 1) % colors.length;
                    updatedTaskList[index] = {
                      ...task,
                      status: colors[newIndex],
                    };
                    return updatedTaskList;
                  });
                }}
              >
                <FontAwesomeIcon icon={faSpinner} />
              </button>
              <button
                onClick={() => {
                  if (!modifyMode) {
                    setModifyMode(true);
                    setInput(task.description);
                    setTaskToModify(task.description);
                    document.getElementById("input-field")?.focus();
                  } else {
                    setModifyMode(false);
                    task.description = input;
                    setTaskToModify("");
                    setMessage("List modified");
                  }
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                onClick={() => {
                  if (!task.comment) {
                    if (!commentMode) {
                      setModifyMode(false);
                      setTaskToModify("");
                      setCommentMode(true);
                      document.getElementById("input-field")?.focus();
                    } else {
                      console.log("Comment mode set to false");
                      task.comment = input;
                      setCommentMode(false);
                      setModifyMode(false);
                      setTaskToModify("");
                      setInput("");
                    }
                  } else {
                    if (task.comment && !commentMode) {
                      setInput(task.comment);
                      document.getElementById("input-field")?.focus();
                      setCommentMode(true);
                    } else {
                      task.comment = input;
                      setCommentMode(false);
                      setModifyMode(false);
                      setTaskToModify("");
                      setInput("");
                      setMessage("Comment modified");
                    }
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faComment}
                  style={{ color: commentMode && bootstrapBlue }}
                />
              </button>
              <button
                onClick={() => {
                  if (!commentMode) {
                    let updatedList = taskList.filter(
                      (item) => item.description !== task.description
                    );
                    setTaskList(updatedList);
                    setMessage("Task deleted");
                  } else {
                    task.comment = "";
                    setModifyMode(false);
                    setTaskToModify("");
                    setMessage("Comment deleted");
                    setCommentMode(false);
                    setInput("");
                  }
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default ToDoList;
