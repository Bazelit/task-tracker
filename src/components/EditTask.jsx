import { useEffect, useState } from "react";

const EditTask = ({ task, index, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
  };

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName: projectName,
      taskDescription: taskDescription,
      timestamp: task.timestamp,
      duration: task.duration,
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
    setEditModal(false);
  };

  return (
    <>
      <button
        onClick={() => setEditModal(true)}
        style={{ background: "#9098a3", color: "white", padding: "5px 10px" }}
        className="text-white text-sm-uppercase font-semibold py-1.5 px-3 rounded-lg"
      >
        Edit
      </button>
      {editModal ? (
        <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-100 flex items-center justify-center">
          <div className="w-9/12 max-w-lg border rounded-lg shadow-md relative felx flex-col bg-white">
            <div className="border-b border-slate-200 rounded-t flex flex-row justify-between p-5">
              <h3 className="bg-white text-black text-3xl font-semibold">
                Edit Task
              </h3>
              <button
                onClick={() => setEditModal(false)}
                className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
              >
                x
              </button>
            </div>
            <form className="px-6 pt-6 pb-4">
              <div>
                <label className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block">
                  Project Name
                </label>
                <input
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-light focus:outline-none focus:bg-white"
                  type="text"
                  id="project-name"
                  placeholder="Project name"
                  name="projectName"
                  value={projectName}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block">
                  Task Description
                </label>
                <textarea
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-light focus:outline-none focus:bg-white"
                  rows="3"
                  placeholder="Task description"
                  name="taskDescription"
                  value={taskDescription}
                  onChange={handleInput}
                  id="task-description"
                />
              </div>
            </form>
            <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
              <button
                className="bg-blue-500 text-white uppercase
                text-sm font-seminold py-3 px-6
                rounded hover:opacity-85"
                onClick={handleUpdate}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditTask;
