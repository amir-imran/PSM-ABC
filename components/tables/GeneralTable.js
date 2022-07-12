import React from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import styles from "../../styles/table.module.css";
import Icon from "../Icon";
import Modal from "../Modal";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const Table = ({
  collectionName,
  tableHead,
  results,
  title = "User",
  total = "100",
  update,
  onEdit,
}) => {
  const router = useRouter();
  const countPerPage = 10;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState(results);
  const [collection, setCollection] = React.useState(
    cloneDeep(results.slice(0, countPerPage))
  );
  const { enqueueSnackbar } = useSnackbar();

  const searchData = React.useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        results
          .filter((item) => item?.firstName?.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  const deleteData = async (id) => {
    console.log(id);
    setLoading(true);
    try {
      const dataDoc = doc(db, "users", id);
      await deleteDoc(dataDoc);
      setLoading(false);
      router.push("/");
      enqueueSnackbar("Student Successfully deleted.", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    setLoading(false);
  };

  React.useEffect(() => {
    console.log(value, filteredData);
    if (!value) {
      setFilteredData(results);
      // searchData.current(value);
      // updatePage(1);
    } else {
      setFilteredData(results.filter((item) => item.fullName.includes(value)));
    }
  }, [value]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(results.slice(from, to)));
  };

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      const checkTD = () => {
        if (keyD === "Performance") {
          return (
            <td key={i}>
              <div className="flex justify-between gap-4 px-2 items-center">
                <a
                  href="#"
                  className={`${
                    title !== "Students" && "hover:underline"
                  }font-medium text-secondary `}
                >
                  {title === "Students" ? <Modal /> : "Edit"}
                </a>
              </div>
            </td>
          );
        }
        if (keyD === "actions") {
          return (
            <td key={i}>
              <div className="flex justify-between gap-4 px-2 items-center">
                <a
                  href="#"
                  className={`${
                    title !== "Students" && "hover:underline"
                  }font-medium text-secondary `}
                >
                  {title === "Students" ? <Modal /> : "Edit"}
                </a>

                <button
                  onClick={() => {
                    deleteData(key.id);
                  }}
                  className=" rounded-md px-1 0"
                >
                  {!loading ? (
                    <Icon
                      name="fa-trash"
                      className="text-red-400 hover: py-1 hover:scale-110 transition transform duration-300 ease-in-out"
                    />
                  ) : (
                    <Icon
                      name="fa-spinner"
                      spin
                      className="text-red-400 hover: py-1 hover:scale-110 transition transform duration-300 ease-in-out"
                    />
                  )}
                </button>
              </div>
            </td>
          );
        }
      };

      return <td key={i}>{key[keyD] ? key[keyD] : <>{checkTD()}</>}</td>;
    });
    return (
      <tr className={styles.tr} key={index}>
        {columnData}
      </tr>
    );
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <>
        <td className={styles.td} key={index}>
          {title}
        </td>
      </>
    ));
  };

  return (
    <div className="bg-white p-4 rounded-md shadow overflow-auto">
      <div className="p-4 grid xs:grid-cols-2 justify-center">
        <div>
          <h1 className="text-xl font-semibold ">{title}</h1>
          <p className="font-light">{total} total</p>
        </div>
        <div className="relative mt-1 w-full ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon
              name="fa-magnifying-glass"
              className="text-black opacity-75"
            />
          </div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            id="table-search"
            className="w-full bg-primary border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <div className="min-w-[550px]  ">
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th>Name:</th>
            <th>Grade:</th>
            <th>Payment Dues:</th>
            <th>IC Number:</th>
            <th>Performance:</th>
            <th>Actions:</th>
          </tr>
          <tbody className={styles.trhover}>
            {filteredData.map((user) => (
              <tr className={styles.tr} style={{ textAlign: "center" }}>
                <td>{user.fullName || "Name Not Found"}</td>
                <td>{user.grade}</td>
                <td>{user.paymentDue}</td>
                <td>{user.icNumber || "Value Not Found."}</td>
                <td>
                  <div className="flex justify-between gap-4 px-2 items-center">
                    <a
                      href="#"
                      className={`${
                        title !== "Students" && "hover:underline"
                      }font-medium text-secondary`}
                    >
                      <div className="text-black">{user.performance + " "}</div>
                      {title === "Students" ? (
                        <Modal id={user.id} update={update} />
                      ) : (
                        "Edit"
                      )}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="flex justify-between gap-4 px-2 items-center">
                    <a
                      href="#"
                      className={`${
                        title !== "Students" && "hover:underline"
                      }font-medium text-secondary `}
                      onClick={() => onEdit(user)}
                    >
                      {/* {title === "Students" ? <Modal /> : "Edit"} */}
                      Edit
                    </a>

                    <button
                      onClick={() => {
                        deleteData(user.id);
                      }}
                      className=" rounded-md px-1 0"
                    >
                      {!loading ? (
                        <Icon
                          name="fa-trash"
                          className="text-red-400 hover: py-1 hover:scale-110 transition transform duration-300 ease-in-out"
                        />
                      ) : (
                        <Icon
                          name="fa-spinner"
                          spin
                          className="text-red-400 hover: py-1 hover:scale-110 transition transform duration-300 ease-in-out"
                        />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={results.length}
        />
      </div>
    </div>
  );
};
export default Table;
