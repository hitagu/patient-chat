import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

// import the medical records of this user
const recordsData = require('./records.json');
const recordsList = recordsData.records;

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();

  // turns the list of medical records into a string that the text generator will use
  function getMedicalRecords() {
    var recordsString = "";
    for (const record of recordsList) {
      for (const data in record) {
        recordsString += data + ": ";
        recordsString += record[data] + "\n";
      }
      recordsString += "\n";
    }
    return recordsString;
  }

  const medicalRecords = getMedicalRecords();

  // this context variable represents the message history maintained throughout the conversation
  const [context, setContext] = useState(`You are a medical record history assistant. These are my medical records. Please memorize them: \n` + medicalRecords);

  async function onSubmit(event) {
    event.preventDefault();
    // make a request to the API with the given question and context
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionInput, currentContext: context }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setContext(data.newContext);
      setQuestionInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Chatbot for Medical Records</title>
      </Head>

      <main className={styles.main}>
        <h3>Ask questions about your medical records:</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter your question!"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <input type="submit" value="Answer my question" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
