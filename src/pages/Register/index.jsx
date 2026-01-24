import { useState } from "react";
import { useNavigate } from "react-router-dom";
import check from "../../assets/imgs/check.png";
import hero from "../../assets/imgs/todo_board.png";
import { signUp } from "../../api/auth";


export default function Register() {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);


    const [fieldErr, setFieldErr] = useState({
        email: "",
        nickname: "",
        password: "",
        confirmPassword: "",
    });


    const [formMsg, setFormMsg] = useState("");

    const validate = () => {
        const next = { email: "", nickname: "", password: "", confirmPassword: "" };
        let ok = true;

        if (!email.trim()) {
            next.email = "Email 不可為空";
            ok = false;
        }

        if (!nickname.trim()) {
            next.nickname = "暱稱不可為空";
            ok = false;
        }

        if (!password) {
            next.password = "密碼不可為空";
            ok = false;
        } else if (password.length < 6) {
            next.password = "密碼至少 6 碼";
            ok = false;
        }

        if (!confirmPassword) {
            next.confirmPassword = "請再次輸入密碼";
            ok = false;
        } else if (confirmPassword !== password) {
            next.confirmPassword = "兩次密碼輸入不一致";
            ok = false;
        }

        setFieldErr(next);
        return ok;
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormMsg("");

        if (!validate()) return;

        setIsLoading(true);
        try {
            const data = await signUp({ email, password, nickname });

            setFormMsg(`註冊成功（uid: ${data.uid}）`);
            navigate("/login")


        } catch (err) {

            setFormMsg(err.message || "註冊失敗");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="bg-yellow pt-12 pb-7.25 md:pt-0 md:pb-0 md:min-h-screen md:flex md:items-center">
            <div className="w-full max-w-[816px] flex items-center justify-center mx-auto px-6 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_304px] items-center gap-10 md:gap-26.5">
                    <section className="hidden md:flex flex-col justify-center" aria-label="Login visual">
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

                    <section className="w-full max-w-[312px] mx-auto md:max-w-[304px] md:mx-0" aria-label="Login form">
                        <div className="flex items-center justify-center gap-2 mb-4 md:mb-0">
                            <div className="md:hidden flex items-center">
                                <img src={check} alt="Todo list logo" className="w-10 aspect-square" />
                                <h1 className="text-[28px] md:text-[32px] font-bold font-baloo">ONLINE TODO LIST</h1>
                            </div>
                        </div>

                        <p className="text-xl font-bold text-center mb-6.5 md:mb-6 md:text-2xl md:text-start">
                            註冊帳號
                        </p>

                        <form className="flex flex-col gap-4 max-w-78" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="請輸入Email"
                                    className="bg-white rounded-[10px] py-3 px-4 w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className="text-warning text-sm font-bold mt-1.5">{fieldErr.email}</p>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1" htmlFor="nickname">
                                    您的暱稱
                                </label>
                                <input
                                    id="nickname"
                                    name="nickname"
                                    type="text"
                                    placeholder="請輸入暱稱"
                                    className="bg-white rounded-[10px] py-3 px-4 w-full"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                                <p className="text-warning text-sm font-bold mt-1.5">{fieldErr.nickname}</p>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1" htmlFor="password">
                                    密碼
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="請輸入密碼"
                                    className="bg-white rounded-[10px] py-3 px-4 w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className="text-warning text-sm font-bold mt-1.5">{fieldErr.password}</p>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1" htmlFor="confirmPassword">
                                    再次輸入密碼
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="請再次輸入密碼"
                                    className="bg-white rounded-[10px] py-3 px-4 w-full"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <p className="text-warning text-sm font-bold mt-1.5">{fieldErr.confirmPassword}</p>
                            </div>


                            {formMsg ? <p className="text-sm font-bold">{formMsg}</p> : null}


                            <button
                                type="submit"
                                disabled={isLoading}
                                className="mx-auto text-base font-bold text-white rounded-[10px] bg-black py-2.5 px-12 text-center mt-2.5 mb-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "註冊中..." : "註冊帳號"}
                            </button>

                            <button
                                type="button"
                                className="mx-auto text-base font-bold cursor-pointer"
                                onClick={() => navigate('/login')}
                            >
                                登入
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}