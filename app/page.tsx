"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Filter = "all" | "active" | "completed";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = "todo-app-items";
const RANDOM_IMAGES = [
  "/next.svg",
  "/vercel.svg",
  "/file.svg",
  "/globe.svg",
  "/window.svg",
];

function getInitialTodos(): Todo[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Todo[]) : [];
  } catch {
    return [];
  }
}

function pickRandomImage() {
  return RANDOM_IMAGES[Math.floor(Math.random() * RANDOM_IMAGES.length)];
}

export default function Home() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
  const [filter, setFilter] = useState<Filter>("all");
  const [randomImage, setRandomImage] = useState(pickRandomImage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const visibleTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [filter, todos]);

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = input.trim();
    if (!title) {
      return;
    }

    setTodos((current) => [
      { id: Date.now(), title, completed: false },
      ...current,
    ]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function removeTodo(id: number) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }

  function showRandomImage() {
    setRandomImage((current) => {
      if (RANDOM_IMAGES.length < 2) {
        return current;
      }

      let next = current;
      while (next === current) {
        next = pickRandomImage();
      }
      return next;
    });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col p-6 sm:p-10">
      <h1 className="text-3xl font-bold tracking-tight">Todo App</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Add tasks and track what is done.
      </p>

      <section className="mt-6 rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">Random Image</h2>
        <Image
          alt="Random icon"
          className="mt-3 h-16 w-16"
          height={64}
          src={randomImage}
          width={64}
        />
        <button
          className="mt-3 rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          type="button"
          onClick={showRandomImage}
        >
          Show another image
        </button>
      </section>

      <form className="mt-6 flex gap-2" onSubmit={addTodo}>
        <input
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="e.g. Buy groceries"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="rounded-md bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          type="submit"
        >
          Add
        </button>
      </form>

      <section className="mt-5 flex flex-wrap items-center gap-2">
        <FilterButton
          active={filter === "all"}
          label="All"
          onClick={() => setFilter("all")}
        />
        <FilterButton
          active={filter === "active"}
          label="Active"
          onClick={() => setFilter("active")}
        />
        <FilterButton
          active={filter === "completed"}
          label="Completed"
          onClick={() => setFilter("completed")}
        />
        <span className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
          Remaining: {remainingCount}
        </span>
      </section>

      <ul className="mt-4 space-y-2">
        {visibleTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
          >
            <input
              checked={todo.completed}
              className="h-4 w-4"
              type="checkbox"
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              className={`flex-1 ${todo.completed ? "text-zinc-400 line-through" : ""}`}
            >
              {todo.title}
            </span>
            <button
              className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              type="button"
              onClick={() => removeTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {visibleTodos.length === 0 && (
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
          No tasks to show.
        </p>
      )}

      <button
        className="mt-6 w-fit rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        type="button"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </main>
  );
}

type FilterButtonProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function FilterButton({ active, label, onClick }: FilterButtonProps) {
  return (
    <button
      className={`rounded-md px-3 py-1.5 text-sm transition ${
        active
          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
          : "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
