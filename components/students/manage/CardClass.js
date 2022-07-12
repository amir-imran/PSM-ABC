import Image from "next/image";
import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const CardClass = ({
  name,
  startDate,
  grade,
  tutor,
  currentUser,
  uniqClass,
  cid,
}) => {
  const UnregisterClass = async () => {
    if (uniqClass.indexOf(cid) !== -1) {
      uniqClass.pop(uniqClass.indexOf(cid));

      const ref = doc(db, "users", currentUser.id);
      await setDoc(
        ref,
        { classeId: uniqClass.map((classe) => classe.id) },
        { merge: true }
      );
      window.location.reload();
    }
  };

  return (
    <div className="shadow pl-4">
      <div className="my-4">
        <p className=" font-semibold">{name}</p>
        <p className="opacity-80 text-sm">{grade}</p>
      </div>
      <div className="my-4 text-xs ">
        <p className="">{startDate}</p>
        <p className="flex">
          <span>
            <Image
              src="/avatar.svg"
              width={20}
              height={20}
              objectFit="contain"
              alt="logo"
              className="bg-primary rounded-full"
            />
          </span>
          <span>{tutor}</span>
        </p>
        <br />
        <a onClick={UnregisterClass}>Unregister</a>
      </div>
    </div>
  );
};

export default CardClass;
