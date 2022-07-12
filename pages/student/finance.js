import React from "react";
import { getDocs, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

const Finance = () => {
  const inputStyles = "w-full p-4 rounded-xl bg-slate-600";
  const { enqueueSnackbar } = useSnackbar();
  const [cardNo, setCardNo] = React.useState(0);
  const [month, setMonth] = React.useState("");
  const [cvc, setCVC] = React.useState(0);
  const [currentUser, setUser] = React.useState({});
  const [userLoading, setUserLoading] = React.useState(true);
  const { user } = useAuth();

  const [err, setErr] = React.useState("");

  const getUser = async () => {
    let currentUser;
    const snap = await getDocs(collection(db, "users"));
    snap.docs.map((doc) => {
      if (doc.data().email === user.email) {
        currentUser = { id: doc.id, ...doc.data() };
      }
    });
    setUser(currentUser);
    return currentUser;
  };

  const updateUser = async () => {
    try {
      const currentUser = await getUser();

      const ref = doc(db, "users", currentUser.id);
      await setDoc(ref, { paymentDue: 0 }, { merge: true });
      enqueueSnackbar("Payment Successfully Paid.", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (err) {
      enqueueSnackbar("Payment Unsuccessfull, " + err.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  React.useEffect(async () => {
    await getUser();
    setUserLoading(false);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (cardNo.length !== 16) {
      return setErr("Invalid Card No.");
    }

    if (cvc.length !== 3) {
      return setErr("Invalid CVC");
    }
    updateUser();
  };

  return (
    <div className="w-full h-full flex gap-[50px]">
      <div className="w-[600px] h-full bg-slate-800 p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-white text-left mb-8">
          Pay Fees
        </h1>
        <hr />
        <br />
        <form className=" w-full flex flex-col gap-4" onSubmit={onSubmit}>
          <div className=" relative w-full flex flex-col gap-1">
            <div className="flex gap-2 items-center absolute top-[33px] left-[409px] bg-white p-2 rounded-lg">
              <img src="/visa.svg" className="w-[30px] h-full" />
              <img src="/mastercard.svg" className="w-[30px] h-full" />
              <img src="/amex.svg" className="w-[30px] h-full" />
            </div>
            <label className="text-white">Card Number:</label>
            <input
              placeholder="1234 1234 1234 1234"
              onChange={(e) => setCardNo(e.target.value)}
              className={inputStyles}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-white">Expiry:</label>
              <input
                placeholder="MM / YY"
                className={inputStyles}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-white">CVC:</label>

              <input
                placeholder="CVC"
                className={inputStyles}
                onChange={(e) => setCVC(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-[2px]" />
          <button
            className="bg-white font-bold text-1xl text-black p-2 rounded-xl"
            type="submit"
          >
            Pay
          </button>
          {err && (
            <>
              <div className="-mt-[2px] bg-red-400 border-red-600 border-[2px] text-white rounded-xl p-4">
                {err}
              </div>
            </>
          )}
        </form>
      </div>
      <div className="w-[400px] h-full bg-slate-800 p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-white text-left mb-8">
          Payment Dues
        </h1>
        <hr />
        <br />
        {currentUser && (
          <div className="text-white">
            {currentUser.paymentDue ? (
              <>Dues: RM {currentUser.paymentDue} </>
            ) : (
              <>No Dues Found.</>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Finance;
