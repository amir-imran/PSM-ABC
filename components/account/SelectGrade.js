import React from "react"
import { Field } from "formik"
import ErrorMessageInput from "./ErrorMessageInput"

const yearGrade = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Form 1",
  "Form 2",
  "Form 3",
  "Form 4",
  "Form 5",
]
export default function SelectGrade({ e, handleSelected, selected }) {
  return (
    <div className="mt-2">
      <label className="block Capitalize" htmlFor="Grade">
        Grade
      </label>
      <Field
        name="grade"
        as="select"
        className="w-full text-sm px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-darkViolet"
        onChange={(e) => handleSelected(e.target.value)}
        value={selected}
      >
        <option value="" selected disabled>
          choose grade
        </option>
        {yearGrade.map((grade, index) => {
          return (
            <option key={index} value={grade}>
              {grade}
            </option>
          )
        })}
      </Field>
      <ErrorMessageInput errorName="gender" />
    </div>
  )
}
