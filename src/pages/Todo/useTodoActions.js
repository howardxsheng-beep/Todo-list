import { useMemo, useRef, useState, useEffect } from "react";
import { getTodos, createTodo, deleteTodo, toggleTodo, updateTodo } from "../../api/todos";

export default function useTodoActions() {
  const [tab, setTab] = useState("all");
  const [todos, setTodos] = useState([]);

  const [newText, setNewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [msg, setMsg] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editErr, setEditErr] = useState("");

  const committingRef = useRef(false);

  const filtered = useMemo(() => {
    if (tab === "active") return todos.filter((t) => !t.status);
    if (tab === "done") return todos.filter((t) => t.status);
    return todos;
  }, [tab, todos]);

  const activeCount = useMemo(() => todos.filter((t) => !t.status).length, [todos]);

  const fetchTodos = async () => {
    setMsg("");
    setIsFetching(true);
    try {
      const res = await getTodos();
      setTodos(res?.data || []);
    } catch (err) {
      setMsg(err.message || "取得待辦失敗");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEdit = (todo) => {
    setMsg("");
    setEditingId(todo.id);
    setEditingText(todo.content ?? "");
    setEditErr("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
    setEditErr("");
  };

  const commitEdit = async (id) => {
    if (committingRef.current) return;

    const nextContent = editingText.trim();
    if (!nextContent) {
      setEditErr("待辦內容不可為空");
      return;
    }
    setEditErr("");
    committingRef.current = true;

    const prevTodos = todos;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, content: nextContent } : t)));

    try {
      await updateTodo(id, nextContent);
      cancelEdit();
      await fetchTodos();
    } catch (err) {
      setMsg(err.message || "更新內容失敗");
      setTodos(prevTodos);
      cancelEdit();
      await fetchTodos();
    } finally {
      committingRef.current = false;
    }
  };

  const handleToggle = async (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status: !t.status } : t)));
    try {
      await toggleTodo(id);
      await fetchTodos();
    } catch (err) {
      setMsg(err.message || "更新狀態失敗");
      await fetchTodos();
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg("");

    const text = newText.trim();
    if (!text) return;

    setIsLoading(true);
    try {
      await createTodo(text);
      setNewText("");
      await fetchTodos();
    } catch (err) {
      setMsg(err.message || "新增失敗");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setMsg("");
    setIsLoading(true);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      await fetchTodos();
    } catch (err) {
      setMsg(err.message || "刪除失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tab,
    setTab,

    todos,
    filtered,
    activeCount,

    newText,
    setNewText,

    isLoading,
    isFetching,

    msg,
    setMsg,

    editingId,
    editingText,
    editErr,
    setEditingText,
    setEditErr,

    fetchTodos,
    startEdit,
    cancelEdit,
    commitEdit,

    handleCreate,
    handleDelete,
    handleToggle,
  };
}