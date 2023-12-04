import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTask, getTasks, updateTask } from "../lib/helper";

export const UpdateForm = ({ formID, formData, setFormData }) => {
  // return an array with two items
  //   destructring the items in array
  console.log({ id: formID });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["tasks", formID], () =>
    getTask(formID)
  );
  const updatedMutation = useMutation(
    (newData) => updateTask(formID, newData),
    {
      onSuccess: async () => {
        await queryClient.prefetchQuery("tasks", getTasks);
        toast.success("Updated Successfully");
      },
    }
  );

  const { title, description, priority: priority, status: status } = data || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = Object.assign({}, data, formData);
    await updatedMutation.mutate(updated);

    console.log(updated);
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
          defaultValue={title}
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
          defaultValue={description}
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
            defaultChecked={priority === "High"}
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
            defaultChecked={priority === "Medium"}
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
            defaultChecked={priority === "Low"}
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
              id="option-1"
              defaultChecked={status === "Active"}
              onChange={setFormData}
              type="radio"
              name="status"
              value="Active"
              className="w-5 h-5 border-gray-300  dark:focus:ring-red dark:focus:bg-red dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="option-1"
              className="block ms-2  text-base font-medium text-gray-900 dark:text-gray-300"
            >
              Active
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="country-option-1"
              defaultChecked={status === "Done"}
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
        className="transition duration-2000 text-lg text-white bg-violet-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-950 dark:focus:ring-blue-800"
      >
        Update
      </button>
    </form>
  );
};
