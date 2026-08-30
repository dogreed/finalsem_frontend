import { useEffect, useState } from "react";
import {
  X,
  Plus,
  Layers3,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
} from "lucide-react";

import AddEditStackChapters, {
  type StackChapterFormData,
} from "./AddEditStackChapters";

import { useToast } from "../../hooks/useToasts";

import { getChapters } from "../../api/admin/stack-chapters/get-chapters";

import ConformationModel from "../models/ConformationModel";

import { deleteChapter } from "../../api/admin/stack-chapters/delete-chapters";

import { createChapter } from "../../api/admin/stack-chapters/create-chapter";
import { updateChapter } from "../../api/admin/stack-chapters/update-chapters";

import {
  getQuestions,
  type QuestionItem,
} from "../../api/admin/stack-questions/get-stack-chapter-questions";
import {
  updateQuestion,
  type UpdateQuestionPayload,
} from "../../api/admin/stack-questions/update-questions";
import {
  createQuestion,
  type CreateQuestionPayload,
} from "../../api/admin/stack-questions/create-questions";
import AddEditQuestions from "./AddEditQuestions";
import { deleteQuestion } from "../../api/admin/stack-questions/delete-questions";

type StackChapter = {
  chapterId: number;
  stackId: number;
  stackName: string;
  name: string;
  questionCount: number;
};

type StackDetailsSidebarProps = {
  onClose: () => void;
  stackId: number | null;
};

