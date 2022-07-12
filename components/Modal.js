import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function MyModal({ id, update }) {
  let [isOpen, setIsOpen] = useState(false);

  const [performance, setPerformance] = useState("Excellent");
  const [comment, setComment] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const studentRef = doc(db, "users", id);
    console.log({ performance, comment });
    await setDoc(studentRef, { performance, comment }, { merge: true });

    update();
    closeModal();
  };

  return (
    <>
      <div className=" inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-gray-800 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Update
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={onSubmit}>
                    <label
                      htmlFor="appreciation"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Performance
                    </label>
                    <select
                      id="small"
                      className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                      onChange={(e) => setPerformance(e.target.value)}
                    >
                      <option value="Excellent">🤩 excellent</option>
                      <option value="Good">👍 Good</option>
                      <option value="Averaage">🙌 Average</option>
                      <option value="Poor">❌ Poor</option>
                      <option value="Bad">👎 Bad</option>
                    </select>
                    <div className="mt-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Write a comment
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                        placeholder="Your comment..."
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
