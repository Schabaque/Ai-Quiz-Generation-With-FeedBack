require("dotenv").config(); // MUST BE FIRST

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/connectionDB");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// -------------------- ROUTES --------------------
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/prof", require("./routes/Professor"));
app.use("/api/students", require("./routes/Student"));
app.use("/api/students", require("./routes/Inscription"));
app.use("/api/Classrooms", require("./routes/Classroom"));
app.use("/api/questions", require("./routes/QuestionRoutes"));
app.use("/api/answers", require("./routes/AnswerRoutes"));
app.use("/api/examens", require("./routes/ExamRoutes"));
app.use("/api/password", require("./routes/passwordRoute"));
app.use("/api/submitExam", require("./routes/SubmitExamRoutes"));
app.use("/api/topics", require("./routes/TopicRoutes"));
app.use("/api/quizzes", require("./routes/QuizRoutes"));
app.use("/api/submissions", require("./routes/SubmissionRoutes"));
app.use("/api/analytics", require("./routes/AnalyticsRoutes"));

// -------------------- SERVER --------------------
const port = process.env.PORT || 5000;

connectDB(); // connect to DB

app.listen(port, (error) => {
    if (error) console.log("Server error:", error);
    console.log(`Server started on port ${port}`);
});
