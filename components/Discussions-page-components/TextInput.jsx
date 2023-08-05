"use client";
import { useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import { useTranslations } from "next-intl";

// Text input component that is protected
const TextInput = ({ Error, setError }) => {
  const t = useTranslations("Discussion");
  const [question, setQuestion] = useState("");


  // Check for user authentication status
  const { user } = UserAuth();

  // On submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You need to login first");

      setTimeout(() => {
        setError(null);
      }, 5000);
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
      <h1 className="font-bold text-3xl self-start ">{t("title")}</h1>
      {Error && (
        <div className="text-center text-red-400 text-xl font-bold bg-red-100 my-2 py-4 w-1/2 rounded-xl border-2 border-red-500">
          {Error}
        </div>
      )}
      <form className="flex  gap-2 py-6" onSubmit={handleSubmit}>
        <textarea
          className="p-2 rounded-2xl bg-bodyWhite  dark:text-lightBlack w-72 lg:w-96 h-full shadow-xl focus:border-none leading-relaxed"
          type="text"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t("Placeholder")}
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
