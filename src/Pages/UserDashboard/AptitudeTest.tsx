import { useEffect, useState } from "react";
import { Clock, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  startTest,
  type TestQuestion,
} from "../../api/student/aptitude/start-test";
import { submitTestAnswer } from "../../api/student/aptitude/post-answers";
import { submitTest } from "../../api/student/aptitude/test-submit";
import { useToast } from "../../hooks/useToasts";
import {
  getStudentStacks,
  type StudentStack,
} from "../../api/student/aptitude/get-stacks-student";

// interface Stack {
//   stackId: number;
//   name: string;
//   chapterCount: number;
//   totalQuestions: number;
// }

export default function AptitudeTest() {
  const navigate = useNavigate();
  const { showError } = useToast();

  const [testStarted, setTestStarted] = useState(false);

  const [selectedStack, setSelectedStack] = useState("");

  const [testId, setTestId] = useState<number | null>(null);

  const [questions, setQuestions] = useState<TestQuestion[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [stacks, setStacks] = useState<StudentStack[]>([]);

  const [loadingStacks, setLoadingStacks] = useState(true);

  const [startingTest, setStartingTest] = useState(false);

  const fetchStacks = async () => {
    try {
      setLoadingStacks(true);

      const response = await getStudentStacks();

      setStacks(response);
    } catch (error) {
      console.error("Failed to fetch stacks", error);

      showError("Failed to load stacks");
    } finally {
      setLoadingStacks(false);
    }
  };

  useEffect(() => {
    fetchStacks();
  }, []);
  const handleStartTest = async () => {
    if (!selectedStack) return;

    try {
      setStartingTest(true);

      const response = await startTest({
        stackId: Number(selectedStack),
      });

      setTestId(response.testId);

      setQuestions(response.questions);

      setTestStarted(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as any)?.response?.data?.title ||
            (error as any)?.response?.data?.message ||
            "Failed to start test";

      console.error("Failed to start test:", errorMessage);

      showError(errorMessage);
    } finally {
      setStartingTest(false);
    }
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer || !testId) return;

    const current = questions[currentQuestion];

    try {
      setLoading(true);

      await submitTestAnswer(testId, {
        testId,
        questionId: current.questionId,
        selectedOption: selectedAnswer,
      });

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);

        setSelectedAnswer(null);
      } else {
        const result = await submitTest(testId);

        navigate("/user/test-result", {
          state: result,
        });
      }
    } catch (error) {
      console.error("Failed to submit answer", error);
    } finally {
      setLoading(false);
    }
  };

  if (!testStarted) {
    return (
      <div className="p-2">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Aptitude Test
            </h1>

            <p className="text-gray-600">
              Select your technology stack and demonstrate your expertise
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Choose Your Technology Stack
            </h2>

            <div className="mb-8">
              <select
                value={selectedStack}
                onChange={(e) => setSelectedStack(e.target.value)}
                disabled={loadingStacks}
                className="w-full rounded-lg border-2 border-gray-200 p-4 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              >
                <option value="">
                  {loadingStacks ? "Loading stacks..." : "Select a Stack"}
                </option>

                {stacks.map((stack) => (
                  <option key={stack.stackId} value={stack.stackId}>
                    {stack.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Test Details</h3>

              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Questions are generated dynamically</li>
                <li>• 30 minutes time limit</li>
                <li>• Topic-wise weighted scoring</li>
                <li>• Detailed performance analysis</li>
              </ul>
            </div>

            <button
              onClick={handleStartTest}
              disabled={!selectedStack || startingTest}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                selectedStack
                  ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {startingTest ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Starting Test...
                </>
              ) : (
                "Start Test"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const current = questions[currentQuestion];

  const options = [
    {
      key: "a",
      label: current.optionA,
    },
    {
      key: "b",
      label: current.optionB,
    },
    {
      key: "c",
      label: current.optionC,
    },
    {
      key: "d",
      label: current.optionD,
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Question {currentQuestion + 1}/{questions.length}
            </span>

            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />

              <span className="font-medium">{questions.length} Questions</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {current.chapterName}
              </span>

              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {current.stackName}
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {current.text}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {options.map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedAnswer(option.key)}
                className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                  selectedAnswer === option.key
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold uppercase">
                    {option.key}
                  </div>

                  <span>{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer || loading}
            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
              selectedAnswer
                ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />

                <span>
                  {currentQuestion < questions.length - 1
                    ? "Saving Answer..."
                    : "Submitting Test..."}
                </span>
              </>
            ) : (
              <>
                <span>
                  {currentQuestion < questions.length - 1
                    ? "Next Question"
                    : "Submit Test"}
                </span>

                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
