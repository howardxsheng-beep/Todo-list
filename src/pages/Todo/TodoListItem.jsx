
import cross from "../../assets/icons/cross.svg";
import tick from "../../assets/icons/tick.svg";

export default function TodoListItem({
  todo,

  editingId,
  editingText,
  editErr,

  onToggle,
  onDelete,

  onStartEdit,
  onCancelEdit,
  onCommitEdit,
  onEditingTextChange,
}) {
  const isEditing = editingId === todo.id;

  return (
    <li className="group relative flex items-stretch">
      <div className="flex flex-1 items-center justify-between py-4 border-b border-[#E5E5E5] md:pr-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggle(todo.id)}
            className={`w-5 h-5 flex items-center justify-center rounded border cursor-pointer
              ${todo.status ? "border-transparent" : "border-black/30"}`}
            aria-label={todo.status ? "標記為未完成" : "標記為已完成"}
          >
            {todo.status ? <img src={tick} alt="" className="w-4 h-4" /> : null}
          </button>

          {isEditing ? (
            <div className="flex flex-col">
              <input
                className="text-sm w-full bg-transparent outline-none border-b border-black/20 focus:border-black"
                value={editingText}
                onChange={(e) => onEditingTextChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onCommitEdit(todo.id);
                  }
                  if (e.key === "Escape") {
                    e.preventDefault();
                    onCancelEdit();
                  }
                }}
                onBlur={() => onCommitEdit(todo.id)}
                autoFocus
                aria-label="編輯待辦內容"
              />
              {editErr ? (
                <p className="mt-1 text-xs font-bold text-warning">{editErr}</p>
              ) : null}
            </div>
          ) : (
            <p
              className={`text-sm ${
                todo.status ? "line-through text-[#9F9A91]" : "text-black"
              } cursor-pointer`}
              title="點兩下編輯"
              onDoubleClick={() => onStartEdit(todo)}
            >
              {todo.content}
            </p>
          )}
        </div>


        <button
          type="button"
          className="md:hidden cursor-pointer"
          aria-label="刪除"
          onClick={() => onDelete(todo.id)}
        >
          <img className="w-4 aspect-square" src={cross} alt="" />
        </button>
      </div>


      <div className="hidden md:block md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">
        <button
          type="button"
          className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="刪除"
          onClick={() => onDelete(todo.id)}
        >
          <img className="w-4 aspect-square" src={cross} alt="" />
        </button>
      </div>
    </li>
  );
}