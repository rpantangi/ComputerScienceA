import { useState } from "react";

const UNITS = [
  { id: 1, name: "Primitive Types", description: "int, double, boolean, char; arithmetic operators, casting, modulus" },
  { id: 2, name: "Using Objects", description: "Object instantiation, method calls, String methods, Math class, wrapper classes" },
  { id: 3, name: "Boolean Expressions & if Statements", description: "Relational & logical operators, if/else if/else, De Morgan's laws" },
  { id: 4, name: "Iteration", description: "while, for, nested loops, String iteration, loop analysis" },
  { id: 5, name: "Writing Classes", description: "Fields, constructors, methods, encapsulation, static vs. instance members" },
  { id: 6, name: "Array", description: "Declaration, initialization, traversal, standard algorithms (search, sort, reverse)" },
  { id: 7, name: "ArrayList", description: "ArrayList methods, traversal, algorithms, autoboxing/unboxing" },
  { id: 8, name: "2D Array", description: "Declaration, initialization, row-major and column-major traversal" },
  { id: 9, name: "Inheritance", description: "extends, super keyword, method overriding, polymorphism, abstract classes" },
  { id: 10, name: "Recursion", description: "Base case, recursive case, tracing recursion, binary search, mergesort" },
];

const FLASHCARDS = [
  { front: "What is the default value of an int in Java?", back: "0 — all numeric primitives default to 0; boolean defaults to false; reference types default to null." },
  { front: "What does the static keyword mean?", back: "The member belongs to the class itself, not to any specific instance. It is shared across all objects of that class." },
  { front: "What is the difference between == and .equals() for Strings?", back: "== checks reference equality (same object in memory). .equals() checks value equality (same sequence of characters)." },
  { front: "What is a NullPointerException?", back: "Thrown when code attempts to use a reference variable that currently points to null (no object)." },
  { front: "What is the base case in recursion?", back: "The condition under which the method returns without making a further recursive call. It prevents infinite recursion." },
  { front: "What is polymorphism?", back: "An object's ability to take many forms. A superclass reference can hold a subclass object; the correct overridden method is called at runtime." },
  { front: "What is the difference between Array and ArrayList?", back: "Arrays are fixed-size and can hold primitives. ArrayLists are dynamic, hold only objects (autoboxing for primitives), and provide add/remove methods." },
  { front: "What does super() do inside a constructor?", back: "Calls the parent class's constructor. It must be the first statement in the subclass constructor." },
  { front: "What is autoboxing?", back: "The automatic conversion of a primitive to its wrapper class object (e.g., int → Integer) when required by a context expecting an object." },
  { front: "What is the time complexity of binary search?", back: "O(log n) — the search space is halved with each comparison, requiring at most log₂n + 1 comparisons." },
  { front: "What does encapsulation mean?", back: "Hiding internal state by making fields private and providing controlled access through public getter/setter methods." },
  { front: "What is method overriding vs. method overloading?", back: "Overriding: subclass redefines a superclass method (same signature). Overloading: same method name, different parameter list (same class)." },
  { front: "What is a StackOverflowError?", back: "Caused by infinite recursion — a recursive method that never reaches its base case exhausts the call stack." },
  { front: "What does arr.length return for a 2D array?", back: "The number of rows. Use arr[0].length for the number of columns." },
  { front: "What is the modulus (%) operator?", back: "Returns the remainder of integer division. E.g., 10 % 3 = 1. Useful for checking even/odd: n % 2 == 0." },
];

