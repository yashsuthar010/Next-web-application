import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../../../redux/reducer";
import { deleteTask, getTasks } from "../../../lib/helper";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-600";
    case "Medium":
      return "text-orange-500";
    case "Low":
      return "text-green-500";
    default:
      return "text-zinc-800";
  }
};

const getStatus = (status) => {
  switch (status) {
    case "Active":
      return "shadow-lg shadow-violet-600/40";

    default:
      return "text-zinc-800";
  }
};

const Record = ({ _id, title, description, priority, status }) => {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    console.log(visible);
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    deleteTask(_id)
      .then(() => {
        queryClient.prefetchQuery("tasks", getTasks);
        dispatch(deleteAction(null));
        toast.success("Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        dispatch(deleteAction(null));
      });
  };

  const priorityColor = getPriorityColor(priority);
  const statusColor = getStatus(status);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`transition hover:bg-zinc-800 bg-zinc-900 duration-3000 hover:opacity-90 p-3 rounded-md  flex flex-col justify-between ${statusColor}`}
    >
      <div>
        <h1 className={`text-white text-xl font-bold sm:text-2xl lg:text-2xl`}>
          {title}
        </h1>
        <div
          className={`text-gray-200 mt-2 text-base sm:text-lg lg:text-lg ${
            isExpanded ? "block" : "line-clamp-2"
          }`}
        >
          {description}
        </div>
        {description && description.length > 30 && (
          <button onClick={toggleExpansion} className="text-gray-400">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <div className="flex justify-between mt-3">
        <div>
          <FaCircle className={`${priorityColor}`} size={24} />
        </div>
        <div className="flex gap-3 flex-end">
          <RxUpdate
            size={24}
            className="cursor-pointer text-gray-400 hover:text-gray-50"
            onClick={onUpdate}
          />
          <MdDelete
            size={28}
            className="cursor-pointer text-gray-400 hover:text-gray-50"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Record;
