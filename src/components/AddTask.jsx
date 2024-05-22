import { useState } from "react";

const AddTask = ({ taskList, setTaskList }) => {
  const [addModal, setAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      setProjectName(value);
      setErrorMessage("");
    }
    if (name === "projectName" && value === "") {
      setErrorMessage("Enter project name to continue");
    }
    if (name === "taskDescription") setTaskDescription(value);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!projectName) {
      setErrorMessage("Enter project name to continue");
    } else {
      let timestamp = new Date();
      let tempList = taskList;
      tempList.push({
        projectName,
        taskDescription,
        timestamp: timestamp,
        duration: 0,
      });
      localStorage.setItem("taskList", JSON.stringify(tempList));
      window.location.reload();

      setAddModal(false);
      setProjectName("");
      setTaskDescription("");
    }
  };

  return (
    <>
      <button
        onClick={() => setAddModal(true)}
        className="bg-blue-500 text-white uppercase
        text-sm font-semibold py-1 mx-1.5 pl-2 pr-2.5
        rounded hover:opacity-85"
      >
        + New
      </button>
      {addModal ? (
        <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-100 flex items-center justify-center">
          <div className="w-9/12 max-w-lg border rounded-lg shadow-md relative felx flex-col bg-white">
            <div className="border-b border-slate-200 rounded-t flex flex-row justify-between p-5">
              <h3 className="bg-white text-black text-3xl font-semibold">
                Add New Task
              </h3>
              <button
                onClick={() => setAddModal(false)}
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
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-light focus:outline-none focus:bg-white"
                  type="text"
                  id="project-name"
                  placeholder="Project name"
                  name="projectName"
                  value={projectName}
                  onChange={handleInput}
                  required
                />
                <p
                  style={{
                    color: "#fd1a1a",
                    textAlign: "center",
                    marginTop: 2,
                    marginBottom: 5,
                  }}
                >
                  {errorMessage}
                </p>
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
                onClick={handleAdd}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddTask;
