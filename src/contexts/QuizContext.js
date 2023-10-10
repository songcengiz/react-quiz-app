import { createContext, useContext, useEffect, useReducer } from "react";
const SEC_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  secRemaining: null,
  typeNumber: null,
  reviewQuestions: [],
  userRating: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "start":
      const storageData = localStorage.getItem("dataQuiz");
      return {
        ...state,
        status: "started",
        questions: storageData ? JSON.parse(storageData) : [],
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "filter":
      return { ...state, status: "filtered" };
    case "dataSuccess":
      return {
        ...state,
        status: "ready",

        typeNumber: action.payload,
        secRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "timer":
      return {
        ...state,
        secRemaining: state.secRemaining - 1,
        status: state.secRemaining === 0 ? "finish" : state.status,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: state.status === "ready" && null,
      };
    case "finished":
      return { ...state, status: "finish" };
    case "rating":
      return { ...state, status: "rated", userRating: action.payload };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "filtered",
      };
    case "review":
      return {
        ...state,
        index: 0,
        status: "reviewed",
        reviewQuestions: JSON.parse(localStorage.getItem("reviewQuestions")),
      };
    case "addQuestion":
      return {
        ...state,
        reviewQuestions: [...state.reviewQuestions, action.payload],
      };

    default:
      throw new Error("Something going on wrong!");
  }
}

const QuizContext = createContext();
function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    point,
    secRemaining,
    typeNumber,
    reviewQuestions,
    userRating,
  } = state;
  const questionsFilter =
    typeNumber > 0
      ? questions.filter((data) => data.points === typeNumber)
      : questions;
  const numQuestions = questionsFilter?.length;
  const maxPoints = questionsFilter.reduce((prev, cur) => prev + cur.points, 0);
  const numReview = reviewQuestions.length;
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("dataQuiz", JSON.stringify(data));
        dispatch({
          type: "start",
        });
      })
      .catch((err) => dispatch({ type: "dataFailed", payload: err.message }));
  }, []);
  useEffect(() => {
    localStorage.setItem("reviewQuestions", JSON.stringify(reviewQuestions));
  }, [reviewQuestions]);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        point,
        secRemaining,
        typeNumber,
        reviewQuestions,
        userRating,
        numQuestions,
        maxPoints,
        numReview,
        dispatch,
        questionsFilter,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside QuizProvider");
  return context;
}
export { QuizProvider, useQuiz };
