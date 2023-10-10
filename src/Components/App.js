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
import { useQuiz } from "../contexts/QuizContext";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "started" && <StartScreen />}
        {status === "filtered" && <SelectButton />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <NextQuestion />
              <Timer />
            </Footer>
          </>
        )}
        {status === "finish" && <FinishScreen />}
        {status === "reviewed" && (
          <>
            <ReviewQuestions />
            <NextQuestion />
          </>
        )}
        {status === "rated" && <UserRating />}
      </Main>
    </div>
  );
}

export default App;
