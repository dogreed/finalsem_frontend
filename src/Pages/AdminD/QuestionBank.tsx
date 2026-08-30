import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Layers3, Trash2 } from "lucide-react";

import AddEditStack, {
  type StackFormData,
} from "../../Components/Admin/AddEditStack";

import StackDetailsSidebar from "../../Components/Admin/StackDetailsSidebar";

import { getStacks, type Stack } from "../../api/admin/stacks/get-stack";

import { createStack } from "../../api/admin/stacks/create-stack";

import { updateStack } from "../../api/admin/stacks/update-stack";

import { deleteStack } from "../../api/admin/stacks/delete-stack";

import { useToast } from "../../hooks/useToasts";
import ConformationModel from "../../Components/models/ConformationModel";

export default function QuestionBank() {
  const { showSuccess, showError } = useToast();

  const [data, setData] = useState<Stack[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const [selectedStack, setSelectedStack] = useState<Stack | null>(null);

  const [openStackSideBar, setOpenStackSideBar] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const fetchStacks = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getStacks();

      setData(res);
    } catch (err) {
      console.error(err);
      setError("Failed to load stacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedStack(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (stack: Stack) => {
    setModalMode("edit");
    setSelectedStack(stack);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (stack: Stack) => {
    setSelectedStack(stack);
    setDeleteModalOpen(true);
  };

  const handleCreateStack = async (formData: StackFormData) => {
    try {
      await createStack({
        name: formData.name,
      });

      showSuccess("Stack created successfully");

      setIsModalOpen(false);

      await fetchStacks();
    } catch (error) {
      console.error(error);

      showError("Failed to create stack");
    }
  };

  const handleEditStack = async (formData: StackFormData) => {
    if (!selectedStack?.stackId) return;

    try {
      await updateStack(selectedStack.stackId, {
        name: formData.name,
      });

      showSuccess("Stack updated successfully");

      setIsModalOpen(false);

      await fetchStacks();
    } catch (error) {
      console.error(error);

      showError("Failed to update stack");
    }
  };

  const handleDeleteStack = async () => {
    if (!selectedStack?.stackId) return;

    try {
      setDeleting(true);

      await deleteStack(selectedStack.stackId);

      showSuccess("Stack deleted successfully");

      setData((prev) =>
        prev.filter((stack) => stack.stackId !== selectedStack.stackId),
      );

      setDeleteModalOpen(false);

      if (openStackSideBar) {
        setOpenStackSideBar(false);
      }

      setSelectedStack(null);
    } catch (error) {
      console.error(error);

      showError("Failed to delete stack");
    } finally {
      setDeleting(false);
    }
  };

  const filteredStacks = data.filter((stack) =>
    stack.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalQuestions = filteredStacks.reduce(
    (sum, stack) => sum + (stack.totalQuestions || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50/70 p-2">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-inner">
                <Layers3 className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  Question Bank
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Manage stacks, categories, and all your question content.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-x-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 active:scale-[0.97]"
            >
              <Plus className="h-4 w-4" />
              Add New Stack
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search stacks by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-5 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 shadow-sm">
                <span className="text-gray-500">Stacks</span>

                <span className="rounded-lg bg-blue-100 px-2 py-0.5 font-semibold text-blue-700">
                  {filteredStacks.length}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 shadow-sm">
                <span className="text-blue-600">Questions</span>

                <span className="rounded-lg bg-blue-100 px-2 py-0.5 font-semibold text-blue-700">
                  {totalQuestions}
                </span>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">
            Loading stacks...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && filteredStacks.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                All Stacks
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Manage your question stacks below
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Stack
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Chapters
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Questions
                    </th>

                    <th className="w-40 px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredStacks.map((stack) => (
                    <tr
                      key={stack.stackId}
                      className="cursor-pointer transition hover:bg-blue-100"
                      onClick={() => {
                        setSelectedStack(stack);

                        setOpenStackSideBar(true);
                      }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                            <div className="text-sm font-bold text-blue-600">
                              {stack.name.charAt(0)}
                            </div>
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {stack.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-center text-sm font-medium text-gray-700">
                        {stack.chapterCount}
                      </td>

                      <td className="px-6 py-5 text-center text-sm font-medium text-gray-700">
                        {stack.totalQuestions}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();

                              handleOpenEditModal(stack);
                            }}
                            className="inline-flex items-center gap-x-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();

                              handleOpenDeleteModal(stack);
                            }}
                            className="inline-flex items-center gap-x-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <AddEditStack
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalMode === "create" ? handleCreateStack : handleEditStack}
        mode={modalMode}
        initialData={
          selectedStack
            ? {
                name: selectedStack.name,
              }
            : null
        }
      />

      <ConformationModel
        isOpen={deleteModalOpen}
        title="Delete Stack"
        description={`Are you sure you want to delete "${selectedStack?.name}"?`}
        loading={deleting}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteStack}
      />

      {openStackSideBar && (
        <StackDetailsSidebar
          onClose={() => setOpenStackSideBar(false)}
          stackId={selectedStack?.stackId ?? null}
        />
      )}
    </div>
  );
}