export default function StackDetailsSidebar({
  onClose,
  stackId,
}: StackDetailsSidebarProps) {
  const { showSuccess, showError } = useToast();

  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);

  const [chapters, setChapters] = useState<StackChapter[]>([]);
  const [loading, setLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<StackChapter | null>(
    null,
  );

  const [chapterModalMode, setChapterModalMode] = useState<"create" | "edit">(
    "create",
  );
  const [editingChapter, setEditingChapter] = useState<StackChapter | null>(
    null,
  );

  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(
    null,
  );

  const [questionsMap, setQuestionsMap] = useState<
    Record<number, QuestionItem[]>
  >({});
  const [questionLoadingId, setQuestionLoadingId] = useState<number | null>(
    null,
  );

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionModalMode, setQuestionModalMode] = useState<"create" | "edit">(
    "create",
  );
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(
    null,
  );

  const [deleteQuestionModalOpen, setDeleteQuestionModalOpen] = useState(false);

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem | null>(
    null,
  );

  const [deletingQuestion, setDeletingQuestion] = useState(false);

  const fetchChapters = async () => {
    if (!stackId) return;

    try {
      setLoading(true);

      const res = await getChapters(stackId);

      setChapters(res || []);
    } catch (error) {
      console.error("Failed to fetch chapters", error);

      showError("Failed to fetch chapters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, [stackId]);

  const handleToggleQuestions = async (chapter: StackChapter) => {
    if (expandedChapterId === chapter.chapterId) {
      setExpandedChapterId(null);

      return;
    }

    setExpandedChapterId(chapter.chapterId);

    if (questionsMap[chapter.chapterId]) return;

    try {
      setQuestionLoadingId(chapter.chapterId);

      const res = await getQuestions(chapter.stackId, chapter.chapterId);

      setQuestionsMap((prev) => ({
        ...prev,
        [chapter.chapterId]: res || [],
      }));
    } catch (error) {
      console.error("Failed to fetch questions", error);

      showError("Failed to fetch questions");
    } finally {
      setQuestionLoadingId(null);
    }
  };

  const handleOpenCreateChapterModal = () => {
    setChapterModalMode("create");

    setEditingChapter(null);

    setIsChapterModalOpen(true);
  };

  const handleOpenEditChapterModal = (chapter: StackChapter) => {
    setChapterModalMode("edit");

    setEditingChapter(chapter);

    setIsChapterModalOpen(true);
  };

  const handleCloseChapterModal = () => {
    setIsChapterModalOpen(false);

    setEditingChapter(null);
  };

  const handleCreateChapter = async (data: StackChapterFormData) => {
    if (!stackId) {
      showError("Stack ID is required");

      return;
    }

    try {
      await createChapter({
        stackId,
        name: data.name.trim(),
      });

      await fetchChapters();

      setIsChapterModalOpen(false);

      showSuccess("Chapter created successfully");
    } catch (error) {
      console.error("Failed to create chapter:", error);

      showError("Failed to create chapter");
    }
  };

  const handleUpdateChapter = async (data: StackChapterFormData) => {
    if (!editingChapter?.chapterId) {
      showError("Chapter ID is required");

      return;
    }

    try {
      await updateChapter(editingChapter.chapterId, {
        name: data.name.trim(),
      });

      setChapters((prev) =>
        prev.map((chapter) =>
          chapter.chapterId === editingChapter.chapterId
            ? {
                ...chapter,
                name: data.name.trim(),
              }
            : chapter,
        ),
      );

      showSuccess("Chapter updated successfully");

      setIsChapterModalOpen(false);

      setEditingChapter(null);
    } catch (error) {
      console.error("Failed to update chapter:", error);

      showError("Failed to update chapter");
    }
  };

  const handleOpenDeleteModal = (chapter: StackChapter) => {
    setSelectedChapter(chapter);

    setDeleteModalOpen(true);
  };

  const handleDeleteChapter = async () => {
    if (!selectedChapter?.chapterId) return;

    try {
      setDeleting(true);

      await deleteChapter(selectedChapter.chapterId);

      setChapters((prev) =>
        prev.filter(
          (chapter) => chapter.chapterId !== selectedChapter.chapterId,
        ),
      );

      showSuccess("Chapter deleted successfully");

      setDeleteModalOpen(false);

      setSelectedChapter(null);
    } catch (error) {
      console.error("Failed to delete chapter:", error);

      showError("Failed to delete chapter");
    } finally {
      setDeleting(false);
    }
  };

  const handleCreateQuestion = async (data: CreateQuestionPayload) => {
    try {
      await createQuestion({
        stackId: Number(data.stackId),
        chapterId: Number(data.chapterId),
        text: data.text,
        optionA: data.optionA,
        optionB: data.optionB,
        optionC: data.optionC,
        optionD: data.optionD,
        correctOption: data.correctOption,
      });

      setChapters((prev) =>
        prev.map((chapter) =>
          chapter.chapterId === Number(data.chapterId)
            ? {
                ...chapter,
                questionCount: chapter.questionCount + 1,
              }
            : chapter,
        ),
      );

      showSuccess("Question created successfully");

      setIsQuestionModalOpen(false);

      if (expandedChapterId === Number(data.chapterId)) {
        const res = await getQuestions(
          Number(data.stackId),
          Number(data.chapterId),
        );

        setQuestionsMap((prev) => ({
          ...prev,
          [Number(data.chapterId)]: res || [],
        }));
      }
    } catch (error) {
      console.error(error);

      showError("Failed to create question");
    }
  };

  const handleEditQuestion = async (data: UpdateQuestionPayload) => {
    if (!editingQuestion) return;

    try {
      await updateQuestion(editingQuestion.questionId, {
        text: data.text,
        optionA: data.optionA,
        optionB: data.optionB,
        optionC: data.optionC,
        optionD: data.optionD,
        correctOption: data.correctOption,
      });

      showSuccess("Question updated successfully");

      setIsQuestionModalOpen(false);

      if (expandedChapterId) {
        const res = await getQuestions(stackId!, expandedChapterId);

        setQuestionsMap((prev) => ({
          ...prev,
          [expandedChapterId]: res || [],
        }));
      }
    } catch (error) {
      console.error(error);

      showError("Failed to update question");
    }
  };

  const handleDeleteQuestion = async () => {
    if (!selectedQuestion) return;

    try {
      setDeletingQuestion(true);

      await deleteQuestion(selectedQuestion.questionId);

      setQuestionsMap((prev) => ({
        ...prev,
        [selectedQuestion.chapterId]: (
          prev[selectedQuestion.chapterId] || []
        ).filter(
          (question) => question.questionId !== selectedQuestion.questionId,
        ),
      }));

      setChapters((prev) =>
        prev.map((chapter) =>
          chapter.chapterId === selectedQuestion.chapterId
            ? {
                ...chapter,
                questionCount: Math.max(chapter.questionCount - 1, 0),
              }
            : chapter,
        ),
      );

      showSuccess("Question deleted successfully");

      setDeleteQuestionModalOpen(false);

      setSelectedQuestion(null);
    } catch (error) {
      console.error(error);

      showError("Failed to delete question");
    } finally {
      setDeletingQuestion(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="flex h-full justify-end overflow-hidden">
          <aside
            className="h-full w-full bg-white shadow-[0_10px_40px_rgba(15,23,42,0.18)] sm:max-w-xl lg:max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                      <Layers3 className="h-6 w-6 text-slate-500" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
                        Stack Chapters
                      </h2>

                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        View and manage all stack chapters.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
                    <span className="text-slate-500">Chapters</span>

                    <span className="rounded-lg bg-white px-2 py-0.5 font-semibold text-slate-900 shadow-sm">
                      {chapters.length}
                    </span>
                  </div>

                  <div className="ml-auto flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setQuestionModalMode("create");
                        setEditingQuestion(null);
                        setIsQuestionModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      <CircleHelp className="h-4 w-4" />
                      Add Question
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenCreateChapterModal}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                      <Plus className="h-4 w-4" />
                      Add Chapter
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
                {loading ? (
                  <p className="text-sm text-slate-500">Loading chapters...</p>
                ) : chapters.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Layers3 className="h-7 w-7 text-slate-400" />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-slate-900">
                      No chapters found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Start by adding a new chapter.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chapters.map((chapter) => {
                      const isExpanded =
                        expandedChapterId === chapter.chapterId;

                      const questions = questionsMap[chapter.chapterId] || [];

                      return (
                        <div
                          key={chapter.chapterId}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-4 px-5 py-4">
                            <button
                              type="button"
                              onClick={() => handleToggleQuestions(chapter)}
                              className="flex min-w-0 flex-1 items-center gap-3 text-left"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                {isExpanded ? (
                                  <ChevronDown className="h-5 w-5 text-slate-600" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-slate-600" />
                                )}
                              </div>

                              <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold text-slate-900">
                                  {chapter.name}
                                </h3>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  {chapter.questionCount} Questions
                                </p>
                              </div>
                            </button>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenEditChapterModal(chapter)
                                }
                                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenDeleteModal(chapter)}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="border-t border-slate-200 bg-slate-50/60 px-5 py-4">
                              {questionLoadingId === chapter.chapterId ? (
                                <p className="text-sm text-slate-500">
                                  Loading questions...
                                </p>
                              ) : questions.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
                                  <CircleHelp className="mx-auto h-8 w-8 text-slate-400" />

                                  <p className="mt-3 text-sm font-medium text-slate-700">
                                    No questions found
                                  </p>
                                </div>
                              ) : (
                                <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                  {questions.map((question, index) => (
                                    <div
                                      key={question.questionId}
                                      className="flex items-start justify-between gap-4 px-4 py-4 transition hover:bg-slate-50"
                                    >
                                      <div className="flex min-w-0 flex-1 items-start gap-3">
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                                          {index + 1}
                                        </span>

                                        <p className="text-sm leading-6 text-slate-800">
                                          {question.text}
                                        </p>
                                      </div>

                                      <div className="flex shrink-0 items-center gap-2">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingQuestion(question);
                                            setQuestionModalMode("edit");
                                            setIsQuestionModalOpen(true);
                                          }}
                                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                        >
                                          <Pencil className="h-4 w-4" />
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => {
                                            setSelectedQuestion(question);
                                            setDeleteQuestionModalOpen(true);
                                          }}
                                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <AddEditStackChapters
        isOpen={isChapterModalOpen}
        onClose={handleCloseChapterModal}
        mode={chapterModalMode}
        stackId={stackId?.toString()}
        initialData={
          editingChapter
            ? {
                stackId: editingChapter.stackId.toString(),
                name: editingChapter.name,
              }
            : null
        }
        onSubmit={
          chapterModalMode === "create"
            ? handleCreateChapter
            : handleUpdateChapter
        }
      />

      <ConformationModel
        isOpen={deleteModalOpen}
        title="Delete Chapter"
        description={`Are you sure you want to delete "${selectedChapter?.name}"?`}
        loading={deleting}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteChapter}
      />

      <ConformationModel
        isOpen={deleteQuestionModalOpen}
        title="Delete Question"
        description="Are you sure you want to delete this question?"
        loading={deletingQuestion}
        onClose={() => {
          setDeleteQuestionModalOpen(false);
          setSelectedQuestion(null);
        }}
        onConfirm={handleDeleteQuestion}
      />

      <AddEditQuestions
        isOpen={isQuestionModalOpen}
        onClose={() => {
          setIsQuestionModalOpen(false);
          setEditingQuestion(null);
        }}
        mode={questionModalMode}
        stackId={stackId || 0}
        chapters={chapters}
        initialData={editingQuestion}
        onSubmit={
          questionModalMode === "create"
            ? handleCreateQuestion
            : handleEditQuestion
        }
      />
    </>
  );
}
