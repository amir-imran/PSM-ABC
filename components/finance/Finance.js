import React from "react";
import LineChart from "../LineChart";
import EarningsCard from "../dashboard/EarningsCard";
import PieChart from "../PieChart";
import FinanceTable from "./FinanceTable";

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const Finance = () => {
  const [loading, setLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState(false);

  const [expenses, setExpenses] = React.useState(0);
  const [income, setIncome] = React.useState(0);

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

  React.useEffect(async () => {
    await getTransactions();
    setLoading(false);
  }, []);

  return (
    <>
      <div className="text-black  grid md:grid-cols-4 gap-4 sm:grid-cols-3 grid-cols-1">
        <div className="md:col-span-3 sm:col-span-2 bg-white  rounded">
          <div className="flex justify-between bg-black text-primary p-2 rounded-t">
            <div>Revenue</div>
            <div>Jan-Jul</div>
          </div>
          <div className="p-4">
            <LineChart />
          </div>
        </div>

        <div className="">
          <p className="bg-black text-primary py-2 text-center rounded-t">
            Statistics
          </p>
          <div className=" bg-white p-4 rounded grid gap-4">
            <EarningsCard
              title={"RM" + income}
              subTitle="Income"
              iconName="fa-inbox"
            />
            <EarningsCard
              title={"RM" + expenses}
              subTitle="Expense"
              iconName="fa-circle-dollar-to-slot"
            />
            <EarningsCard
              title={"RM" + Number(income - expenses)}
              subTitle="Revenue"
              iconName="fa-trophy"
            />
          </div>
          <div className="  bg-white  rounded grid gap-4 mt-4">
            <div className="w-full overflow-scroll">
              <div className="bg-black py-2 text-center rounded-t text-primary">
                Graph
              </div>
              <div className="p-4">
                <PieChart data={[income, expenses]} />
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-full bg-white p-4 rounded">
          <FinanceTable />
        </div>
      </div>
    </>
  );
};

export default Finance;
