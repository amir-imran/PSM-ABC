import React from "react";
import Calendar from "../Calendar";
import Events from "../Events";

import { useState, useEffect } from "react";
import { setDoc, doc, getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import { Form, Formik } from "formik";
import { AppInputText } from "../account/AppInputText";

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

const days = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

const Schedule = () => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [repeat, setRepeat] = useState(null);
  const [type, setType] = useState("normal");
  const [end, setEnd] = useState("");
  const [grade, setGrade] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  const [loading, setLoading] = useState(false);

  let [events, setEvents] = useState([]);
  const [eventLoading, setEventLoading] = useState(true);

  const getEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "classes"));

    const date = new Date();
    setEvents(
      querySnapshot.docs.map((doc, idx) => ({ id: doc.id, ...doc.data() }))
    );

    console.log(events);
    setEventLoading(false);
  };

  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }

  const AddEvent = async (values) => {
    setLoading(true);

    const data = {
      name: values.title,
      startDate: values.date,
      endDate: values.date,
      startTime: values.timeStart,
      endTime: values.timeEnd,
      grade: values.grade,
      // repeat,
      day: days[values.day],
    };

    await addDoc(collection(db, "classes"), data);

    setLoading(false);
    window.location.reload();
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="">
      <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-4">
        <div className="md:col-span-3 sm:col-span-2 col-span-1">
          <Calendar />
        </div>
        <div className="bg-white rounded-md p-4 md:col-span-2 col-span-1">
          <h1 className="text-xl font-black">Scheduled Events</h1>
          <div className=" gap-4 mt-4 grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 ">
            {console.log(events)}
            {eventLoading ? (
              <>Loading...</>
            ) : (
              events.map((event) => (
                <Events
                  key={event.id}
                  title={event.name}
                  subTitle={`${event.startTime} - ${event.endTime}`}
                />
              ))
            )}
          </div>
          <br />
          <div>
            <h1 className="text-xl font-black">Add Events</h1>
            <Formik
              initialValues={{ grade: "Year 1", day: "Monday" }}
              onSubmit={(values, { setSubmitting }) => {
                AddEvent(values);
                console.log("data", values);
              }}
            >
              <Form
              // className="w-full gap-4 mt-4  transition-all"
              // onSubmit={AddEvent}
              >
                <div className="gap-4 flex w-full">
                  <AppInputText
                    className="p-2 border-[1px] rounded-xl ring-1 ring-black w-full"
                    type="string"
                    required
                    placeholder="Title"
                    inputName="title"
                    inputLabel="Title"
                  />
                </div>
                <>
                  <div className="gap-4 flex">
                    <AppInputText
                      type="string"
                      required
                      type="date"
                      placeholder="Date"
                      inputName="date"
                      inputLabel="Date"
                    />
                    <AppInputText
                      as="select"
                      required
                      placeholder="Grade"
                      inputName="grade"
                      inputLabel="Grade"
                    >
                      {yearGrade.map((grade) => (
                        <option>{grade}</option>
                      ))}
                    </AppInputText>
                  </div>
                  <div className="gap-4 flex">
                    <AppInputText
                      className="p-2 border-[1px] w-full rounded-xl ring-1 ring-black "
                      placeholder="Time Start"
                      inputName="timeStart"
                      inputLabel="Time Start"
                      type="time"
                      required
                      // onChange={(e) => setTimeStart(e.target.value)}
                    />
                    <AppInputText
                      className="p-2 border-[1px] w-full rounded-xl ring-1 ring-black "
                      placeholder="Time End"
                      inputName="timeEnd"
                      inputLabel="Time End"
                      type="time"
                      required
                      // onChange={(e) => setTimeEnd(e.target.value)}
                    />
                  </div>

                  <AppInputText
                    as="select"
                    required
                    placeholder="Day"
                    inputName="day"
                    inputLabel="Day"
                  >
                    {Object.keys(days).map((day) => (
                      <option>{day}</option>
                    ))}
                  </AppInputText>
                </>
                <br />
                <button
                  className="bg-[#1f2937] hover:bg-[#303742] p-2 text-white rounded-xl transition-all w-full"
                  type="submit"
                  disabled={loading}
                >
                  Add
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
