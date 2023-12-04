import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Task from "./task/Task";
import { getTasks } from "../../lib/helper";
import { useQuery } from "react-query";
import { RiSearchLine } from "react-icons/ri";

const Table = () => {
  const { isLoading, isError, data, error } = useQuery("tasks", getTasks);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority);
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  // Check if data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if an error occurred during data fetching
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Check if data is undefined or not an array
  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

  const filteredTasks = data.filter((task) => {
    const priorityFilter =
      selectedPriority === "All" || task.priority === selectedPriority;
    const statusFilter =
      selectedStatus === "All" || task.status === selectedStatus;

    return priorityFilter && statusFilter;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.priority.localeCompare(b.priority);
    } else if (sortOrder === "desc") {
      return b.priority.localeCompare(a.priority);
    }
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredByTitle = sortedTasks.filter((task) => {
    // Check if the task has a title property before applying toLowerCase()
    const taskTitle = task.title ? task.title.toLowerCase() : "";
    return taskTitle.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="mt-4">
        <h1 className="text-2xl sm:text-3xl lg:text-3xl text-white font-medium">
          TASKS
        </h1>
        <div className="flex flex-col mt-4 md:flex-row justify-between">
          <div className="flex flex-col md:flex-row mb-3 md:mb-0">
            <div className="flex mb-2 md:mr-3">
              <select
                id="priorityDropdown"
                value={selectedPriority}
                onChange={(e) => handlePriorityClick(e.target.value)}
                className="text-white text-xl sm:text-  xl rounded bg-zinc-800 hover:bg-zinc-700 px-2 py-1"
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex mb-2 md:mr-3">
              <select
                id="statusDropdown"
                value={selectedStatus}
                onChange={(e) => handleStatusClick(e.target.value)}
                className="text-white text-xl sm:text-  xl rounded bg-zinc-800 hover:bg-zinc-700 px-2 py-1"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="mb-2">
              <select
                id="orderDropdown"
                value={sortOrder}
                onChange={(e) => handleSortOrderChange(e.target.value)}
                className="text-xl sm:text- xl p-1 text-white rounded bg-zinc-800 hover:bg-zinc-700 focus:border-none"
              >
                <option value="asc">High - Low</option>
                <option value="desc">Low - High</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <RiSearchLine color="white" size={30} />
            <input
              type="text"
              id="searchInput"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Enter task title.."
              className="text-white text-xl sm:text-  xl focus:border-none focus:outline-none rounded-md bg-zinc-800 hover:bg-zinc-700 px-2 py-1 placeholder:text-base"
            />
          </div>
        </div>
        <div className="mt-10">
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            style={{ width: "100%", height: "500px" }} // Set the desired height
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredByTitle.map((task) => (
                <Task key={task._id} {...task} />
              ))}
            </div>
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default Table;
