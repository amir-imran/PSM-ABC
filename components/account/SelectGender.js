import React from "react"
import { Field } from "formik"
import ErrorMessageInput from "./ErrorMessageInput"

export default function SelectGender({ e, handleSelected, selected }) {
  return (
    <div className="mt-2">
      <label className="block Capitalize" htmlFor="Gender">
        Gender
      </label>
      <Field
        name="gender"
        as="select"
        className="w-full text-sm px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-darkViolet"
        onChange={(e) => {
          console.log(e.target.value)
          handleSelected(e.target.value)
        }}
        value={selected}
      >
        <option value="" selected disabled>
          choose gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Field>
      <ErrorMessageInput errorName="gender" />
    </div>
  )
}
