import TodoTabs from "./TodoTabs";
import TodoTabEmpty from "./TodoTabEmpty";
import TodoListItem from "./TodoListItem";

export default function TodoListSection({
  tab,
  onChangeTab,

  filtered,
  activeCount,

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
  return (
    <section className="max-w-125 mx-auto mt-4 bg-white rounded-[10px] shadow overflow-hidden">
      <TodoTabs tab={tab} onChangeTab={onChangeTab} />

      {filtered.length !== 0 ? (
        <>
          <ul className="px-4">
            {filtered.map((t) => (
              <TodoListItem
                key={t.id}
                todo={t}
                editingId={editingId}
                editingText={editingText}
                editErr={editErr}
                onToggle={onToggle}
                onDelete={onDelete}
                onStartEdit={onStartEdit}
                onCancelEdit={onCancelEdit}
                onCommitEdit={onCommitEdit}
                onEditingTextChange={onEditingTextChange}
              />
            ))}
          </ul>

          <div className="px-4 py-6 md:mb-2 text-sm font-bold">
            {activeCount} 個待完成項目
          </div>
        </>
      ) : (
        <TodoTabEmpty tab={tab} />
      )}
    </section>
  );
}