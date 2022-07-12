import React, { useState, useEffect } from "react";
import Events from "../../Events";
import Icon from "../../Icon";
import EarningsCard from "../../dashboard/EarningsCard";
import Calendar from "../../Calendar";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/AuthContext";
import { useSnackbar } from "notistack";
import { db } from "../../../config/firebase";

const Student = () => {
  const [feedback, setFeedback] = useState("");
  const feedbackCollectionsRef = collection(db, "feedbacks");
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [currentUser, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  // user.
  const addFeedback = async (e) => {
    try {
      await addDoc(feedbackCollectionsRef, {
        email: user.email,
        id: user.uid,
        feedback: feedback,
      });
      e.value = "";
      enqueueSnackbar("Feedback Added ", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      enqueueSnackbar(`Post failed ${error}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const getUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let cuser;
    querySnapshot.docs.map((doc) => {
      if (doc.data().email === user.email) {
        console.log(doc.data());
        setUser({ id: doc.id, ...doc.data() });
        cuser = { id: doc.id, ...doc.data() };
      }
    });
    setUserLoading(false);
    return cuser;
  };

  let [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEvents = async (cuser) => {
    const querySnapshot = await getDocs(collection(db, "classes"));

    querySnapshot.docs.map((doc, idx) => {
      if (cuser?.classeId?.includes(doc.id)) {
        events.push({ id: doc.id, ...doc.data() });
      }
    });

    console.log(events);
    setLoading(false);
  };

  useEffect(async () => {
    const cuser = await getUser();
    await getEvents(cuser);
  }, []);

  const range = (min, max) =>
    Array.from({ length: max - min + 1 }, (_, i) => min + i);

  if (userLoading) return <>Loading...</>;

  return (
    <div>
      {!userLoading ? (
        <>
          {currentUser.paymentDue ? (
            <div className="bg-white p-2 rounded text-xl font-semibold">
              <span>
                <Icon name="fa-circle-exclamation" color="#ef4444" />{" "}
              </span>{" "}
              Outstanding Payment! Please pay the due before account
              termination.{" "}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>loading...</>
      )}
      <div className="my-4 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-4">
        <div className="big md:col-span-3 md:p4 sm:col-span-2 grid gap-4">
          <div className="big1 bg-white rounded-md p-2 px-4 py-8 grid gap-4 md:grid-cols-3 grid-cols-1 justify-center items-center shadow">
            <div className=" md:col-span-2 col-span-1 ">
              <p className="text-xl font-semibold">
                Welcome back, {user.email.split("@")[0]}!
              </p>
              <p className="text-xl font-semibold mt-4">
                Hope you have a good day {":)"}
              </p>
            </div>
            <div className=" col-span-1">
              {!userLoading ? (
                <>
                  <EarningsCard
                    title={"RM" + String(currentUser.paymentDue)}
                    subTitle="Payment Due"
                  />
                </>
              ) : (
                <>Loading...</>
              )}
            </div>
          </div>
          <div className="big2 bg-whiterounded-md shadow">
            <Calendar />
          </div>
        </div>
        <div className="small md:col-span-2  grid gap-4">
          <div className="md:p4 p-2 bg-white rounded-md shadow">
            <h1 className="text-xl font-black">Today's Events</h1>
            <div className=" gap-x-4 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 ">
              {!loading ? (
                events.map((event, idx) => {
                  const date = event.startDate.split("-")[2];

                  // console.clear();
                  console.log(date, new Date().getDate());

                  if (date == new Date().getDate())
                    return (
                      <Events
                        title={event.name}
                        subTitle={`${event.startTime} - ${event.endTime}`}
                      />
                    );
                })
              ) : (
                <>Loading...</>
              )}
            </div>
          </div>
          <form className="bg-white shadow rounded-md md:p4 p-2 flex flex-col">
            <h1 className="text-xl  font-black my-4">
              Enter a feed back here...
            </h1>
            <div className=" ">
              <textarea
                onChange={(event) => setFeedback(event.target.value)}
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                placeholder="Your Feedback..."
              ></textarea>
            </div>
            <button
              type="button"
              className="inline-flex mt-8 justify-center rounded-md border border-transparent bg-secondary text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              onClick={(e) => {
                addFeedback(e);
              }}
            >
              submit
            </button>
            <br />
          </form>
          <div className="bg-white shadow rounded-md md:p4 p-2 flex flex-col">
            <h1 className="text-xl font-black">Student Performance</h1>
            <div className=" grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
              <p className="text-lg">
                {currentUser.performance || "Not Available"}
                <div />
                Comment: {currentUser.comment || "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
