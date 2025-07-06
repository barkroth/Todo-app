"use client";
import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const createTodo = () => {
    if (newTodo.trim() === "") {
      setInputError("Görev açıklaması boş olamaz");
      return;
    }
    setInputError("");
    setTodo((prevTodos) => [...prevTodos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const [modal, setModal] = useState<boolean>(false);

  const handleDelete = (index: number) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const handleComplete = (index: number) => {
    setTodo((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleModalSubmit = () => {
    if (newTodo.trim() === "") {
      setInputError("Görev açıklaması boş olamaz");
      return;
    }
    setInputError("");
    setTodo((prevTodos) => [...prevTodos, { text: newTodo, completed: false }]);
    setNewTodo("");
    setModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 bg-clip-text text-transparent mb-4 tracking-wide">
            Todo App
          </h1>
          <p className="text-slate-300 text-lg font-light">
            Yapılacakları listelemeye başlayın
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Add Todo Button */}
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setModal(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-full font-medium shadow-2xl hover:shadow-rose-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
            >
              <svg
                className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              ToDo Ekle
            </button>
          </div>

          {/* Todo List */}
          <div className="space-y-4">
            {todo.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-400/20 to-pink-600/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg
                    className="w-10 h-10 text-rose-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="text-slate-300 text-xl font-medium mb-2">
                  Henüz görev yok
                </p>
                <p className="text-slate-400">
                  Başlamak için ilk To-do'yu giriniz.
                </p>
              </div>
            ) : (
              todo.map((item, index) => (
                <div
                  key={index}
                  className={`group flex items-center p-5 rounded-2xl border transition-all duration-300 hover:shadow-xl backdrop-blur-sm ${
                    item.completed
                      ? "bg-emerald-500/10 border-emerald-400/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => handleComplete(index)}
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 transition-all duration-300 mr-5 flex items-center justify-center ${
                      item.completed
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white shadow-lg"
                        : "border-slate-400 hover:border-rose-400 hover:shadow-rose-400/25"
                    }`}
                  >
                    {item.completed && (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Todo Text */}
                  <span
                    className={`flex-1 text-lg transition-all duration-300 ${
                      item.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-200"
                    }`}
                  >
                    {item.text}
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Stats */}
          {todo.length > 0 && (
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex justify-between text-sm text-slate-300">
                <span className="bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                  Toplam görev: {todo.length}
                </span>
                <span className="bg-emerald-500/10 px-4 py-2 rounded-full backdrop-blur-sm text-emerald-300">
                  Tamamlanan: {todo.filter((item) => item.completed).length}
                </span>
                <span className="bg-rose-500/10 px-4 py-2 rounded-full backdrop-blur-sm text-rose-300">
                  Bekleyen: {todo.filter((item) => !item.completed).length}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/10 transform transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-200">
                  Yeni Görev Ekle
                </h2>
                <button
                  onClick={() => {
                    setModal(false);
                    setInputError("");
                    setNewTodo("");
                  }}
                  className="text-slate-400 hover:text-slate-200 transition-colors p-2 hover:bg-white/5 rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Görev Açıklaması
                  </label>
                  <input
                    type="text"
                    placeholder="Görevi buraya giriniz..."
                    value={newTodo}
                    onChange={(e) => {
                      setNewTodo(e.target.value);
                      if (inputError) setInputError("");
                    }}
                    onKeyPress={(e) => e.key === "Enter" && handleModalSubmit()}
                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 bg-slate-700/50 text-slate-200 placeholder-slate-400 ${
                      inputError ? "border-rose-500" : "border-slate-600"
                    }`}
                    autoFocus
                  />
                  {inputError && (
                    <p className="text-rose-400 text-sm mt-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {inputError}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleModalSubmit}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 px-6 rounded-xl font-medium hover:shadow-rose-500/25 transform hover:scale-105 transition-all duration-200"
                  >
                    Görev Yarat
                  </button>
                  <button
                    onClick={() => {
                      setModal(false);
                      setInputError("");
                      setNewTodo("");
                    }}
                    className="px-6 py-4 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    Iptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
