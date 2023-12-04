import { useReducer } from "react";
import { AddForm } from "./AddForm";
import { UpdateForm } from "./UpdateForm";
import { useSelector } from "react-redux";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export const Form = () => {
  const [formData, setFormData] = useReducer(formReducer, {});

  const formID = useSelector((state) => state.app.client.formID);

  return (
    <div className="items-center">
      {formID
        ? UpdateForm({ formID, formData, setFormData })
        : AddForm({ formData, setFormData })}
    </div>
  );
};
