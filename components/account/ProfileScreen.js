import SelectGender from "./SelectGender";
import SelectGrade from "./SelectGrade";

import { AppInputText } from "./AppInputText";
import { Formik, Form } from "formik";

import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import {
  doc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import * as Yup from "yup";
import Image from "next/image";
import { db } from "../../config/firebase";

const validationSchema = Yup.object().shape({
  age: Yup.number(),
  dob: Yup.date(),
  // email: Yup.string().email("Invalid email address").required("Required"),
  fullName: Yup.string(),
  grade: Yup.string(),
  phone: Yup.string(),
  gender: Yup.string(),
  icNumber: Yup.string(),
});

const LoginScreen = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const handleSelectedGender = (selectedGender) => {
    setSelectedGender(selectedGender);
  };
  const handleSelectedGrade = (selectedGrade) => {
    setSelectedGrade(selectedGrade);
  };

  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getUsers();
  }, []);
  useEffect(() => {
    handleSelectedGender(selectedGender);
    handleSelectedGrade(selectedGrade);
  }, [selectedGender, selectedGrade]);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { user } = useAuth();

  const displayedName = user?.email.slice(0, user.email.indexOf("@"));
  const singleUserInfo = usersInfo.find((u) => u.email === user?.email);
  const submitHandler = async (values) => {
    const data = {
      ...values,
      paymentDue: 0,
      email: user.email,
      gender: selectedGender,
      grade: selectedGrade,
    };
    const studentsDoc = doc(db, "users", singleUserInfo.id);
    try {
      await updateDoc(studentsDoc, data);
      enqueueSnackbar("Profile Successfully Updated.", {
        variant: "success",
        autoHideDuration: 3000,
      });
      router.push("/student");
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  return (
    <>
      <div className="text-left p-4 grid items-start md:grid-cols-3 sm:grid-cols-2 grid-cols-1 min-h-[85vh] bg-white rounded text-noir">
        <div className="flex border flex-col justify-center  md:px-0  col-span-1  ">
          <div className=" container mx-auto">
            <div className=" leading-loose tracking-wider mb-4  p-4 bg-primary text-black">
              <h1 className="text-xl font-black">Profile</h1>
              <p className="text-lg font-semibold ">Personal information</p>
            </div>
            <p className="text-center  rounded-full ">
              <Image
                src="/avatar.svg"
                width={150}
                height={150}
                objectFit="contain"
                alt="logo"
                className="rounded-full h-[180] w-[180] bg-black"
              />
            </p>{" "}
            <div className="flex justify-center text-center flex-col mt-4">
              <p className=" font-black">{displayedName}</p>
              <p>You can change your user Info</p>
            </div>
          </div>
        </div>
        <div className="sm:px-0  p-4 px-4 md:col-span-2 clo-span-1  md:max-w-sm container mx-auto md:my-0  my-4 flex flex-col justify-center">
          <Formik
            initialValues={{
              age: singleUserInfo?.age ? singleUserInfo.age : "",
              dob: singleUserInfo?.dob ? singleUserInfo.dob : "10/10/1900",
              // email: user.email,
              fullName: singleUserInfo?.name ? singleUserInfo.name : "",
              grade: singleUserInfo?.grade ? singleUserInfo.grade : "",
              phone: singleUserInfo?.phone ? singleUserInfo.phone : "",
              gender: singleUserInfo?.gender ? singleUserInfo.gender : "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              submitHandler(values);
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
    </>
  );
};

export default LoginScreen;
