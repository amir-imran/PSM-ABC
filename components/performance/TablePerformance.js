import React from "react"
import cloneDeep from "lodash/cloneDeep"
import throttle from "lodash/throttle"
import Pagination from "rc-pagination"
import "rc-pagination/assets/index.css"
import styles from "../../styles/table.module.css"
import GeneralTable from "../tables/GeneralTable"
const tableHead = {
  firstName: "Name",
  phone: "Phone",
  height: "Payment Dues",
  id: "Register Class",
  actions: "actions",
}
const Table = ({ tableHead, results }) => {
  const countPerPage = 10
  const [value, setValue] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [collection, setCollection] = React.useState(
    cloneDeep(results.slice(0, countPerPage))
  )
  const searchData = React.useRef(
    throttle((val) => {
      const query = val.toLowerCase()
      setCurrentPage(1)
      const data = cloneDeep(
        results
          .filter((item) => item.firstName.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      )
      setCollection(data)
    }, 400)
  )

  React.useEffect(() => {
    if (!value) {
      updatePage(1)
    } else {
      searchData.current(value)
    }
  }, [value])

  const updatePage = (p) => {
    setCurrentPage(p)
    const to = countPerPage * p
    const from = to - countPerPage
    setCollection(cloneDeep(results.slice(from, to)))
  }

  const tableRows = (rowData) => {
    const { key, index } = rowData
    const tableCell = Object.keys(tableHead)
    const columnData = tableCell.map((keyD, i) => {
      console.log(keyD)
      return <td key={i}>{key[keyD]}</td>
    })
    return (
      <tr className={styles.tr} key={index}>
        {columnData}
      </tr>
    )
  }

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }))
  }

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td className={styles.td} key={index}>
        {title}
      </td>
    ))
  }

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <div className="search text-center">
        <input
          className={styles.input}
          placeholder="Search Students"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>{headRow()}</tr>
        </thead>
        <tbody className={styles.trhover}>{tableData()}</tbody>
      </table>
    </div>
  )
}
export default Table
