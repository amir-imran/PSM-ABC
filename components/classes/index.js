import React, { useEffect, useState } from "react";
import {
  addDoc,
  doc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import styles from "../../styles/table.module.css";
import { db } from "../../config/firebase";

import { AppInputText } from "../account/AppInputText";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import * as Yup from "yup";
import GeneralTable from "../tables/GeneralTable";
import Icon from "../Icon";
const validationSchema = Yup.object().shape({
  name: Yup.string(),
  // email: Yup.string().email("Invalid email address").required("Required"),
  fees: Yup.number(),
  grade: Yup.string(),
  numberOfStudents: Yup.string(),
});

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
];

const tableHead = ["Name", "Grade", "Fees", "Size", "actions"];

const ClassScreen = ({}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [classes, setClasses] = useState([]);
  const [repeat, setRepeat] = useState(null);
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editClass, setEditClass] = useState({});
  const classesCollectionRef = collection(db, "classes");
  const onEdit = (classItem) => {
    setEditClass({});
    setEditClass(classItem);
  };

  const [selectedGrade, setSelectedGrade] = useState(null);

  const handleSelectedGrade = (selectedGrade) => {
    setSelectedGrade(selectedGrade);
  };
  useEffect(() => {
    handleSelectedGrade(selectedGrade);
  }, [selectedGrade]);

  const getClasses = async () => {
    const data = await getDocs(classesCollectionRef);
    setClasses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };
  useEffect(() => {
    getClasses();
  }, []);

  const router = useRouter();

  if (loading) {
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
    );
  }
  const submitHandler = async (values) => {
    console.log(grade);
    const data = {
      day: repeat,
      grade: grade,
      ...values,
    };
    console.log(data);
    try {
      await addDoc(classesCollectionRef, data);
      enqueueSnackbar("Class Successfully Added.", {
        variant: "success",
        autoHideDuration: 3000,
      });
      router.push("/modules/classes");
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    console.log(values);
  };

  const onSubmitEdited = async (values) => {
    const data = {
      ...values,
      grade: grade,
      day: repeat,
    };
    try {
      const userRef = doc(db, "classes", editClass.id);
      await setDoc(userRef, data, { merge: true });
      enqueueSnackbar("students Successfully Updated.", {
        variant: "success",
        autoHideDuration: 3000,
      });
      getClasses();
      setEditClass({});
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    // console.log(values)
  };

  return (
    <div className="grid gap-4">
      {/* <GeneralTable
        tableHead={tableHead}
        title="classes"
        total={classes.length}
        results={classes}
        collectionName="classes"
      /> */}
      <ClassesTable classes={classes} update={getClasses} onEdit={onEdit} />
      <div className="px-4 rounded-md   bg-white">
        <p className="my-4 text-center"> Add A Class</p>
        <Formik
          enableReinitialize
          // initialValues={{
          //   numberOfStudents: "",
          //   name: "",
          //   // email: user.email,
          //   fees: "",
          //   size: "",
          //   tutor: "",
          //   startTime: "",
          //   endTime: "",
          //   startDate: "",
          //   endDate: "",
          // }}

          initialValues={editClass || {}}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            editClass ? onSubmitEdited(values) : submitHandler(values);
            //   console.log(values)
            //  setSubmitting(false)
          }}
        >
          <Form>
            <div className="my-4">
              <AppInputText
                type="text"
                placeholder="Name"
                inputName="name"
                inputLabel="Name"
                required
              />
              <AppInputText
                type="number"
                placeholder="Fees"
                inputName="fees"
                inputLabel="Fees"
                required
              />

              <AppInputText
                type="number"
                placeholder="Number Of Students"
                inputName="NumberOfStudents"
                inputLabel="Number Of Students"
                required
              />
              <AppInputText
                type="number"
                placeholder="Size"
                inputName="size"
                inputLabel="Size"
                required
              />
              <AppInputText
                type="text"
                placeholder="Tutor"
                inputName="tutor"
                inputLabel="Tutor"
                required
              />
              <div className="">
                <select
                  onChange={(e) => {
                    setGrade(e.target.value);
                    editClass.grade = e.target.value;
                  }}
                  className="w-full text-sm px-4 py-2 mt-4 border rounded-md focus:outline-none focus:ring-1"
                >
                  <option selected="true" disabled="disabled">
                    Grade
                  </option>
                  {yearGrade.map((grade, index) => {
                    return (
                      <option key={index} value={grade}>
                        {grade}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="">
                <select
                  onChange={(e) => {
                    setRepeat(e.target.value);
                    editClass.repeat = e.target.value;
                  }}
                  id="small"
                  className="w-full text-sm px-4 py-2 mt-4 border rounded-md focus:outline-none focus:ring-1"
                >
                  <option selected="true" disabled="disabled">
                    Class Day
                  </option>
                  <option value={0}>Sunday</option>
                  <option value={1}>Monday</option>
                  <option value={2}>Tuesday</option>
                  <option value={3}>Wednesday</option>
                  <option value={5}>Thursday</option>
                  <option value={6}>Friday</option>
                  <option value={7}>Saturday</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <AppInputText
                  type="date"
                  placeholder="Start Date"
                  inputName="startDate"
                  inputLabel="Start date"
                />
                <AppInputText
                  type="date"
                  placeholder="End Date"
                  inputName="endDate"
                  inputLabel="End date"
                />
                <AppInputText
                  type="time"
                  placeholder="Start time"
                  inputName="startTime"
                  inputLabel="Start time"
                />
                <AppInputText
                  type="time"
                  placeholder="End time"
                  inputName="endTime"
                  inputLabel="End time"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-secondary rounded-lg hover:bg-blue-700"
                >
                  save
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ClassScreen;

const ClassesTable = ({ classes, onEdit, update }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const [filteredData, setFilteredData] = React.useState(classes);

  useEffect(() => {
    if (!value) {
      setFilteredData(classes);
    } else {
      setFilteredData(classes.filter((item) => item.name.includes(value)));
    }
  }, [value]);

  const deleteData = async (id) => {
    setLoading(true);
    try {
      const dataDoc = doc(db, "classes", id);
      await deleteDoc(dataDoc);
      setLoading(false);
      router.push("/");
      enqueueSnackbar("Class Successfully deleted.", {
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

  return (
    <div className="bg-white p-4 rounded-md shadow overflow-auto">
      <div className="p-4 grid xs:grid-cols-2 justify-center">
        <div>
          <h1 className="text-xl font-semibold ">Classes</h1>
          <p className="font-light">{classes.length} total</p>
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
      <table className={styles.table}>
        <tr className={styles.tr}>
          {tableHead.map((name) => (
            <th className="text-left" style={{ textAlign: "center" }}>
              {name}:
            </th>
          ))}
        </tr>
        <tbody className={styles.trhover}>
          {filteredData.map((classItem) => (
            <tr className={styles.tr} style={{ textAlign: "center" }}>
              <td>{classItem.name || "hello"}</td>
              <td>{classItem.grade}</td>
              <td>{classItem.fees || "Value Not Found."}</td>
              <td>{classItem.size || "Value Not Found."}</td>

              <td>
                <div className="flex justify-between gap-4 px-2 items-center">
                  <a
                    href="#"
                    className={`font-medium text-secondary `}
                    onClick={() => onEdit(classItem)}
                  >
                    {/* {title === "Students" ? <Modal /> : "Edit"} */}
                    Edit
                  </a>

                  <button
                    onClick={() => {
                      deleteData(classItem.id);
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
    </div>
  );
};
