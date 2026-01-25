export default function TodoTabs({ tab, onChangeTab }) {
  return (
    <div className="grid grid-cols-3 text-center text-sm font-bold mb-1.75">
      <button
        type="button"
        onClick={() => onChangeTab("all")}
        className={`py-4 border-b-2 text-sm ${
          tab === "all" ? "border-black text-black" : "border-black/10 text-black/40"
        }`}
      >
        全部
      </button>

      <button
        type="button"
        onClick={() => onChangeTab("active")}
        className={`py-4 border-b-2 text-sm ${
          tab === "active" ? "border-black text-black" : "border-black/10 text-[#9F9A91]"
        }`}
      >
        待完成
      </button>

      <button
        type="button"
        onClick={() => onChangeTab("done")}
        className={`py-4 border-b-2 text-sm ${
          tab === "done" ? "border-black text-black" : "border-[#E5E5E5] text-[#9F9A91]"
        }`}
      >
        已完成
      </button>
    </div>
  );
}