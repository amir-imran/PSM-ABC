import Link from "next/link";
import React, { useState, useEffect } from "react";
import Calendar from "../Calendar";
import Events from "../Events";
import Icon from "../Icon";
import { useAuth } from "../../context/AuthContext";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

const Schedule = () => {
  let [events, setEvents] = useState([]);
  let [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(true);
  const { user } = useAuth();

  const getEvents = async (cuser) => {
    const querySnapshot = await getDocs(collection(db, "classes"));
    let repeat = [];
    querySnapshot.docs.map((doc, idx) => {
      console.log(cuser.classeId);
      if (cuser.classeId.includes(doc.id)) {
        events.push({ id: doc.id, ...doc.data() });
      }
    });
    querySnapshot.docs.map((doc, idx) => {
      const data = doc.data();
      repeat.push(Number(data.repeat));
    });
  };

  const getUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let cuser;
    const date = new Date();
    querySnapshot.docs.map((doc, idx) => {
      const data = { ...doc.data(), id: doc.id };

      if (data.email === user.email) {
        cuser = data;
        setCurrentUser(data);
      }
    });
    return cuser;
  };

  useEffect(async () => {
    const cuser = await getUser();
    await getEvents(cuser);
    setLoading(false);
  }, []);

  const range = (min, max) =>
    Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <>
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
        <div className="md:col-span-3">
          <Calendar />
        </div>
        <div className="bg-white rounded-md p-4 relative">
          <h1 className="text-xl font-black">Today's Events</h1>
          <div className=" gap-4 mt-4 grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 ">
            {/* <Events title="update tuition" subTitle="01:00PM-02:00PM" />
            <Events title="Canceled Class" subTitle="02:00PM-03:00PM" />
            <Events title="Something Else" subTitle="05:00PM-07:00PM" /> */}

            {!loading ? (
              events.map((event, idx) => {
                if (event) {
                  if (event.startDate.split("-")[0] == new Date().getDate())
                    return (
                      <Events
                        title={event.name}
                        subTitle={`${event.startTime} - ${event.endTime}`}
                      />
                    );
                }
              })
            ) : (
              <>Loading...</>
            )}

            <p className="absolute bottom-4 left-4 text-secondary hover:underline p-1">
              <Link href="/">View all notifications</Link>{" "}
              <Icon name="fa-circle-exclamation" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
