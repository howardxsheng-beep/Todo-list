import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import check from "../../assets/imgs/check.png";
import hero from "../../assets/imgs/todo_board.png"; 
import { signIn } from "../../api/auth";
import Cookies from 'js-cookie';




export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formMsg, setFormMsg] = useState("");
  const [fieldErr, setFieldErr] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const next = { email: "", password: "" };
    let ok = true;

    if (!email.trim()) {
      next.email = "Email 不可為空";
      ok = false;
    }

    if (!password) {
      next.password = "密碼不可為空";
      ok = false;
    } else if (password.length < 6) {
      next.password = "密碼至少 6 碼";
      ok = false;
    }

    setFieldErr(next);
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMsg("");

    if (!validate()) return;

    setIsLoading(true);
    try {
      const data = await signIn({ email, password });
      Cookies.set("token", data.token,{
        expires: 7,
        // secure:isHttps,
        sameSite:"strict",
      });

      setFormMsg("登入成功");

      navigate("/");
    } catch (err) {
      setFormMsg(err.message || "登入失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-yellow pt-12 pb-33.5 md:pt-0 md:pb-0 md:min-h-screen md:flex md:items-center">

      <div className="w-full max-w-[816px] mx-auto px-6 md:px-0 ">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_304px] items-center gap-10 md:gap-26.5">
          

          <section className="hidden md:flex flex-col justify-center" aria-label="Login visual">
            <div className="flex justify-center items-center mb-[21px]">
            <img src={check} alt="Todo list logo" className="w-10 aspect-square" />
              <h1 className=" md:text-[32px] font-bold font-baloo  ">
                ONLINE TODO LIST
              </h1>
              </div>
            <img
              src={hero}
              alt="todo illustration"
              className="w-full mx-auto max-w-[386px] aspect-square h-auto"
            />
          </section>

          <section className="w-full max-w-[312px] mx-auto md:max-w-[304px] md:mx-0" aria-label="Login form">
            <div className="flex items-center justify-center gap-2 mb-4 md:mb-9">
              <div className="md:hidden flex items-center">
              <img src={check} alt="Todo list logo" className="w-10 aspect-square" />
              <h1 className="text-[28px] md:text-[32px] font-bold font-baloo ">
                ONLINE TODO LIST
              </h1>
              </div>
            </div>

            <p className="text-xl font-bold text-center mb-8 md:mb-6 md:text-2xl md:text-start">
              最實用的線上代辦事項服務
            </p>

            <form 
            className="flex flex-col gap-4 max-w-78"
            onSubmit={handleSubmit} >
              <div className="flex flex-col ">
                <label className="text-sm font-bold mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  placeholder="請輸入Email"
                  className="bg-white rounded-[10px] py-3 px-4 w-full"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <p className="text-warning text-sm font-bold mt-1.5">{fieldErr.email}</p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1" htmlFor="password">
                  密碼
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  placeholder="請輸入密碼"
                  className="bg-white rounded-[10px] py-3 px-4 w-full"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <p className="text-warning text-sm font-bold mt-1.5">{fieldErr.password}</p>
              </div>

              {formMsg ? <p className="text-sm font-bold">{formMsg}</p> : null}

              <button
                type="submit"
                className="mx-auto text-base font-bold text-white rounded-[10px] bg-black py-3 px-12 text-center mt-4.5 mb-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled ={isLoading}
              >
                {isLoading ? '登入中' : '登入'}
              </button>

              <button
                type="button"
                className="mx-auto text-base font-bold cursor-pointer"
                onClick={() => navigate('/register')}
              >
                註冊帳號
              </button>
            </form>
          </section>

        </div>
      </div>
    </main>
  );
}