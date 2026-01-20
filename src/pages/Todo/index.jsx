import { useMemo, useState } from "react";
import check from "../../assets/imgs/check.png";
import plus from "../../assets/icons/plus_icon.svg";
import cross from "../../assets/icons/cross.svg";
import tick from "../../assets/icons/tick.svg";

const mockTodos = [
  { id: "1", createTime: 1620281234, content: "把冰箱發霉的檸檬拿去丟", status: false },
  { id: "2", createTime: 1620282234, content: "打電話叫媽媽匯款給我", status: true },
  { id: "3", createTime: 1620283234, content: "整理電腦資料夾", status: false },
  { id: "4", createTime: 1620284234, content: "繳電費水費瓦斯費", status: true },
  { id: "5", createTime: 1620285234, content: "約vicky禮拜三泡溫泉", status: false },
];

export default function Todo() {
  const [tab, setTab] = useState("all");
  const [todos, setTodos] = useState(mockTodos);

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

  const activeCount = useMemo(() => todos.filter((t) => !t.status).length, [todos]);

  return (
    <main className="bg-yellow min-h-screen md:bg-[linear-gradient(172.7deg,#FFD370_5.12%,#FFD370_53.33%,#FFD370_53.34%,#FFFFFF_53.45%,#FFFFFF_94.32%)]">
      <div className="w-full max-w-[1028px] mx-auto px-8 pb-9">

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src={check} alt="Todo list logo" className="w-8.5 aspect-square" />
            <h1 className="text-2xl font-bold font-baloo">ONLINE TODO LIST</h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-base font-bold hidden md:block">王小明的待辦</span>
            <button type="button" className="text-base  cursor-pointer">
              登出
            </button>
          </div>
        </div>

        <form
          className="max-w-[500px] mx-auto relative mt-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="新增待辦事項"
            className="w-full h-[47px] rounded-[10px] text-base bg-white pl-4 pr-14 shadow"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[10px] bg-black text-white flex justify-center items-center cursor-pointer"
            aria-label="新增待辦"
          >
            <img src={plus} alt="" className="w-5 h-5" />
          </button>
        </form>

        <section className="max-w-[500px] mx-auto mt-4 bg-white rounded-[10px] shadow overflow-hidden">
          <div className="grid grid-cols-3 text-center text-sm font-bold">
            <button
              type="button"
              onClick={() => setTab("all")}
              className={`py-4 border-b-2 text-sm ${
                tab === "all" ? "border-black text-black" : "border-black/10 text-black/40"
              }`}
            >
              全部
            </button>
            <button
              type="button"
              onClick={() => setTab("active")}
              className={`py-4 border-b-2 text-sm ${
                tab === "active" ? "border-black text-black" : "border-black/10 text-[#9F9A91]"
              }`}
            >
              待完成
            </button>
            <button
              type="button"
              onClick={() => setTab("done")}
              className={`py-4 border-b-2 text-sm ${
                tab === "done" ? "border-black text-black" : "border-[#E5E5E5] text-[#9F9A91]"
              }`}
            >
              已完成
            </button>
          </div>

          <ul className="px-4">
            {filtered.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleTodo(t.id)}
                    className={`w-5 h-5 flex items-center justify-center rounded border cursor-pointer
                      ${t.status ? "border-transparent" : "border-black/30"}`}
                    aria-label={t.status ? "標記為未完成" : "標記為已完成"}
                  >
                    {t.status ? <img src={tick} alt="" className="w-4 h-4" /> : null}
                  </button>

                  <p className={`text-sm ${t.status ? "line-through text-[#9F9A91]" : "text-black"}`}>
                    {t.content}
                  </p>
                </div>

                <button type="button" className="cursor-pointer">
                  <img className="w-4 aspect-square" src={cross} alt="" />
                </button>
              </li>
            ))}
          </ul>

          <div className="px-4 py-6 text-sm font-bold">
            {activeCount} 個待完成項目
          </div>
        </section>
      </div>
    </main>
  );
}