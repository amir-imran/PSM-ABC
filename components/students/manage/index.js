import React, { useState, useEffect } from "react";
import CardClass from "./CardClass";
import CardManage from "./CardManage";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";

import { addDoc, collection, getDocs } from "firebase/firestore";
import Icon from "../../Icon";

const Class = () => {
  const { user } = useAuth();

  const [usersInfo, setUsersInfo] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setUser] = useState({});
  const classesCollectionRef = collection(db, "classes");
  const usersCollectionRef = collection(db, "users");

  const getClasses = async () => {
    const data = await getDocs(classesCollectionRef);
    const users = await getDocs(usersCollectionRef);
    setUsersInfo(users.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setClasses(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((u) => "grade" in u)
    );
  };

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.docs.map((doc) => {
      if (doc.data().email === user.email) {
        setUser({ id: doc.id, ...doc.data() });
      }
    });
  };

  useEffect(async () => {
    await getClasses();
    await getUsers();
    setLoading(false);
  }, []);

  const singleUserInfo = usersInfo.find((u) => u.email === user?.email);
  const uniqClass = classes.filter((element) => {
    return singleUserInfo?.classeId?.includes(element.id);
  });
  const availableClasses = classes.filter((c) => {
    return c.grade === singleUserInfo.grade;
    // c.grade !== singleUserInfo?.grade
  });
  console.log(availableClasses, "avialable");

  if (loading) {
    return (
      <div>
        loading...
        <Icon
          name="fa-spinner"
          className="fa-spin text-black ml-4"
          size="2x"
          spin
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid  grid-cols-1 gap-4 my-2 max-h max-h-[400px] overflow-auto">
        {/* <div className="col-span-1 rounded-md bg-white p-4 ">
          <div>
            <p>Class2, Grade 1</p>
            Mr Abu
          </div>
          <div className="my-6 flex justify-between font-medium">
            <p> Fees</p>
            <p> :RM 50</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-secondary font-semibold"> 20 available seats</p>
            <button className="bg-secondary hover:bg-secondary/90 text-white rounded p-2 w-full">
              Register Class
            </button>
          </div>
        </div> */}
        <div className="bg-white  p-4 md:col-span-3 sm:col-span-2 col-span-1 ">
          <h1 className="text-lg opacity-75 mb-8">Available Classes</h1>
          {availableClasses ? (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {availableClasses?.map((classe) => (
                <CardManage
                  key={classe.id}
                  id={classe.id}
                  name={classe.name}
                  tutor={classe.tutor}
                  grade={classe.grade}
                  fees={classe.fees}
                />
              ))}
              {/* <CardManage />
            <CardManage />
            <CardManage /> */}
            </div>
          ) : (
            <p className="text-center">No class available</p>
          )}
        </div>
      </div>
      <div className="bg-white p-4 rounded-md">
        <h1 className="font-bold mb-4">Your Class</h1>
        <div className="grid md:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4 ">
          {uniqClass?.map((cid) => (
            <CardClass
              name={cid.name}
              grade={cid.grade}
              startDate={cid.startDate}
              tutor={cid.tutor}
              cid={cid}
              currentUser={currentUser}
              uniqClass={uniqClass}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Class;
