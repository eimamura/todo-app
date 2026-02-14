import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

const STORAGE_KEY = "todo-app-items";

describe("Home", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads todos from localStorage", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        { id: 1, title: "Active task", completed: false },
        { id: 2, title: "Completed task", completed: true },
      ]),
    );

    render(<Home />);

    expect(screen.getByText("Active task")).toBeInTheDocument();
    expect(screen.getByText("Completed task")).toBeInTheDocument();
    expect(screen.getByText("Remaining: 1")).toBeInTheDocument();
  });

  it("adds a new todo item", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("e.g. Buy groceries"), "Write tests");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Remaining: 1")).toBeInTheDocument();
  });

  it("filters active and completed todos", async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        { id: 1, title: "Active task", completed: false },
        { id: 2, title: "Completed task", completed: true },
      ]),
    );

    render(<Home />);

    await user.click(screen.getByRole("button", { name: "Active" }));
    expect(screen.getByText("Active task")).toBeInTheDocument();
    expect(screen.queryByText("Completed task")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.getByText("Completed task")).toBeInTheDocument();
    expect(screen.queryByText("Active task")).not.toBeInTheDocument();
  });

  it("deletes one todo and clears completed todos", async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        { id: 1, title: "Active task", completed: false },
        { id: 2, title: "Completed task", completed: true },
      ]),
    );

    render(<Home />);

    const activeRow = screen.getByText("Active task").closest("li");
    expect(activeRow).not.toBeNull();
    await user.click(within(activeRow as HTMLElement).getByRole("button", { name: "Delete" }));
    expect(screen.queryByText("Active task")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear completed" }));
    expect(screen.queryByText("Completed task")).not.toBeInTheDocument();
    expect(screen.getByText("No tasks to show.")).toBeInTheDocument();
  });

  it("disables clear completed when there are no completed todos", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: 1, title: "Active task", completed: false }]),
    );

    render(<Home />);

    expect(screen.getByRole("button", { name: "Clear completed" })).toBeDisabled();
  });
});
