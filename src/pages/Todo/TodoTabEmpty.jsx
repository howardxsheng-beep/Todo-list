export default function TodoTabEmpty({ tab }) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="text-sm font-normal text-[#9F9A91]">
        {tab === "active"
          ? "目前沒有待完成事項"
          : tab === "done"
          ? "目前沒有已完成事項"
          : "目前沒有事項"}
      </p>
    </div>
  );
}