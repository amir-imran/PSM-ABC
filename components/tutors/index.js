import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";

import GeneralTable from "../tables/GeneralTable";
import Icon from "../Icon";
import { AppInputText } from "../account/AppInputText";
import SelectGrade from "../account/SelectGrade";
import SelectGender from "../account/SelectGender";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import styles from "../../styles/table.module.css";
import * as Yup from "yup";
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const tableHead = ["Name", "Email", "Phone", "Payment", "actions"];

import { useSnackbar } from "notistack";

const validationSchema = Yup.object().shape({
  age: Yup.number(),
  dob: Yup.date(),
  // email: Yup.string().email("Invalid email address").required("Required"),
  fullName: Yup.string(),
  grade: Yup.string(),
  phone: Yup.string(),
  gender: Yup.string(),
});

const tutorsCollectionRef = collection(db, "tutors");

const TutorsScreen = ({}) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [editTutor, setEditTutor] = useState({});
  const onEdit = (tutor) => setEditTutor(tutor);

  const handleSelectedGender = (selectedGender) => {
    setSelectedGender(selectedGender);
  };
  const handleSelectedGrade = (selectedGrade) => {
    setSelectedGrade(selectedGrade);
  };
  useEffect(() => {
    handleSelectedGender(selectedGender);
    handleSelectedGrade(selectedGrade);
  }, [selectedGender, selectedGrade]);

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const data = await getDocs(tutorsCollectionRef);
    setTutors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);
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
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const submitHandler = async (values) => {
    const data = {
      ...values,
    };
    try {
      await addDoc(tutorsCollectionRef, data);
      enqueueSnackbar("Tutor Successfully Added.", {
        variant: "success",
        autoHideDuration: 3000,
      });
      router.push("/modules/tutors");
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    // console.log(values)
  };

  const onSubmitEdited = async (values) => {
    try {
      const data = {
        ...values,
        // msg: "hello",
      };
      const tutorRef = doc(db, "tutors", editTutor.id);
      await setDoc(tutorRef, data, { merge: true });
      enqueueSnackbar("Tutor Successfully Updated.", {
        variant: "success",
        autoHideDuration: 3000,
      });
      await getUsers();
      setEditTutor({});
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    // console.log(values)
  };

  return (
    <div className="bg-white p-4 rounded-md grid gap-4">
      {/* <GeneralTable
        tableHead={tableHead}
        title="Tutors"
        total="13"
        results={tutors}
        collectionName="tutors"
      /> */}
      <TutorTable tutors={tutors} update={getUsers} onEdit={onEdit} />
      <div className="px-4 rounded-md   bg-white">
        <p className="my-4 text-center"> Add a Tutor</p>
        <Formik
          enableReinitialize
          // initialValues={{
          //   age: "",
          //   dob: "",
          //   // email: user.email,
          //   fullName: "",
          //   phone: "",
          // }}
          initialValues={editTutor || {}}
          // validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            editTutor.fullName ? onSubmitEdited(values) : submitHandler(values);
            //  setSubmitting(false)
          }}
        >
          <Form
          // onSubmit={(values) => {
          //   values.preventDefault();
          //   editTutor.fullName
          //     ? onSubmitEdited(values)
          //     : submitHandler(values);
          // }}
          >
            <div className="my-4">
              <AppInputText
                type="text"
                placeholder="Full Name"
                inputName="fullName"
                inputLabel="Full Name"
                required
              />
              <AppInputText
                type="text"
                placeholder="Email"
                inputName="email"
                inputLabel="Email"
                required
              />

              <AppInputText
                type="number"
                placeholder="Age"
                inputName="age"
                inputLabel="Age"
                required
              />
              <AppInputText
                type="number"
                placeholder="Payment Due"
                inputName="paymentDue"
                inputLabel="Payment Due"
                required
              />
              <AppInputText
                type="date"
                placeholder="Date Of Birth"
                inputName="dob"
                inputLabel="Date Of Birth"
                required
              />
              <AppInputText
                type="text"
                placeholder="Phone"
                inputName="phone"
                inputLabel="Phone"
                required
              />

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

export default TutorsScreen;

const TutorTable = ({ tutors, onEdit, update }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState(tutors);

  useEffect(() => {
    if (!value) {
      setFilteredData(tutors);
    } else {
      setFilteredData(tutors.filter((item) => item.fullName.includes(value)));
    }
  }, [value]);

  const deleteData = async (id) => {
    setLoading(true);
    try {
      const dataDoc = doc(db, "tutors", id);
      await deleteDoc(dataDoc);
      setLoading(false);
      router.push("/");
      enqueueSnackbar("Item Successfully deleted.", {
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
          <h1 className="text-xl font-semibold ">Tutors</h1>
          <p className="font-light">{tutors.length} total</p>
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
          {filteredData.map((tutor) => (
            <tr className={styles.tr} style={{ textAlign: "center" }}>
              <td>{tutor.fullName || "hello"}</td>
              <td>{tutor.email}</td>
              <td>{tutor.phone || "Value Not Found."}</td>
              <td>{tutor.paymentDue}</td>

              <td>
                <div className="flex justify-between gap-4 px-2 items-center">
                  <a
                    href="#"
                    className={`font-medium text-secondary `}
                    onClick={() => onEdit(tutor)}
                  >
                    {/* {title === "Students" ? <Modal /> : "Edit"} */}
                    Edit
                  </a>

                  <button
                    onClick={() => {
                      deleteData(tutor.id);
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
