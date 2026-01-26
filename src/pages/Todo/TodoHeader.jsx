import check from "../../assets/imgs/check.png";

export default function TodoHeader({ nickname, onLogout }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <img src={check} alt="Todo list logo" className="w-8.5 aspect-square" />
        <h1 className="text-2xl font-bold font-baloo">ONLINE TODO LIST</h1>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-base font-bold hidden md:block">{nickname} 的待辦</span>
        <button type="button" onClick={onLogout} className=" text-sm md:text-base cursor-pointer">
          登出
        </button>
      </div>
    </div>
  );
}