import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";


import TodoHeader from "./TodoHeader";
import TodoCreateForm from "./TodoCreateForm";
import TodoListSection from "./TodoListSection";


import empty from "../../assets/imgs/empty.png";

import useTodoActions from "./useTodoActions"; 

export default function Todo() {

    const token = Cookies.get("token");
    const nickname = Cookies.get("nickname") || "使用者";
    const navigate = useNavigate();


    if (!token) return <Navigate to="/login" replace />;

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("nickname");
        Cookies.remove("exp");
        navigate("/login");
    };


    const {

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
        editingId,
        editingText,
        editErr,
        

        setEditingText,
        setEditErr,


        startEdit,
        cancelEdit,
        commitEdit,
        handleCreate,
        handleDelete,
        handleToggle,
    } = useTodoActions();


    return (
        <main className="bg-yellow min-h-screen md:bg-[linear-gradient(172.7deg,#FFD370_5.12%,#FFD370_53.33%,#FFD370_53.34%,#FFFFFF_53.45%,#FFFFFF_94.32%)] bg-position-[0_35px] bg-no-repeat">
            <div className="w-full max-w-257 mx-auto px-8 pb-9">
                
                <TodoHeader nickname={nickname} onLogout={handleLogout} />

                <TodoCreateForm
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onSubmit={handleCreate}
                    disabled={isLoading}
                />


                {msg ? <p className="text-sm font-bold mt-2">{msg}</p> : null}


                {isFetching ? (
                    <div className="max-w-125 mx-auto mt-4 bg-white rounded-[10px] shadow py-10 text-center">
                        <p className="text-sm font-bold">載入待辦事項中...</p>
                    </div>
                ) : todos.length !== 0 ? (
                    <TodoListSection
                        tab={tab}
                        onChangeTab={setTab}
                        filtered={filtered}
                        activeCount={activeCount}
                        editingId={editingId}
                        editingText={editingText}
                        editErr={editErr}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onStartEdit={startEdit}
                        onCancelEdit={cancelEdit}
                        onCommitEdit={commitEdit}

                        onEditingTextChange={(val) => {
                            setEditingText(val);
                            if (editErr) setEditErr("");
                        }}
                    />
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <p className="mt-15 mb-4 text-base font-normal">目前尚無代辦事項</p>
                        <img className="max-w-30 md:max-w-60" src={empty} alt="Empty list" />
                    </div>
                )}
            </div>
        </main>
    );
}