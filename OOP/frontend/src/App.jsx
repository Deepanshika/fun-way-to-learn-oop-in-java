import React, { useState } from "react";
import lessons from "./data/lessons.json";
import "./index.css";

function LessonCard({ l, onOpen }) {
  return (
    <div style={{ border: "1px solid #e6eef6", padding: 12, borderRadius: 8, margin: 8, width: 300 }}>
      <h3 style={{ margin: "0 0 6px" }}>{l.title}</h3>
      <p style={{ margin: "0 0 8px", color: "#334155" }}>{l.summary}</p>
      <small style={{ color: "#64748b" }}>Tags: {l.tags.join(", ")}</small>
      <div style={{ marginTop: 10 }}>
        <button onClick={() => onOpen(l)} style={{ padding: "6px 10px", borderRadius: 6 }}>
          Open
        </button>
      </div>
    </div>
  );
}

function LessonDetail({ lesson, onClose }) {
  if (!lesson) return null;
  return (
    <div style={{ marginTop: 16, padding: 16, border: "1px solid #e6eef6", borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>{lesson.title}</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <p style={{ whiteSpace: "pre-wrap" }}>{lesson.content}</p>
      <pre style={{ background: "#f8fafc", padding: 10, borderRadius: 6 }}>{`// Example: ${lesson.example}`}</pre>
    </div>
  );
}

function Quiz({ questions }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // "correct" | "wrong" | null
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions || questions.length === 0) return null;

  const q = questions[index];

  function handleSelect(idx) {
    if (selected !== null) return; // already selected, ignore
    setSelected(idx);

    if (idx === q.answer) {
      setResult("correct");
      setScore((s) => s + 1);
    } else {
      setResult("wrong");
    }
  }

  function next() {
    const nextIndex = index + 1;
    if (nextIndex >= questions.length) {
      setFinished(true);
    } else {
      setIndex(nextIndex);
      setSelected(null);
      setResult(null);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setResult(null);
    setScore(0);
    setFinished(false);
  }

  // final screen
  if (finished) {
    return (
      <div style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 8 }}>Quiz Result</h3>
        <div style={{ padding: 12, border: "1px solid #eef2ff", borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 18 }}>
            You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
          </p>
          <div style={{ marginTop: 12 }}>
            <button onClick={restart}>Restart Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3 style={{ marginBottom: 8 }}>Quick Quiz</h3>
      <div style={{ padding: 12, border: "1px solid #eef2ff", borderRadius: 8 }}>
        <p style={{ margin: 0 }}>
          <strong>Q{index + 1}. {q.q}</strong>
        </p>

        <div style={{ marginTop: 8 }}>
          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.answer;
            const isSelected = selected === idx;

            // determine background color
            let bg = "#fff";
            if (selected !== null) {
              if (isCorrect) bg = "#d1fae5"; // green-ish
              else if (isSelected && !isCorrect) bg = "#fecaca"; // red-ish
              else bg = "#fff"; // others remain white
            } else {
              bg = isSelected ? "#eef" : "#fff";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                style={{
                  display: "block",
                  margin: "6px 0",
                  padding: "8px",
                  borderRadius: 6,
                  background: bg,
                  textAlign: "left",
                  cursor: selected === null ? "pointer" : "default",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* immediate feedback */}
        {result && (
          <div style={{ marginTop: 10, fontWeight: "bold" }}>
            {result === "correct" ? "✅ Correct!" : "❌ Wrong Answer"}
            {result === "wrong" && (
              <div style={{ marginTop: 6, color: "#334155" }}>
                Correct answer: <strong>{q.options[q.answer]}</strong>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <button onClick={next} disabled={selected === null} >
            {index + 1 === questions.length ? "Finish" : "Next Question"}
          </button>
        </div>

        <div style={{ marginTop: 10, color: "#6b7280", fontSize: 13 }}>
          Progress: {index + (selected !== null ? 1 : 0)} / {questions.length}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(null);

  const quiz = [
    {
      q: "What is encapsulation?",
      options: ["Hiding details", "Extending class", "Running code"],
      answer: 0
    },
    {
      q: "Which keyword indicates inheritance in Java?",
      options: ["implements", "extends", "inherits"],
      answer: 1
    },
    {
      q: "What is polymorphism?",
      options: ["Multiple forms", "Multiple classes", "Multiple objects"],
      answer: 0
    },
    {
      q: "Which OOP principle uses 'private' fields?",
      options: ["Abstraction", "Encapsulation", "Inheritance"],
      answer: 1
    },
    {
      q: "Which method runs when an object is created?",
      options: ["main()", "constructor", "start()"],
      answer: 1
    },
    {
      q: "What does 'interface' in Java define?",
      options: ["A class implementation", "A set of method signatures", "A variable holder"],
      answer: 1
    },
    {
      q: "Which keyword is used to prevent method overriding?",
      options: ["final", "static", "private"],
      answer: 0
    }
  ];

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <header>
        <h1 style={{ marginBottom: 6 }}>The Adventures of OOPLand — Interactive</h1>
        <p style={{ color: "#475569" }}>Explore lessons and test your knowledge.</p>
      </header>

      <main style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <section style={{ flex: 1, minWidth: 320 }}>
          <h2>Lessons</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {lessons.map(l => <LessonCard key={l.id} l={l} onOpen={setOpen} />)}
          </div>
          <LessonDetail lesson={open} onClose={() => setOpen(null)} />
        </section>

        <aside style={{ width: 360 }}>
          <Quiz questions={quiz} />
        </aside>
      </main>
    </div>
  );
}
