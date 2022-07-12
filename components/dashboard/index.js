import React, { useEffect, useState } from "react";
import Calendar from "../Calendar";
import CardStats from "../dashboard/CardStat";
import EarningsCard from "../dashboard/EarningsCard";
import Events from "../Events";
import Feedback from "../dashboard/Feedback";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

const DashboardScreen = () => {
  let [events, setEvents] = useState([]);
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [currentUser, setUser] = useState({});
  const { user } = useAuth();
  const [transactions, setTransactions] = React.useState(false);

  const [expenses, setExpenses] = React.useState(0);
  const [income, setIncome] = React.useState(0);

  const getData = async () => {
    const classes = await getDocs(collection(db, "classes")).then((snap) => {
      return snap.size; // will return the collection size
    });
    const students = await getDocs(collection(db, "users")).then((snap) => {
      return snap.size; // will return the collection size
    });
    const tutors = await getDocs(collection(db, "tutors")).then((snap) => {
      return snap.size; // will return the collection size
    });
    infos.push({
      classes: classes,
      students: students,
      tutors: tutors,
    });
    console.log(infos);
  };

  const getEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "classes"));
    let repeat = [];
    let classes = [];

    if (!user.admin) {
      const students = await getDocs(collection(db, "users"));
      students.docs.map((stud) => {
        const data = stud.data();

        if (data.email === user.email) {
          classes = data.classeId;
        }
      });

      querySnapshot.docs.map((doc, idx) => {
        const data = { id: doc.id, ...doc.data() };
        console.log(classes);
        if (classes.indexOf(data.id) !== -1) {
          repeat.push(Number(data.repeat));
          setEvents(
            querySnapshot.docs.map((doc, idx) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      });
    } else {
      setEvents(
        querySnapshot.docs.map((doc, idx) => ({ id: doc.id, ...doc.data() }))
      );
    }
  };

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.docs.map((doc) => {
      if (doc.data().email === user.email) {
        setUser({ id: doc.id, ...doc.data() });
      }
    });
  };

  const getFeedback = async () => {
    const querySnapshot = await getDocs(collection(db, "feedbacks"));

    setFeedback(
      querySnapshot.docs.map((doc, idx) => ({
        id: doc.id,
        ...doc.data(),
        doc: doc,
      }))
    );
  };

  const getTransactions = async () => {
    const docs = await getDocs(collection(db, "transaction"));
    const transactions = docs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTransactions(transactions);

    const incomeArray = [];
    const expenseArray = [];

    transactions.map((transaction) => {
      if (transaction.type === "Income") {
        incomeArray.push(Number(transaction.amount));
      }
      if (transaction.type === "Expense")
        expenseArray.push(Number(transaction.amount));
    });

    setIncome(incomeArray.reduce((a, b) => a + b));
    setExpenses(expenseArray.reduce((a, b) => a + b));
  };

  useEffect(async () => {
    await getEvents();
    await getUsers();
    await getData();
    await getFeedback();
    await getTransactions();
    setLoading(false);
  }, []);

  const range = (min, max) =>
    Array.from({ length: max - min + 1 }, (_, i) => min + i);

  if (loading) return <>Loading...</>;

  return (
    <>
      {currentUser.paymentDue ? (
        <>
          <br />
          <div className="bg-red-200 text-red-800 border-red-800 border-[2px] rounded-lg w-full p-4">
            Payment Due found, Please clear you dues as soon as possible, Total
            Dues: {currentUser.paymentDue}
          </div>
          <br />
        </>
      ) : (
        <></>
      )}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mb-4 ">
        <CardStats
          iconName="fa-book"
          statSubtitle="classes"
          statTitle={infos[0].classes}
        />
        <CardStats
          iconName="fa-users"
          statSubtitle="students"
          statTitle={infos[0].students}
        />
        <CardStats
          iconName="fa-person-chalkboard"
          statSubtitle="tutors"
          statTitle={infos[0].tutors}
        />
        <CardStats
          iconName="fa-circle-dollar-to-slot"
          statSubtitle="Revenue"
          statTitle={Number(income - expenses)}
        />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
        <div className="md:col-span-3">
          <Calendar />
        </div>
        <div className="bg-white rounded-md p-4 ">
          <h1 className="text-xl font-black">Today's Events</h1>
          <div className=" gap-4 mt-4 grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 ">
            {events.map((event, idx) => {
              const date = event.startDate.split("-")[2];

              if (date == new Date().getDate())
                return (
                  <Events
                    title={event.name}
                    subTitle={`${event.startTime} - ${event.endTime}`}
                  />
                );
            })}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 mt-4 grid-cols-1 gap-4 h-full">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
          <Feedback feedbacks={feedback} limit={5} />
          <div className="grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4 bg-white p-4 rounded-md">
            <EarningsCard
              iconName="fa-chart-simple"
              subTitle="Earnings"
              title={"RM" + income}
            />
            <EarningsCard
              iconName="fa-money-check"
              subTitle="Expenses"
              title={"RM" + expenses}
            />
          </div>
        </div>
        <div className="">
          <div className="bg-white rounded-md p-4 ">
            <h1 className="text-xl font-black">All Events</h1>
            <div className=" grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
              {!loading ? (
                events.map((event) => (
                  <Events
                    title={event.name}
                    subTitle={`${event.startTime} - ${event.endTime}`}
                  />
                ))
              ) : (
                <>Loading...</>
              )}
            </div>
          </div>
        </div>
        {!user.admin && (
          <div className="">
            <div className="bg-white rounded-md p-4 ">
              <h1 className="text-xl font-black">Student Performance</h1>
              <div className=" grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                Performance: {currentUser.performance}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardScreen;
