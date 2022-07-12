import React from "react";
import Modal from "react-modal";

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import { formatDate } from "@fullcalendar/core";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const FinanceTable = () => {
  if (window) {
    Modal.setAppElement(document.createElement("div"));
  }
  const [loading, setLoading] = React.useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [type, setType] = React.useState("");

  const [transactions, setTransactions] = React.useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let date = formatDate(new Date(), {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
    const obj = { name, amount, type, date };

    await addDoc(collection(db, "transaction"), obj);
    closeModal();
    getTransactions();
  };

  const getTransactions = async () => {
    const docs = await getDocs(collection(db, "transaction"));
    let trans = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    trans = trans.sort(
      (a, b) =>
        Number(a.date.split(" ")[1].split(",")[0]) -
        Number(b.date.split(" ")[1].split(",")[0])
    );
    trans = trans.reverse();
    setTransactions(trans);
  };

  React.useEffect(async () => {
    await getTransactions();
    setLoading(false);
  }, []);

  return (
    <div id="app">
      <button
        onClick={openModal}
        className=" bg-slate-800 text-white p-4 w-full mb-2 rounded-xl"
      >
        Add Transaction
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 className="text-xl text-center font-bold">Add Transaction</h1>
        <button onClick={closeModal} className="absolute right-4 top-5">
          X
        </button>
        <br />
        <form className="flex flex-col gap-2 w-[500px]" onSubmit={onSubmit}>
          <input
            placeholder="Name"
            className="p-4 bg-slate-800 text-white rounded-xl"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="flex w-full gap-2">
            <input
              placeholder="Amount"
              className="p-4 bg-slate-800 text-white rounded-xl w-full"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            {console.log(type)}
            <select
              name="Type"
              className="p-4 bg-slate-800 text-white rounded-xl w-full"
              required
              onChange={(e) => setType(e.target.value)}
            >
              <option value="null" default>
                Select Type
              </option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <hr />
          <button
            className="p-4 border-[2px] border-slate-800 text-slate-800 rounded-xl w-full font-bold"
            type="submit"
          >
            Add
          </button>
        </form>
      </Modal>
      <table className="table-auto w-full bg-primary/90 rounded-t">
        <thead className="text-xs text-gray-700 uppercase bg-black rounded-t">
          <tr className="text-white border-b text-left">
            <th scope="col" className="px-6 py-3">
              Transactions
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="text-left">
          {!loading ? (
            transactions.map((transaction) => (
              <tr className="text-black border-b">
                <th
                  scope="row"
                  className="px-3 truncate py-4 font-medium text-black  whitespace-nowrap"
                >
                  {transaction.name}
                </th>
                <td className="px-3 truncate py-4">RM {transaction.amount}</td>
                <td className="px-3 truncate py-4">{transaction.type}</td>
                <td className="px-3 truncate py-4">{transaction.date}</td>
              </tr>
            ))
          ) : (
            <>Loading...</>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceTable;
