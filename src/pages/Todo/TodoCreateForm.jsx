import plus from "../../assets/icons/plus_icon.svg";

export default function TodoCreateForm({
  value,
  onChange,
  onSubmit,
  disabled,
}) {
  return (
    <form className="max-w-125 mx-auto relative mt-4 md:mt-6" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="新增待辦事項"
        className="w-full h-11.75 rounded-[10px] text-base bg-white pl-4 pr-14 shadow"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[10px] bg-black text-white flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="新增待辦"
      >
        <img src={plus} alt="" className="w-5 h-5" />
      </button>
    </form>
  );
}