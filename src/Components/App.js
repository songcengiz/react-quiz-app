import { useEffect, useReducer } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Questions from "./Questions";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import SelectButton from "./SelectButton";
import ReviewQuestions from "./ReviewQuestions";
import UserRating from "./UserRating";

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
      return {
        ...state,
        status: "started",
        questions: action.payload,
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

function App() {
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
    localStorage.setItem("reviewQuestions", JSON.stringify(reviewQuestions));
  }, [reviewQuestions]);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "start",
          payload: data,
        });
      })
      .catch((err) => dispatch({ type: "dataFailed", payload: err.message }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "started" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "filtered" && (
          <SelectButton typeNumber={typeNumber} dispatch={dispatch} />
        )}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              answer={answer}
              point={point}
            />
            <Questions
              question={questionsFilter.at(index)}
              answer={answer}
              dispatch={dispatch}
              index={index}
              point={point}
              secRemaining={secRemaining}
            />
            <Footer>
              <NextQuestion
                index={index}
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
              />
              <Timer dispatch={dispatch} secRemaining={secRemaining} />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            maxPoints={maxPoints}
            point={point}
            dispatch={dispatch}
            reviewQuestions={reviewQuestions}
          />
        )}
        {status === "reviewed" && (
          <>
            <ReviewQuestions
              reviewQuestions={reviewQuestions.at(index)}
              dispatch={dispatch}
              secCompleted={secRemaining}
            />
            <NextQuestion
              index={index}
              dispatch={dispatch}
              numQuestions={numReview}
            />
          </>
        )}
        {status === "rated" && (
          <UserRating userRating={userRating} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
