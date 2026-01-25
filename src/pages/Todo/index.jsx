import { useMemo, useState, useEffect } from "react";
import check from "../../assets/imgs/check.png";
import plus from "../../assets/icons/plus_icon.svg";
import cross from "../../assets/icons/cross.svg";
import tick from "../../assets/icons/tick.svg";
import empty from "../../assets/imgs/empty.png";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { getTodos, createTodo } from "../../api/todos";




export default function Todo() {

    const token = Cookies.get("token");
    if (!token) return <Navigate to="/login" replace />;

    const [tab, setTab] = useState("all");
    const [todos, setTodos] = useState([]);

    const [newText, setNewText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const toggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: !t.status } : t))
        );
    };

    const filtered = useMemo(() => {
        if (tab === "active") return todos.filter((t) => !t.status);
        if (tab === "done") return todos.filter((t) => t.status);
        return todos;
    }, [tab, todos]);

    const navigate = useNavigate();
    const activeCount = useMemo(() => todos.filter((t) => !t.status).length, [todos]);
    const nickname = Cookies.get("nickname") || "使用者";

    useEffect(() => {
        const fetchTodos = async () => {
            setMsg("");
            setIsLoading(true);
            try {
                const res = await getTodos();
                setTodos(res?.data || []);
            } catch (err) {
                setMsg(err.message || "取得待辦失敗");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setMsg("");

        const text = newText.trim();
        if (!text) return;

        setIsLoading(true);
        try {
            await createTodo(text);
            setNewText("");


            const res = await getTodos();
            setTodos(res?.data || []);
        } catch (err) {
            setMsg(err.message || "新增失敗");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("nickname");
        Cookies.remove("exp"); 
        navigate("/login");
    };
    return (
        <main className="bg-yellow min-h-screen   md:bg-[linear-gradient(172.7deg,#FFD370_5.12%,#FFD370_53.33%,#FFD370_53.34%,#FFFFFF_53.45%,#FFFFFF_94.32%)]
        bg-position-[0_35px] bg-no-repeat">
            <div className="w-full max-w-257 mx-auto px-8 pb-9">

                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                        <img src={check} alt="Todo list logo" className="w-8.5 aspect-square" />
                        <h1 className="text-2xl font-bold font-baloo">ONLINE TODO LIST</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-base font-bold hidden md:block">
                            {nickname} 的待辦
                        </span>
                        <button 
                        onClick={handleLogout}
                        type="button" className="text-base  cursor-pointer">
                            登出
                        </button>
                    </div>
                </div>

                <form
                    className="max-w-125 mx-auto relative mt-4 md:mt-6"
                    onSubmit={handleCreate}
                >
                    <input
                        type="text"
                        placeholder="新增待辦事項"
                        className="w-full h-11.75 rounded-[10px] text-base bg-white pl-4 pr-14 shadow"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[10px] bg-black text-white flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="新增待辦"
                    >
                        <img src={plus} alt="" className="w-5 h-5" />
                    </button>
                </form>

                {msg ? <p className="text-sm font-bold mt-2">{msg}</p> : null}

                {filtered.length !== 0 ? (
                    <section className="max-w-125 mx-auto mt-4 bg-white rounded-[10px] shadow overflow-hidden">
                        <div className="grid grid-cols-3 text-center text-sm font-bold mb-1.75">
                            <button
                                type="button"
                                onClick={() => setTab("all")}
                                className={`py-4 border-b-2 text-sm ${tab === "all" ? "border-black text-black" : "border-black/10 text-black/40"
                                    }`}
                            >
                                全部
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab("active")}
                                className={`py-4 border-b-2 text-sm ${tab === "active" ? "border-black text-black" : "border-black/10 text-[#9F9A91]"
                                    }`}
                            >
                                待完成
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab("done")}
                                className={`py-4 border-b-2 text-sm ${tab === "done" ? "border-black text-black" : "border-[#E5E5E5] text-[#9F9A91]"
                                    }`}
                            >
                                已完成
                            </button>
                        </div>

                        <ul className="px-4">
                            {filtered.map((t) => (
                                <li key={t.id} className="group relative flex items-stretch">

                                    <div className="flex flex-1 items-center justify-between py-4 border-b border-[#E5E5E5] md:pr-6">
                                        <div className="flex items-center gap-3">

                                            <button
                                                type="button"
                                                onClick={() => toggleTodo(t.id)}
                                                className={`w-5 h-5 flex items-center justify-center rounded border cursor-pointer
                                                ${t.status ? "border-transparent" : "border-black/30"}`}
                                            >
                                                {t.status ? <img src={tick} alt="" className="w-4 h-4" /> : null}
                                            </button>

                                            <p className={`text-sm ${t.status ? "line-through text-[#9F9A91]" : "text-black"}`}>
                                                {t.content}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="md:hidden cursor-pointer"
                                            aria-label="刪除"

                                        >
                                            <img className="w-4 aspect-square" src={cross} alt="" />
                                        </button>
                                    </div>


                                    <div className="hidden md:block md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">
                                        <button
                                            type="button"
                                            className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="刪除"
                                        >
                                            <img className="w-4 aspect-square" src={cross} alt="" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="px-4 py-6 md:mb-2 text-sm font-bold">
                            {activeCount} 個待完成項目
                        </div>
                    </section>
                )
                    : (<div className="flex flex-col justify-center items-center">
                        <p className="mt-15 mb-4 text-base font-normal">目前尚無代辦事項</p>
                        <img className="max-w-30 md:max-w-60" src={empty} />
                    </div>)}





            </div>
        </main>
    );
}