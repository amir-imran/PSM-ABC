import { TableRow } from "../tables/TableRow"
import { TableHead } from "../tables/TableHead"
import React, { useState } from "react"
import Fuse from "fuse.js"
import Icon from "../Icon"
const options = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["firstName", "height"],
}
const TableClasses = ({ users, classesPerPage, totalClasses, paginate }) => {
  const [query, setQuery] = useState("")
  const fuse = new Fuse(users, options)
  const results = fuse.search(query)
  const studentResults = query ? results.map((result) => result.item) : users
  const handleOnSearch = ({ currentTarget = {} }) => {
    const { value } = currentTarget
    setQuery(value)
  }

  return (
    <>
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <div className="p-4 grid xs:grid-cols-2 justify-center">
          <div>
            <h1 className="text-xl font-semibold ">Classes</h1>
            <p className="font-light">28 total</p>
          </div>
          <div className="w-full ">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 w-full ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon
                  name="fa-magnifying-glass"
                  className="text-black opacity-75"
                />
              </div>
              <input
                value={query}
                onChange={handleOnSearch}
                type="text"
                id="table-search"
                className="w-full bg-primary border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left text-primary0 dark:text-gray-400">
          <TableHead
            col1="Student Name"
            col2="Phone Number "
            col3="Payment Dues"
            col4="Registerd Class"
          />
          <tbody>
            {studentResults.map((user) => (
              <TableRow
                key={user.id}
                name={user.firstName}
                phone={user.phone}
                payment={user.height}
                registered={Math.floor(Math.random() * 10)}
              />
            ))}
          </tbody>
        </table>
        <div className="mt-4"></div>
      </div>
    </>
  )
}

export default TableClasses
