"use client";
import { useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";

// Text input component that is protected
const TextInput = () => {
  const [question, setQuestion] = useState("");

  // Check for user authentication status
  const { user } = UserAuth();

  // On submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You need to login first");
      return;
    }

    const docData = {
      uid: user.uid,
      email: user.email,
      question: question,
    };

    // Add a new document in Firebase collection "questions"
    await addDoc(collection(db, "questions"), docData);
    setQuestion("");
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="font-bold text-3xl self-start ">Ask our community</h1>
      <form className="flex  gap-2 py-6" onSubmit={handleSubmit}>
        <textarea
          className="p-2 rounded-2xl bg-bodyWhite  dark:text-lightBlack w-72 lg:w-96 h-full shadow-xl focus:border-none leading-relaxed"
          type="text"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          required
        />
        <button type="submit">
          <QuestionAnswerRoundedIcon
            fontSize="large"
            className="fill-primaryBlue"
          />
        </button>
      </form>
    </div>
  );
};

export default TextInput;
