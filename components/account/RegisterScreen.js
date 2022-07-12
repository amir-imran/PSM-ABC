import { AppInputText } from "./AppInputText";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const validationSchema = Yup.object().shape({
  displayName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .label("Password")
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const RegisterScreen = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { user, signup } = useAuth();
  useEffect(() => {
    if (user) {
      router.push("/student");
    }
  }, []);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await signup(email, password);

      enqueueSnackbar("Successfully Signed Up", {
        variant: "success",
        autoHideDuration: 3000,
      });
      router.push("/profile");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          enqueueSnackbar("Email already in use", {
            variant: "error",
            autoHideDuration: 3000,
          });
          break;
        case "auth/invalid-email":
          enqueueSnackbar("Invalid email address", {
            variant: "error",
            autoHideDuration: 3000,
          });
          break;
        case "auth/weak-password":
          enqueueSnackbar("Password is too weak", {
            variant: "error",
            autoHideDuration: 3000,
          });
          break;
        default:
          enqueueSnackbar(err.message, {
            variant: "error",
            autoHideDuration: 3000,
          });
      }
    }
  };
  return (
    <>
      <div className=" text-left rounded grid md:grid-cols-2 grid-cols-1 min-h-[85vh] bg-white  text-black">
        <div className="flex flex-col justify-center bg-black md:px-0 px-4 rounded">
          <div className="md:max-w-full container mx-auto">
            <p className="text-center ">
              <Image
                src="/account.svg"
                width={300}
                height={300}
                objectFit="contain"
                alt="logo"
              />
            </p>{" "}
            <p className="md:pl-20 text-gray-300 leading-loose tracking-wider my-4">
              "Let us remember: One book, one pen, one child and one teacher can
              change the world"
            </p>
          </div>
        </div>
        <div className="sm:px-0 px-4  md:max-w-sm container mx-auto md:my-0  my-4 flex flex-col justify-center">
          <h3 className="text-2xl font-bold ">
            <span className="text-darkViolet">Register </span> Now
          </h3>
          <Formik
            initialValues={{
              displayName: "",
              passwordConfirmation: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              submitHandler(values);
              setSubmitting(false);
            }}
          >
            <Form action="">
              <div className="my-4 md:grid md:grid-cols-2 gap-4">
                <AppInputText
                  type="text"
                  placeholder="Name"
                  inputName="displayName"
                  inputLabel="Name"
                />
                <AppInputText
                  type="text"
                  placeholder="Email"
                  inputName="email"
                  inputLabel="Email"
                />
                <AppInputText
                  type="password"
                  placeholder="Password"
                  inputName="password"
                  inputLabel="Password"
                />

                <AppInputText
                  type="password"
                  placeholder="Confirm Password"
                  inputName="passwordConfirmation"
                  inputLabel="Password"
                />
                <div className="flex items-baseline justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2 mt-4 text-white bg-secondary rounded-lg hover:bg-blue-700"
                  >
                    Register
                  </button>
                </div>
                <div className="my-4 text-noir">
                  <p>
                    Already have an account?{" "}
                    <span className="text-secondary hover:underline underline-offset-2">
                      <Link href={`/account/login`}>Sign in</Link>
                    </span>{" "}
                  </p>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
