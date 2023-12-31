import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, secRemaining } = useQuiz();
  const min = Math.ceil(secRemaining / 60);
  const sec = Math.floor(secRemaining % 60);
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