const REFERENCE = [
  { cat: "Primitive Types & Casting", items: [
    { lbl: "Integer", code: "int x = 42;" },
    { lbl: "Double", code: "double d = 3.14;" },
    { lbl: "Boolean", code: "boolean b = true;" },
    { lbl: "Integer division truncates", code: "7 / 2  →  3" },
    { lbl: "Cast to get decimal result", code: "(double) 7 / 2  →  3.5" },
    { lbl: "Modulus", code: "10 % 3  →  1" },
  ]},
  { cat: "String Methods", items: [
    { lbl: "length()", code: "s.length()" },
    { lbl: "substring(from, to)", code: 's.substring(1, 4) // indices 1,2,3' },
    { lbl: "indexOf(str)", code: 's.indexOf("lo") // first occurrence' },
    { lbl: "equals(str)", code: 's.equals("hello")' },
    { lbl: "compareTo(str)", code: "s.compareTo(t) // 0 if equal" },
    { lbl: "charAt(i)", code: "s.charAt(0) // returns char" },
  ]},
  { cat: "Array", items: [
    { lbl: "Declare & allocate", code: "int[] arr = new int[5];" },
    { lbl: "Declare & initialize", code: "int[] arr = {1, 2, 3};" },
    { lbl: "Length", code: "arr.length  // not a method!" },
    { lbl: "For-each loop", code: "for (int x : arr) { ... }" },
    { lbl: "2D array", code: "int[][] grid = new int[3][4];" },
    { lbl: "2D dimensions", code: "grid.length  /  grid[0].length" },
  ]},
  { cat: "ArrayList", items: [
    { lbl: "Declare", code: "ArrayList<Integer> list = new ArrayList<>();" },
    { lbl: "add(val)", code: "list.add(5);" },
    { lbl: "add(index, val)", code: "list.add(0, 99);" },
    { lbl: "get(index)", code: "list.get(2)" },
    { lbl: "set(index, val)", code: "list.set(0, 10);" },
    { lbl: "remove(index)", code: "list.remove(0);" },
    { lbl: "size()", code: "list.size()" },
  ]},
  { cat: "Classes & Inheritance", items: [
    { lbl: "Class", code: "public class Dog { ... }" },
    { lbl: "Constructor", code: "public Dog(String n) { name = n; }" },
    { lbl: "this keyword", code: "this.name = name; // disambiguate" },
    { lbl: "Subclass", code: "public class Puppy extends Dog { ... }" },
    { lbl: "Call parent constructor", code: "super(name); // must be first line" },
    { lbl: "Override", code: "@Override\npublic String toString() { ... }" },
  ]},
  { cat: "Math Class", items: [
    { lbl: "Absolute value", code: "Math.abs(-5)  →  5" },
    { lbl: "Power", code: "Math.pow(2, 10)  →  1024.0" },
    { lbl: "Square root", code: "Math.sqrt(16)  →  4.0" },
    { lbl: "Random [0.0, 1.0)", code: "Math.random()" },
    { lbl: "Random int [1, n]", code: "(int)(Math.random() * n) + 1" },
  ]},
];

const btn = (bg, extra = {}) => ({
  background: bg, color: "#fff", border: "none", padding: "9px 20px",
  borderRadius: "3px", fontSize: "12px", cursor: "pointer",
  letterSpacing: "1.2px", textTransform: "uppercase", fontFamily: "inherit", ...extra,
});

const callAPI = async (prompt) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.content[0].text;
};

