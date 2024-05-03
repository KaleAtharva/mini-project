import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://sentiment-analysis-flask-api.onrender.com/predict",
        {
          review: review,
        }
      );
      setSentiment(response.data.sentiment);
      setSubmit(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h2>Sentiment Analysis</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your review:
          <input value={review} onChange={handleReviewChange} />
        </label>
        <button type="submit">Analyze</button>
      </form>
      {submit && (
        <p>
          It appears that the review is{" "}
          {sentiment ? "unsatisfactory" : "satisfactory"}
        </p>
      )}
    </div>
  );
};

export default App;
