import { ErrorMessage } from "formik"

const ErrorMessageInput = ({ errorName }) => {
  return (
    <div className="text-gray-400 ">
      {" "}
      <ErrorMessage name={errorName} />
    </div>
  )
}

export default ErrorMessageInput
