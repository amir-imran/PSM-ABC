import { Field } from "formik"
import Icon from "../Icon"
import ErrorMessageInput from "./ErrorMessageInput"

export function AppInputText({ icon, inputLabel, inputName, ...otherProps }) {
  return (
    <div className="mt-2">
      <label className="block Capitalize" htmlFor={inputLabel}>
        {icon && (
          <span className="ml-1">
            {" "}
            <Icon name={icon} size="sm" />
          </span>
        )}{" "}
        {inputLabel}
      </label>
      <Field
        name={inputName}
        {...otherProps}
        className="w-full text-sm px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1"
      />
      <ErrorMessageInput errorName={inputName} />
    </div>
  )
}
