import check from "../../assets/imgs/check.png";
import hero from "../../assets/imgs/todo_board.png";

export default function RegisterVisual() {
  return (
    <section className="hidden md:flex flex-col justify-center" aria-label="Register visual">
      <div className="flex justify-center items-center mb-[21px]">
        <img src={check} alt="Todo list logo" className="w-10 aspect-square" />
        <h1 className="md:text-[32px] font-bold font-baloo">ONLINE TODO LIST</h1>
      </div>

      <img
        src={hero}
        alt="todo illustration"
        className="w-full mx-auto max-w-[386px] aspect-square h-auto"
      />
    </section>
  );
}