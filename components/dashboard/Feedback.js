import React from "react";

const Feedback = ({ feedbacks, limit = 0 }) => {
  const [sortedFeedbacks, setSortedFeedbacks] = React.useState(feedbacks);

  React.useEffect(() => {
    const sorted = feedbacks.sort((a, b) => a - b);

    setSortedFeedbacks(sorted.reverse());
  }, []);

  return (
    <div className="bg-white p-4 text-center text-xl font-semibold min-h-[100px] rounded-md flex justify-center items-center">
      {feedbacks === [] ? (
        <div>
          <p>You have no feedback yet!</p>
          <button
            type="button"
            className="text-white bg-secondary mt-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600"
          >
            View Feedback
          </button>
        </div>
      ) : (
        <div className="w-full  text-white flex flex-col gap-2">
          <h1 className="text-xl font-black text-slate-800 text-left">
            Feedbacks
          </h1>
          {sortedFeedbacks.map((feedback, idx) => {
            if (limit !== 0 && idx > limit) return <></>;

            return (
              <div className="w-full rounded-xl text-left bg-slate-800 p-2">
                <div className="text-sm">{feedback.email}</div>
                <div>{feedback.feedback}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Feedback;
