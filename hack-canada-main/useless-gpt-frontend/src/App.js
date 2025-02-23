import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [animatedAnswer, setAnimatedAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const answerRef = useRef(null); 


  useEffect(() => {
    if (answer && !isTyping) {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < answer.length) {
          setAnimatedAnswer((prev) => prev + answer[index-1]); 
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);
    }
  }, [answer]); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnimatedAnswer(''); 
    setAnswer(''); 
    try {
      const response = await axios.post('http://localhost:5000/ask', { question });
      setAnswer(response.data.answer); 
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setAnswer('Oops! Something went wrong. Try again please.');
    }
  };

  return (
    <div className="App">
      <div className="Header">
        <h1>UselessGPT</h1>
      </div>
      <div className="bubble">
        <img
          src="https://cdn.discordapp.com/attachments/1340816099591065610/1343149762362216538/output-onlinepngtools.png?ex=67bc3931&is=67bae7b1&hm=1816b37c92ec0759f8ff3c4a166e4d8a7661035e54b473ad8ee8ba176f311991&"
          alt="Text Bubble"
        />
        
        <div className="bubble-text">
          Ask me anything and I'll give you the most trustworthy info!
        </div>
      </div>
      {/* <!-- this part needs changing --> */}
      <div className="beaver">
        <img
          src = "https://cdn.discordapp.com/attachments/1340816099591065610/1343108380935458826/pxArt_1.png?ex=67bc12a7&is=67bac127&hm=cfdd5037283a15a84cce9cd83a9e6cd91e6302174fc0a3f74688949d109e3d9d&"
          alt = "beaver"
          />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here, buddy..."
          required
        />
        <button type="submit">Ask</button>
      </form>

      {animatedAnswer && (
        <div className="answer" ref={answerRef}>
          <h2>Answer:</h2>
          <p>{animatedAnswer}</p>
        </div>
      )}

      <div className="canadian">Proudly made in Canada 🍁</div>
    </div>
  );
}

export default App;