// ── Free Response Tab ────────────────────────────────────────────────────────
function FreeResponseTab() {
  const [frTopic, setFrTopic] = useState("All Topics");
  const [question, setQuestion] = useState(null);
  const [loadingQ, setLoadingQ] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loadingF, setLoadingF] = useState(false);
  const [err, setErr] = useState(null);

  const generateQuestion = async () => {
    setLoadingQ(true); setErr(null); setQuestion(null); setFeedback(null); setUserAnswer("");
    const topicStr = frTopic === "All Topics" ? "a mix of AP CSA topics" : frTopic;
    try {
      const text = await callAPI(
        `Generate one AP Computer Science A free-response question covering ${topicStr}. It should require writing a complete Java method or class, similar to real AP exam FRQs. Return ONLY valid JSON (no markdown, no backticks) in this format:
{"title":"...","context":"...","task":"...","starterCode":"...","rubric":["point 1","point 2","point 3","point 4","point 5"]}`
      );
      setQuestion(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch {
      setErr("Failed to generate question. Please try again.");
    } finally {
      setLoadingQ(false);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setLoadingF(true); setFeedback(null); setErr(null);
    try {
      const text = await callAPI(
        `You are an AP Computer Science A exam grader. Here is the question:
Title: ${question.title}
Context: ${question.context}
Task: ${question.task}
Rubric points: ${question.rubric.join("; ")}

Student's answer:
${userAnswer}

Grade this response against the rubric. Return ONLY valid JSON (no markdown, no backticks):
{"score":3,"outOf":5,"rubricResults":[{"point":"...","earned":true,"comment":"..."}],"overallFeedback":"...","modelAnswer":"..."}`
      );
      setFeedback(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch {
      setErr("Failed to grade answer. Please try again.");
    } finally {
      setLoadingF(false);
    }
  };

  return (
    <div>
      <div style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#777", marginBottom: "18px" }}>
        AI-Generated Free Response Questions
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "22px", flexWrap: "wrap", alignItems: "center" }}>
        <select value={frTopic} onChange={e => setFrTopic(e.target.value)} style={{ padding: "9px 12px", border: "1px solid #ccc", borderRadius: "3px", fontSize: "13px", background: "#fff", fontFamily: "inherit" }}>
          <option>All Topics</option>
          {UNITS.map(u => <option key={u.id}>{u.name}</option>)}
        </select>
        <button onClick={generateQuestion} disabled={loadingQ} style={btn("#b91c38", { opacity: loadingQ ? .6 : 1 })}>
          {loadingQ ? "Generating…" : "Generate Question"}
        </button>
      </div>

      {err && <div style={{ color: "#b91c38", marginBottom: "14px", fontSize: "14px" }}>{err}</div>}
      {loadingQ && <div style={{ textAlign: "center", padding: "60px", color: "#999", fontSize: "13px", letterSpacing: "1px" }}>Generating free-response question…</div>}

      {question && !loadingQ && (
        <div>
          {/* Question card */}
          <div style={{ background: "#fff", border: "1px solid #ddd", borderLeft: "4px solid #b91c38", borderRadius: "3px", padding: "20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>Free Response Question</div>
            <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "12px" }}>{question.title}</div>
            {question.context && (
              <div style={{ fontSize: "13px", color: "#444", lineHeight: "1.65", marginBottom: "12px", padding: "12px", background: "#f7f7f2", borderRadius: "3px" }}>
                {question.context}
              </div>
            )}
            <div style={{ fontSize: "14px", color: "#111", lineHeight: "1.65", marginBottom: "16px" }}>{question.task}</div>

            {/* Rubric */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: "12px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "8px" }}>Scoring Rubric ({question.rubric.length} pts)</div>
              {question.rubric.map((pt, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "5px", fontSize: "12px", color: "#555" }}>
                  <span style={{ color: "#b91c38", fontWeight: "bold", minWidth: "16px" }}>+1</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Starter code */}
          {question.starterCode && (
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>Starter Code</div>
              <pre style={{ background: "#12122a", color: "#e8e8f0", padding: "14px 16px", borderRadius: "3px", fontSize: "13px", fontFamily: "monospace", overflowX: "auto", margin: 0, lineHeight: "1.6" }}>
                {question.starterCode}
              </pre>
            </div>
          )}

          {/* Answer box */}
          {!feedback && (
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>Your Answer (write Java code)</div>
              <textarea
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="Write your Java solution here…"
                style={{ width: "100%", minHeight: "180px", padding: "12px", border: "1px solid #ccc", borderRadius: "3px", fontSize: "13px", fontFamily: "monospace", lineHeight: "1.6", resize: "vertical", boxSizing: "border-box", background: "#fafaf7" }}
              />
              <button onClick={submitAnswer} disabled={loadingF || !userAnswer.trim()} style={btn("#12122a", { marginTop: "10px", opacity: (!userAnswer.trim() || loadingF) ? .5 : 1 })}>
                {loadingF ? "Grading…" : "Submit for Grading"}
              </button>
            </div>
          )}

          {loadingF && <div style={{ textAlign: "center", padding: "40px", color: "#999", fontSize: "13px", letterSpacing: "1px" }}>Grading your response…</div>}

          {/* Feedback */}
          {feedback && (
            <div>
              {/* Score banner */}
              <div style={{ background: feedback.score >= feedback.outOf * 0.8 ? "#edf7ee" : feedback.score >= feedback.outOf * 0.6 ? "#fff8e1" : "#fdecea", border: `1px solid ${feedback.score >= feedback.outOf * 0.8 ? "#a8d5ab" : feedback.score >= feedback.outOf * 0.6 ? "#ffe082" : "#f5c6cb"}`, borderRadius: "3px", padding: "16px 20px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "32px", fontWeight: "bold", color: feedback.score >= feedback.outOf * 0.8 ? "#3dba5f" : feedback.score >= feedback.outOf * 0.6 ? "#e6a817" : "#b91c38", lineHeight: 1 }}>{feedback.score}</div>
                  <div style={{ fontSize: "11px", color: "#888", letterSpacing: "1px" }}>out of {feedback.outOf}</div>
                </div>
                <div style={{ fontSize: "13px", color: "#444", lineHeight: "1.6", flex: 1 }}>{feedback.overallFeedback}</div>
              </div>

              {/* Rubric results */}
              <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "3px", padding: "16px", marginBottom: "14px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "10px" }}>Rubric Breakdown</div>
                {feedback.rubricResults.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", padding: "10px", background: r.earned ? "#edf7ee" : "#fafaf7", borderRadius: "3px", border: `1px solid ${r.earned ? "#a8d5ab" : "#eee"}` }}>
                    <span style={{ fontSize: "16px", minWidth: "20px" }}>{r.earned ? "✓" : "✗"}</span>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "bold", color: "#333", marginBottom: "3px" }}>{r.point}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>{r.comment}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Model answer */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>Model Answer</div>
                <pre style={{ background: "#12122a", color: "#e8e8f0", padding: "14px 16px", borderRadius: "3px", fontSize: "13px", fontFamily: "monospace", overflowX: "auto", margin: 0, lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                  {feedback.modelAnswer}
                </pre>
              </div>

              <button onClick={() => { setFeedback(null); setUserAnswer(""); setQuestion(null); }} style={btn("#b91c38")}>Try Another Question</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("overview");
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [topic, setTopic] = useState("All Topics");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [done, setDone] = useState(new Set());

  const toggleDone = id => setDone(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const progress = Math.round((done.size / UNITS.length) * 100);

  const generateQuiz = async () => {
    setLoading(true); setErr(null); setAnswers({}); setSubmitted(false); setScore(null); setQuestions([]);
    const topicStr = topic === "All Topics" ? "a balanced mix of all AP CSA topics" : `the topic: ${topic}`;
    try {
      const text = await callAPI(`Generate 5 AP Computer Science A multiple-choice questions covering ${topicStr}. Make them rigorous, exam-quality Java questions. Return ONLY valid JSON — no markdown, no backticks, no preamble — in this exact format:
[{"question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"answer":"A","explanation":"..."}]`);
      setQuestions(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setErr("Failed to generate quiz. Please try again."); }
    finally { setLoading(false); }
  };

  const submitQuiz = () => {
    let c = 0;
    questions.forEach((q, i) => { if (answers[i] === q.answer) c++; });
    setScore(c); setSubmitted(true);
  };

  const TABS = [
    { id: "overview", label: "Unit Overview" },
    { id: "flashcards", label: "Flashcards" },
    { id: "quiz", label: "Practice Quiz" },
    { id: "frq", label: "Free Response" },
    { id: "reference", label: "Quick Reference" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f4f4ef", minHeight: "100vh", color: "#111" }}>
      {/* Header */}
      <div style={{ background: "#12122a", color: "#fff", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#8888aa", textTransform: "uppercase", marginBottom: "4px" }}>AP Examination Preparation</div>
          <div style={{ fontSize: "21px", fontWeight: "bold", letterSpacing: "0.5px" }}>Computer Science A</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "10px", color: "#8888aa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>Topic Progress</div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "140px", height: "5px", background: "#2a2a4a", borderRadius: "3px" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "#3dba5f", borderRadius: "3px", transition: "width .3s" }} />
            </div>
            <span style={{ fontSize: "12px", color: "#aab" }}>{done.size}/{UNITS.length}</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: "#1e1e3a", display: "flex", padding: "0 28px", gap: "2px", flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "13px 16px", border: "none", cursor: "pointer", fontSize: "12px",
            letterSpacing: "1px", textTransform: "uppercase",
            background: tab === t.id ? "#f4f4ef" : "transparent",
            color: tab === t.id ? "#12122a" : "#8888aa",
            fontWeight: tab === t.id ? "bold" : "normal",
            borderBottom: tab === t.id ? "3px solid #b91c38" : "3px solid transparent",
            transition: "all .15s", fontFamily: "inherit",
          }}>{t.label}</button>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: "28px", maxWidth: "900px", margin: "0 auto" }}>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#777", marginBottom: "18px" }}>AP CSA Curriculum — 10 Units</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {UNITS.map(u => {
                const checked = done.has(u.id);
                return (
                  <div key={u.id} onClick={() => toggleDone(u.id)} style={{ background: checked ? "#edf7ee" : "#fff", border: `1px solid ${checked ? "#a8d5ab" : "#ddd"}`, borderLeft: `4px solid ${checked ? "#3dba5f" : "#b91c38"}`, borderRadius: "3px", padding: "14px 16px", cursor: "pointer", transition: "all .2s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "10px", color: "#999", letterSpacing: "1px", textTransform: "uppercase" }}>Unit {u.id}</span>
                      {checked && <span style={{ fontSize: "10px", color: "#3dba5f", fontWeight: "bold" }}>✓ Reviewed</span>}
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "5px" }}>{u.name}</div>
                    <div style={{ fontSize: "12px", color: "#666", lineHeight: "1.55" }}>{u.description}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: "11px", color: "#aaa", marginTop: "14px" }}>Click any unit card to mark it as reviewed.</div>
          </div>
        )}

        {/* FLASHCARDS */}
        {tab === "flashcards" && (
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#777", marginBottom: "18px" }}>Key Concepts — Card {cardIdx + 1} of {FLASHCARDS.length}</div>
            <div style={{ height: "4px", background: "#ddd", borderRadius: "2px", marginBottom: "20px" }}>
              <div style={{ width: `${((cardIdx + 1) / FLASHCARDS.length) * 100}%`, height: "100%", background: "#b91c38", borderRadius: "2px", transition: "width .3s" }} />
            </div>
            <div onClick={() => setFlipped(!flipped)} style={{ background: flipped ? "#12122a" : "#fff", color: flipped ? "#fff" : "#111", border: "1px solid #ccc", borderTop: "4px solid #b91c38", borderRadius: "4px", padding: "52px 40px", textAlign: "center", cursor: "pointer", minHeight: "180px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "background .25s, color .25s", boxShadow: "0 2px 8px rgba(0,0,0,.07)" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", opacity: .55, marginBottom: "18px" }}>{flipped ? "Answer" : "Question — click to flip"}</div>
              <div style={{ fontSize: "17px", lineHeight: "1.65", maxWidth: "580px" }}>{flipped ? FLASHCARDS[cardIdx].back : FLASHCARDS[cardIdx].front}</div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "18px", justifyContent: "center" }}>
              <button onClick={() => { setCardIdx((cardIdx - 1 + FLASHCARDS.length) % FLASHCARDS.length); setFlipped(false); }} style={btn("#555")}>← Prev</button>
              <button onClick={() => { setFlipped(false); setCardIdx((cardIdx + 1) % FLASHCARDS.length); }} style={btn("#b91c38")}>Next →</button>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {tab === "quiz" && (
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#777", marginBottom: "18px" }}>AI-Generated Practice Quiz</div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "22px", flexWrap: "wrap", alignItems: "center" }}>
              <select value={topic} onChange={e => setTopic(e.target.value)} style={{ padding: "9px 12px", border: "1px solid #ccc", borderRadius: "3px", fontSize: "13px", background: "#fff", fontFamily: "inherit" }}>
                <option>All Topics</option>
                {UNITS.map(u => <option key={u.id}>{u.name}</option>)}
              </select>
              <button onClick={generateQuiz} disabled={loading} style={btn("#b91c38", { opacity: loading ? .6 : 1 })}>{loading ? "Generating…" : "Generate 5 Questions"}</button>
            </div>
            {err && <div style={{ color: "#b91c38", marginBottom: "14px", fontSize: "14px" }}>{err}</div>}
            {loading && <div style={{ textAlign: "center", padding: "60px", color: "#999", fontSize: "13px", letterSpacing: "1px" }}>Generating AP-style questions…</div>}
            {questions.length > 0 && !loading && (
              <div>
                {questions.map((q, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderLeft: "4px solid #b91c38", borderRadius: "3px", padding: "18px", marginBottom: "14px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "13px", fontSize: "14px", lineHeight: "1.6" }}>{i + 1}. {q.question}</div>
                    {q.options.map((opt, j) => {
                      const letter = opt[0];
                      const sel = answers[i] === letter;
                      const correct = q.answer === letter;
                      let bg = "transparent";
                      if (submitted) bg = correct ? "#edf7ee" : sel ? "#fdecea" : "transparent";
                      else if (sel) bg = "#e8f0fe";
                      return (
                        <div key={j} onClick={() => !submitted && setAnswers(p => ({ ...p, [i]: letter }))} style={{ padding: "9px 13px", marginBottom: "5px", borderRadius: "3px", background: bg, border: `1px solid ${sel && !submitted ? "#1a73e8" : "#eee"}`, cursor: submitted ? "default" : "pointer", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", transition: "background .15s" }}>
                          <span style={{ fontWeight: "bold", minWidth: "18px", color: "#555" }}>{letter}</span>
                          <span style={{ flex: 1 }}>{opt.slice(3)}</span>
                          {submitted && correct && <span style={{ color: "#3dba5f", fontWeight: "bold" }}>✓</span>}
                          {submitted && sel && !correct && <span style={{ color: "#b91c38", fontWeight: "bold" }}>✗</span>}
                        </div>
                      );
                    })}
                    {submitted && (
                      <div style={{ marginTop: "10px", padding: "10px 13px", background: "#f7f7f2", borderRadius: "3px", fontSize: "12px", color: "#444", borderLeft: "3px solid #1a73e8", lineHeight: "1.55" }}>
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
                {!submitted ? (
                  <button onClick={submitQuiz} disabled={Object.keys(answers).length < questions.length} style={btn("#12122a", { opacity: Object.keys(answers).length < questions.length ? .5 : 1 })}>Submit Answers</button>
                ) : (
                  <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "3px", padding: "24px", textAlign: "center", marginTop: "6px" }}>
                    <div style={{ fontSize: "36px", fontWeight: "bold", color: score >= 4 ? "#3dba5f" : score >= 3 ? "#e6a817" : "#b91c38" }}>{score} / {questions.length}</div>
                    <div style={{ color: "#666", marginTop: "6px", fontSize: "13px" }}>{score === 5 ? "Perfect score — outstanding!" : score >= 4 ? "Strong performance. Review any missed explanations." : score >= 3 ? "Passing range. Focus on the explanations above." : "Below passing. Revisit the relevant units and retry."}</div>
                    <button onClick={generateQuiz} style={{ ...btn("#b91c38"), marginTop: "16px" }}>Try Another Quiz</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* FREE RESPONSE */}
        {tab === "frq" && <FreeResponseTab />}

        {/* REFERENCE */}
        {tab === "reference" && (
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#777", marginBottom: "18px" }}>Java Quick Reference</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {REFERENCE.map(sec => (
                <div key={sec.cat} style={{ background: "#fff", border: "1px solid #ddd", borderTop: "4px solid #12122a", borderRadius: "3px", padding: "16px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#333", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #eee" }}>{sec.cat}</div>
                  {sec.items.map(item => (
                    <div key={item.lbl} style={{ marginBottom: "9px" }}>
                      <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>{item.lbl}</div>
                      <code style={{ fontSize: "12px", color: "#b91c38", fontFamily: "monospace", background: "#fafaf7", padding: "3px 6px", borderRadius: "3px", display: "block", whiteSpace: "pre-wrap", lineHeight: "1.5" }}>{item.code}</code>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
