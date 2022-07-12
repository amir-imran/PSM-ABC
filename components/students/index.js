import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import Icon from "../Icon";
import GeneralTable from "../tables/GeneralTable";
import { AppInputText } from "../account/AppInputText";
import SelectGrade from "../account/SelectGrade";
import SelectGender from "../account/SelectGender";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";

import * as Yup from "yup";
import { addDoc, collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";

const validationSchema = Yup.object().shape({
  age: Yup.number(),
  dob: Yup.date(),
  // email: Yup.string().email("Invalid email address").required("Required"),
  fullName: Yup.string(),
  grade: Yup.string().nullable(),
  phone: Yup.string(),
  gender: Yup.string().nullable(),
});

const tableHead = {
  // id: "ID",
  fullName: "Name",
  grade: "Grade",
  paymentDue: "Payment Dues",
  icNumber: "IC Number",
  performance: "Performance",
  actions: "actions",
};
const StudentsScreen = ({}) => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const usersCollectionRef = collection(db, "users");

  const [selectedGender, setSelectedGender] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [editUser, setEditUser] = useState({});

  const handleSelectedGender = (selectedGender) => {
    setSelectedGender(selectedGender);
  };
  const handleSelectedGrade = (selectedGrade) => {
    setSelectedGrade(selectedGrade);
  };
  useEffect(() => {
    handleSelectedGender(selectedGender);
    handleSelectedGrade(selectedGrade);
    console.log("changed to: ", selectedGrade);
  }, [selectedGender, selectedGrade]);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsersInfo(
      data.docs

        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((u) => "grade" in u)
    );
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const studentsCollectionRef = collection(db, "users");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const submitHandler = async (values) => {
    const data = {
      ...values,
      gender: selectedGender,
      grade: selectedGrade,
    };
    try {
      await addDoc(studentsCollectionRef, data);
      enqueueSnackbar("Students Successfully Added.", {
        variant: "success",
        autoHideDuration: 3000,
      });
      router.push("/modules/student");
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    // console.log(values)
  };
  const onSubmitEdited = async (values) => {
    const data = {
      ...values,
      gender: selectedGender || null,
      grade: selectedGrade || null,
    };
    try {
      const userRef = doc(db, "users", editUser.id);
      await setDoc(userRef, data, { merge: true });
      enqueueSnackbar("Student Successfully Updated.", {
        variant: "success",
        autoHideDuration: 3000,
      });
      getUsers();
      setEditUser({});
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    // console.log(values)
  };

  const onEdit = (user) => {
    setEditUser({});
    setEditUser(user);
  };

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

  return (
    <div className="grid gap-4">
      <GeneralTable
        tableHead={tableHead}
        title="Students"
        total={usersInfo.length}
        results={usersInfo}
        collectionName="students"
        update={getUsers}
        onEdit={onEdit}
      />
      <div className="px-4 rounded-md   bg-white">
        <p className="my-4 text-center"> Add a Student</p>
        <Formik
          enableReinitialize
          // initialValues={{
          //   age: editUser.age || "",
          //   dob: editUser.dob || "",
          //   // email: user.email,
          //   fullName: editUser.fullName || "",
          //   grade: editUser.grade || "",
          //   phone: editUser.phone || "",
          //   gender: editUser.gender || "",
          //   icNumber: editUser.icNumber || "",
          // }}
          initialValues={editUser || {}}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            editUser.fullName ? onSubmitEdited(values) : submitHandler(values);
            //   console.log(values)
            //  setSubmitting(false)
          }}
        >
          <Form>
            <div className="my-4">
              <AppInputText
                type="text"
                placeholder="Full Name"
                inputName="fullName"
                inputLabel="Full Name"
              />
              <AppInputText
                type="text"
                placeholder="Email"
                inputName="email"
                inputLabel="Email"
              />

              <AppInputText
                type="number"
                placeholder="Age"
                inputName="age"
                inputLabel="Age"
              />
              <AppInputText
                type="number"
                placeholder="IC Number"
                inputName="icNumber"
                inputLabel="IC Number"
              />
              <AppInputText
                type="number"
                placeholder="PaymentDue"
                inputName="paymentDue"
                inputLabel="PaymentDue"
              />
              <AppInputText
                type="date"
                placeholder="Date Of Birth"
                inputName="dob"
                inputLabel="Date Of Birth"
              />
              <AppInputText
                type="text"
                placeholder="Phone"
                inputName="phone"
                inputLabel="Phone"
              />
              <SelectGrade
                handleSelected={handleSelectedGrade}
                selected={selectedGrade}
              />
              <SelectGender
                handleSelected={handleSelectedGender}
                selected={selectedGender}
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

export default StudentsScreen;
