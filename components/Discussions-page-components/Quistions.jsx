"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "@/app/context/AuthContext";
const QuestionAnswerRoundedIcon = dynamic(() =>
  import("@mui/icons-material/QuestionAnswerRounded")
);
const DeleteRoundedIcon = dynamic(() =>
  import("@mui/icons-material/DeleteRounded")
);
import { Spinner } from "@material-tailwind/react";
import { useTranslations } from "next-intl";

const Questions = () => {
  const t = useTranslations("Discussion");

  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [IsLoading, setIslodaing] = useState(true);

  const { user } = UserAuth();

  useEffect(() => {
    setIslodaing(true);
    const q = query(collection(db, "questions"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let loadedQuestions = [];
      querySnapshot.forEach((doc) => {
        loadedQuestions.push({ id: doc.id, data: doc.data() });
      });
      setQuestions(loadedQuestions);
      setIslodaing(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "answers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let loadedAnswers = {};
      querySnapshot.forEach((doc) => {
        loadedAnswers[doc.data().questionId] =
          loadedAnswers[doc.data().questionId] || [];
        loadedAnswers[doc.data().questionId].push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setAnswers(loadedAnswers);
    });

    return () => unsubscribe();
  }, []);

  const handleAnswer = async (e, questionId) => {
    if (!user) {
      alert("You need to login first");
      return;
    }

    let date = new Date();
    let dateWithoutHours = date.toLocaleDateString();
    e.preventDefault();
    const docData = {
      questionId,
      answer,
      uid: user.uid,
      email: user.email,
      createDate: dateWithoutHours,
    };
    await addDoc(collection(db, "answers"), docData);
    setAnswer("");
  };
  const handleDeleteQuestion = async (questionId, questionEmail) => {
    if (user && user.email === questionEmail) {
      const docRef = doc(db, "questions", questionId);
      await deleteDoc(docRef)
        .then(() => {
          console.log("Successfully deleted question with id ");
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        });
    } else {
      console.error("Unauthorized deletion attempt");
    }
  };
  const handleDeleteAnswer = async (questionId, answerId, answerEmail) => {
    if (user && user.email === answerEmail) {
      const docRef = doc(db, "answers", answerId);
      await deleteDoc(docRef)
        .then(() => {
          console.log(
            "Successfully deleted answer with id " +
              answerId +
              " from question with id " +
              questionId
          );
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        });
    } else {
      console.error("Unauthorized deletion attempt");
    }
  };

  return (
    <>
      {IsLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="h-14 w-14" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-10 ">
          {questions.map((question) => (
            <div
              key={question.id}
              className="flex flex-col bg-white dark:bg-indigoDay rounded-[20px] p-3 shadow-xl w-80"
            >
              <div className="flex justify-between">
                <span className="text-md text-gray-400 dark:text-gray-700 font-medium">
                  {t("Ask")}: {question.data.email}
                </span>
                <DeleteRoundedIcon
                  onClick={() =>
                    handleDeleteQuestion(question.id, question.data.email)
                  }
                  className="dark:fill-purssianBlue dark:hover:fill-red-400 hover:fill-red-400
                  text-3xl hover:text-2xl  cursor-pointer "
                />
              </div>
              <h2 className="text-xl py-2 font-semibold">
                {question.data.question}{" "}
              </h2>
              <form
                className="flex gap-4"
                onSubmit={(e) => handleAnswer(e, question.id)}
              >
                <input
                  type="text"
                  className="bg-bodyWhite dark:text-lightBlack rounded-xl p-2 shadow-xl"
                  value={currentQuestionId === question.id ? answer : ""}
                  onClick={() => setCurrentQuestionId(question.id)}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                />
                <button type="submit">
                  <QuestionAnswerRoundedIcon
                    fontSize="medium"
                    className="fill-primaryBlue"
                  />
                </button>
              </form>
              {answers[question.id] &&
                answers[question.id].map(({ id, data }) => (
                  <div key={id} className="flex flex-col">
                    <div className="flex justify-between pt-6 pb-1">
                      <p className=" font-bold text-md">{data.answer}</p>
                      <DeleteRoundedIcon
                        onClick={() =>
                          handleDeleteAnswer(question.id, id, data.email)
                        }
                        className="dark:fill-purssianBlue dark:hover:fill-red-400 hover:fill-red-400
                        text-lg hover:text-sm  cursor-pointer "
                      />
                    </div>
                    <span className="text-md text-gray-400 dark:text-gray-700 font-medium">
                      {t("Answer")}: {data.email}
                    </span>
                    <span className="text-md text-gray-400 dark:text-gray-700 font-medium">
                      {t("Date")}: {data.createDate}
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Questions;
