import React from "react"
import TablePerformance from "./TablePerformance"
import { useState } from "react"
import GeneralTable from "../tables/GeneralTable"

import useSWR from "swr"
import Icon from "../Icon"
const fetcher = (...args) => fetch(...args).then((res) => res.json())
const tableHead = {
  firstName: "Name",
  phone: "Performance",
  height: "Comments",
  // id: "Register Class",
  // actions: "actions",
}

function getData(show) {
  const { id, firstName, phone, height } = show
  return { id, firstName, phone, height }
}

const Performance = () => {
  const { data, error } = useSWR(
    "https://dummyjson.com/users?limit=20",
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <div>
        loading...
        <Icon
          name="fa-spinner"
          className="fa-spin text-black ml-4"
          size="2x"
          spin
        />
      </div>
    )
  }

  const results = data.users
  // console.log(resultes)
  // const performance = data.users
  return (
    <div>
      <GeneralTable
        tableHead={tableHead}
        title="Students"
        total="20"
        results={results}
      />
    </div>
  )
}

export default Performance
