import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  // const [feedback, setFeedback] = useState([
  //   {
  //     id: 1,
  //     text: "This is a context one",
  //   },
  //   {
  //     id: 2,
  //     text: "This is a context two",
  //   },
  //   {
  //     id: 3,
  //     text: "This is a context three",
  //   },
  //   {
  //     id: 4,
  //     text: "This is a context four",
  //   },
  //   {
  //     id: 5,
  //     text: "This is a context five",
  //   },
  //   {
  //     id: 6,
  //     text: "This is a context six",
  //   },
  // ]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((jsonData) => setFeedback(jsonData))
      .catch((err) => console.log(`Error fetching the data:`, err));
  }, []);

  const [editFeedback, setEditFeedback] = useState({
    item: {},
    edit: false,
  });

  const deleteFeedback = (id) => {
    setFeedback(feedback.filter((item) => item.id !== id));
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
    setEditFeedback({
      item: {},
      edit: false,
    });
  };

  const editFeedbackItem = (item) => {
    setEditFeedback({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        editFeedback,
        deleteFeedback,
        addFeedback,
        editFeedbackItem,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
