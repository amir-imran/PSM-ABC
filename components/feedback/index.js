import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

import useSWR from "swr";
import Icon from "../Icon";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

const Feedback = () => {
  const { user } = useAuth();

  const countPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackCollectionsRef = collection(db, "feedbacks");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagecCollection, setPageCollection] = useState();

  useEffect(() => {
    setPageCollection(cloneDeep(feedbacks?.slice(0, countPerPage)));
  }, [feedbacks]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(feedbackCollectionsRef);
      setFeedbacks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getUsers();
  }, []);

  if (!feedbacks) {
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

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(feedbacks.slice(from, to)));
  };
  return (
    <div className="bg-white rounded-md p-4">
      <h1 className="text-center text-xl font-bold uppercase my-4">
        Feedbacks from students
      </h1>
      <div className="grid md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4">
        {pagecCollection?.map((col) => (
          <div key={col.uid} className="bg-black p-4 text-white rounded shadow">
            <h2 className="mb-4 p-1 bg-white text-black rounded inline ">
              {col.email}
            </h2>
            <p className="mt-4">{col.feedback}</p>
          </div>
        ))}
      </div>
      <div className="my-4 flex justify-center">
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={pagecCollection?.length || 0}
        />
      </div>
    </div>
  );
};

export default Feedback;
