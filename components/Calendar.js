import FullCalendar, { formatDate } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";

import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

const Calendar = () => {
  let [events, setEvents] = useState([]);
  let { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "classes"));
    let repeat = [];
    let classes = [];

    if (!user.admin) {
      const students = await getDocs(collection(db, "users"));
      students.docs.map((doc) => {
        const stud = doc.data();

        if (stud.email === user.email) {
          stud?.classeId?.map((classe) => {
            classes.push(classe);
          });
        }
      });

      querySnapshot.docs.map((doc, idx) => {
        const data = { ...doc.data(), id: doc.id };
        // if (doc.id === "V5G0Ro1mq2Ww6M661Va1") console.log(doc.data());
        // console.log(classes, data.id);
        if (classes.indexOf(data.id) !== -1) {
          repeat.push(Number(data.repeat));
          events.push({
            title: data.name,
            startTime: `${data.startTime}`,
            endTime: `${data.endTime}`,
            daysOfWeek: data.day ? [data.day] : null,
            start: data.startDate,
            end: data.endDate,
          });
        }
      });
    } else {
      querySnapshot.docs.map((doc, idx) => {
        const data = doc.data();
        repeat.push(Number(data.repeat));
        events.push({
          title: data.name,
          startTime: `${data.startTime}`,
          endTime: `${data.endTime}`,
          daysOfWeek: data.day ? [data.day] : null,
          start: data.startDate,
          end: data.endDate,
          // startRecur: data.startDate,
          // endRecur: data.endDate,
        });
      });
    }
  };

  useEffect(async () => {
    await getEvents();
    setLoading(false);

    return () => setEvents([]);
  }, []);

  return (
    <div className="bg-white p-4 rounded-md min-h-96 overflow-scroll min-w-[400px] ">
      {!loading ? (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            events={events}
          />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Calendar;
