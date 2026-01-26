import check from "../../assets/imgs/check.png";

export default function RegisterForm({
  email,
  nickname,
  password,
  confirmPassword,

  fieldErr,
  formMsg,
  isLoading,

  onEmailChange,
  onNicknameChange,
  onPasswordChange,
  onConfirmPasswordChange,

  onSubmit,
  onGoLogin,
}) {
  return (
    <section className="w-full max-w-78 mx-auto md:max-w-76 md:mx-0" aria-label="Register form">
      <div className="flex items-center justify-center gap-2 mb-5.5 md:mb-0">
        <div className="md:hidden flex items-center">
          <img src={check} alt="Todo list logo" className="w-10 aspect-square" />
          <h1 className="text-[32px] font-bold font-baloo">ONLINE TODO LIST</h1>
        </div>
      </div>

      <p className="text-2xl font-bold text-center mb-6.5 md:mb-6 md:text-2xl md:text-start">
        註冊帳號
      </p>

      <form className="flex flex-col gap-4 max-w-78" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label className="text-sm font-bold mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="請輸入Email"
            className="bg-white rounded-[10px] py-3 px-4 w-full"
            value={email}
            onChange={onEmailChange}
          />
          <p className="text-warning text-sm font-bold mt-1.5">{fieldErr?.email}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold mb-1" htmlFor="nickname">您的暱稱</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="請輸入暱稱"
            className="bg-white rounded-[10px] py-3 px-4 w-full"
            value={nickname}
            onChange={onNicknameChange}
          />
          <p className="text-warning text-sm font-bold mt-1.5">{fieldErr?.nickname}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold mb-1" htmlFor="password">密碼</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="請輸入密碼"
            className="bg-white rounded-[10px] py-3 px-4 w-full"
            value={password}
            onChange={onPasswordChange}
          />
          <p className="text-warning text-sm font-bold mt-1.5">{fieldErr?.password}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold mb-1" htmlFor="confirmPassword">再次輸入密碼</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="請再次輸入密碼"
            className="bg-white rounded-[10px] py-3 px-4 w-full"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />
          <p className="text-warning text-sm font-bold mt-1.5">{fieldErr?.confirmPassword}</p>
        </div>
        

        {formMsg ? <p className="text-warning text-sm font-bold ">{formMsg}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="mx-auto text-base font-bold text-white rounded-[10px] bg-black py-2.5 px-12 text-center -mt-px mb- cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "註冊中..." : "註冊帳號"}
        </button>

        <button
          type="button"
          className="mx-auto text-base font-bold cursor-pointer"
          onClick={onGoLogin}
        >
          登入
        </button>
      </form>
    </section>
  );
}