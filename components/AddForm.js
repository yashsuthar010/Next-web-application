import { useReducer } from "react";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import { getTasks, postTask } from "../lib/helper";

export const AddForm = ({ formData, setFormData }) => {
  // return an array with two items
  //   destructring the items in array
  const queryClient = useQueryClient();
  const addMutation = useMutation(postTask, {
    onSuccess: () => {
      queryClient.prefetchQuery("tasks", getTasks);
      toast.success("Added successfully");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error("Enter all details to add a task");
      return;
    }

    let { title, description, priority, status } = formData;
    const task = {
      title,
      description,
      priority: priority ?? "Low",
      status: status ?? "Active",
    };

    addMutation.mutate(task);
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          for="email"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          onChange={setFormData}
          name="title"
          id="email"
          className="bg-gray-50  text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
        />
      </div>
      <div className="mb-5">
        <label
          for="message"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="message"
          onChange={setFormData}
          name="description"
          rows="4"
          className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Description..."
        ></textarea>
      </div>
      <div className="flex items-start mb-5 justify-between">
        <label
          for="countries"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Set Priority
        </label>
        <div className="flex items-center mb-4">
          <input
            id="country-option-1"
            type="radio"
            name="priority"
            value="High"
            onChange={setFormData}
            className="w-5 h-5 text-red-500 border-gray-300 focus:ring-red-500 focus:bg-red-500 focus:border-red-500 dark:text-red-500 dark:focus:ring-red-500 focus:bg-red-500 "
          />
          <label
            for="country-option-1"
            className="block ms-2  text-base font-medium text-gray-900 dark:text-gray-300"
          >
            High
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="country-option-1"
            type="radio"
            name="priority"
            value="Medium"
            onChange={setFormData}
            className="w-5 h-5 border-gray-300  dark:focus:ring-red dark:focus:bg-red dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="country-option-1"
            className="block ms-2  text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Medium
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="country-option-1"
            type="radio"
            name="priority"
            value="Low"
            onChange={setFormData}
            className="w-5 h-5 border-gray-300  dark:focus:ring-red dark:focus:bg-red dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="country-option-1"
            className="block ms-2  text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Low
          </label>
        </div>
      </div>
      <div className="flex items-start mb-5 gap-10">
        <label
          for="countries"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Set Status
        </label>
        <div className="flex gap-9">
          <div className="flex items-center mb-4">
            <input
              id="country-option-1"
              onChange={setFormData}
              type="radio"
              name="status"
              value="Active"
              className="w-5 h-5 border-gray-300  dark:focus:ring-red dark:focus:bg-red dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="country-option-1"
              className="block ms-2  text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Active
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="country-option-1"
              onChange={setFormData}
              type="radio"
              name="status"
              value="Done"
              className="w-5 h-5 border-gray-300  dark:focus:ring-red dark:focus:bg-red dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="country-option-1"
              className="block ms-2  text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Done
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="transition duration-2000 text-white bg-violet-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-950 dark:focus:ring-blue-800"
      >
        Add
      </button>
    </form>
  );
};
