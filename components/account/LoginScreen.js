import { AppInputText } from "./AppInputText";
import { Formik, Form } from "formik";

import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const LoginScreen = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { user, login } = useAuth();
  useEffect(() => {
    if (user) {
      if (user.admin) {
        router.push("/");
      }
      if (!user.admin) {
        router.push("/student");
      }
    }
    // router.push("/student")
    // if (user) {
    //   // if (userInfo.isAdmin !== true) router.push("/student")
    //   router.push("/student")
    // }
  }, []);

  const submitHandler = async ({ email, password }) => {
    try {
      await login(email, password);
      enqueueSnackbar("Successfully Logged In", {
        variant: "success",
        autoHideDuration: 3000,
      });

      router.push("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          enqueueSnackbar("Invalid email address", {
            variant: "error",
            autoHideDuration: 3000,
          });
          break;
        case "auth/user-not-found":
          enqueueSnackbar("User not found", {
            variant: "error",
            autoHideDuration: 3000,
          });
          break;
        case "auth/wrong-password":
          enqueueSnackbar("Wrong password", {
            variant: "error",
            autoHideDuration: 3000,
          });
          break;
        default:
          enqueueSnackbar(err.message, {
            variant: "error",
            autoHideDuration: 3000,
          });
          break;
      }
    }
  };
  return (
    <>
      <div className="text-left  grid md:grid-cols-2 grid-cols-1 min-h-[85vh] bg-white rounded text-noir">
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
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              submitHandler(values);
              setSubmitting(false);
            }}
          >
            <Form>
              <div className="my-4">
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
                <div className="flex items-baseline justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2 mt-4 text-white bg-secondary rounded-lg hover:bg-blue-700"
                  >
                    login
                  </button>
                  <a
                    href="#"
                    className="text-sm text-secondary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="my-4 text-noir">
                  <p>
                    Don{"'"}t have an account?{" "}
                    <span className="text-secondary hover:underline underline-offset-2">
                      <Link href={`/account/register`}>Register</Link>
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

export default LoginScreen;
