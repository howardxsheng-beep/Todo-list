import check from "../../assets/imgs/check.png";

export default function LoginForm({
    email,
    password,
    fieldErr,
    formMsg,
    isLoading,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onGoRegister,
}) {
    return (
        <section className="w-full max-w-78 mx-auto md:max-w-76 md:mx-0" aria-label="Login form">
            <div className="flex items-center justify-center gap-2 mb-5.5 md:mb-9">
                <div className="md:hidden flex items-center">
                    <img src={check} alt="Todo list logo" className="w-10 aspect-square" />
                    <h1 className="text-[32px] font-bold font-baloo">ONLINE TODO LIST</h1>
                </div>
            </div>

            <p className="text-xl font-bold text-center mb-8 md:mb-6 md:text-2xl md:text-start">
                最實用的線上待辦事項服務
            </p>

            <form className="flex flex-col gap-4 max-w-78" onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        placeholder="請輸入Email"
                        className="bg-white rounded-[10px] py-3 px-4 w-full"
                        onChange={onEmailChange}
                    />
                    <p className="text-warning text-sm font-bold mt-1.5">{fieldErr.email}</p>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-1" htmlFor="password">
                        <span className="md:hidden">password</span>
                        <span className="hidden md:inline">密碼</span>
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        placeholder="請輸入密碼"
                        className="bg-white rounded-[10px] py-3 px-4 w-full"
                        onChange={onPasswordChange}
                    />
                    <p className="text-warning text-sm font-bold mt-1.5">{fieldErr.password}</p>
                </div>

                {formMsg ? <p className=" text-warning text-sm font-bold">{formMsg}</p> : null}

                <button
                    type="submit"
                    className="mx-auto text-base font-bold text-white rounded-[10px] bg-black py-3 px-12 text-center mt-3.75 mb-3 md:mt-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? "登入中" : "登入"}
                </button>

                <button type="button" className="mx-auto text-base font-bold cursor-pointer" onClick={onGoRegister}>
                    註冊帳號
                </button>
            </form>
        </section>
    );
}