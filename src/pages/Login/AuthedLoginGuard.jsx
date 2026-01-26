import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import LoginVisual from "./LoginVisual";

export default function AuthedLoginGuard({ seconds = 3 }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("nickname");
    Cookies.remove("exp");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, seconds * 1000);

    return () => clearTimeout(timer);
  }, [navigate, seconds]);

  return (
    <main className="bg-yellow pt-12 pb-33.5 md:pt-0 md:pb-0 md:min-h-screen md:flex md:items-center">
      <div className="w-full max-w-204 mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_304px] items-center gap-10 md:gap-26.5">
          <LoginVisual />

          <section className="w-full max-w-78 mx-auto md:max-w-76 md:mx-0">
            <p className="text-xl font-bold text-center mb-2 md:text-2xl md:text-start">
              您已登入
            </p>

            <p className="text-sm font-bold text-[#9F9A91] mb-6 md:mb-8">
              將在 {seconds} 秒後自動前往待辦清單
            </p>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                className="w-full text-base font-bold text-white rounded-[10px] bg-black py-3 cursor-pointer"
                onClick={() => navigate("/", { replace: true })}
              >
                立即前往待辦清單
              </button>

              <button
                type="button"
                className="w-full text-base font-bold cursor-pointer"
                onClick={handleLogout}
              >
                登出
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}