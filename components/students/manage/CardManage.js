import React, { useEffect, useState } from "react";
import {
  arrayUnion,
  doc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const CardManage = ({ name, grade, tutor, id, fees }) => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const usersCollectionRef = collection(db, "users");
  const [usersInfo, setUsersInfo] = useState([]);
  // const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setLoading(false)
    };
    getUsers();
  }, []);
  const singleUserInfo = usersInfo.find((u) => u.email === user?.email);

  const addClass = async (e) => {
    e.preventDefault();
    let classeId = [];
    classeId.push(id);
    // const data = {
    //   ...singleUserInfo,
    //   classeId: classeId,
    // }
    const studentsDoc = doc(db, "users", singleUserInfo.id);
    try {
      await updateDoc(studentsDoc, {
        classeId: arrayUnion(id),
      });
      enqueueSnackbar("Class Successfully added.", {
        variant: "success",
        autoHideDuration: 3000,
      });
      router.push("/student");
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    // const data = {
    //   ...values,
    //   classeId: [...id],
    // }
    console.log(id);
  };

  return (
    <div className="rounded-md grid  gap-4 bg-primary p-4   shadow">
      <div>
        <div className="font-medium">
          <span className="font-normal text-base">Tutor: </span>
          {tutor}
        </div>
        <div className="font-medium">
          <span className="font-normal text-base">Class:</span> {name}
        </div>
        <div className="font-medium">
          <span className="font-normal text-base">Fees:</span> {fees}
        </div>
        <div className="font-medium">
          <span className="font-normal text-base">Grade:</span> {grade}
        </div>
      </div>
      <form>
        <button
          type="submit"
          onClick={addClass}
          className="bg-secondary hover:bg-secondary/90 text-white rounded p-2 w-full"
        >
          Register Class
        </button>
      </form>
    </div>
  );
};

export default CardManage;
