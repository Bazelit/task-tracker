import { useEffect, useState } from "react";
import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

const ToDo = ({ task, index, taskList, setTaskList }) => {
  const [time, setTime] = useState(task.duration);
  const [running, setRunning] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      project: task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: task.duration,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStop = () => {
    setRunning(false);

    let taskIndex = task.taskList.indexOf(task);
    taskList.slice(taskIndex, 1, {
      projectName: task.projectName,
      taskDescription: taskDescription,
      timestamp: task.timestamp,
      duration: time,
    });

    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
  };

  const handleDelete = (itemID) => {
    let removeIndex = taskList.indexOf(task);
    taskList.splice(removeIndex, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
  };

  return (
    <>
      <div
        ref={drag}
        className="flex border rounded-lg flex-col items-start justify-start bg-white my-4 py-4 px-4 px-6 w-3/4 max-w-lg"
      >
        <div className="flex flex-row justify-between w-full">
          <p className="text-black font-semibold text-xl">{task.projectName}</p>
          <EditTask
            task={task}
            index={index}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <p style={{ marginBottom: 5 }} className="text-black text-lg py-2">
          {task.taskDescription}
        </p>
        <div
          style={{ maxWidth: 350, margin: "0 auto", marginBottom: 10 }}
          className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-evenly"
        >
          <div className="sm:w-1/4 text-xl font-semibold py-4">
            <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span className="text-sm">
              {("0" + ((time / 10) % 100)).slice(-2)}
            </span>
          </div>
          <div className="w-1/3 nax-w-sm flex flex-ro justify-evenly gap-2">
            {running ? (
              <button
                onClick={handleStop}
                className="border rounded-lg py-1 px-4"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={() => setRunning(true)}
                className="border rounded-lg py-1 px-4"
              >
                Start
              </button>
            )}
            <button
              onClick={() => setTime(0)}
              style={{ marginLeft: 10 }}
              className="border rounded-lg py-1 px-4"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleDelete}
            style={{
              background: "#ec3c3a",
              color: "white",
              padding: "5px 10px",
            }}
            className="text-sm m-1 uppercase font-semibold rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ToDo;
