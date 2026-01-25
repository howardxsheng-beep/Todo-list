import { useNavigate } from "react-router-dom";

import RegisterVisual from "./RegisterVisual";
import RegisterForm from "./RegisterForm";
import useRegisterActions from "./useRegisterActions";

export default function Register() {
  const navigate = useNavigate();

  const {
    email,
    setEmail,
    nickname,
    setNickname,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,

    isLoading,
    formMsg,
    fieldErr,
    handleSubmit,
  } = useRegisterActions({
    onSuccess: () => navigate("/login"),
  });

  return (
    <main className="bg-yellow pt-12 pb-7.25 md:pt-0 md:pb-0 md:min-h-screen md:flex md:items-center">
      <div className="w-full max-w-[816px] flex items-center justify-center mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_304px] items-center gap-10 md:gap-26.5">
          <RegisterVisual />

          <RegisterForm
            email={email}
            nickname={nickname}
            password={password}
            confirmPassword={confirmPassword}
            fieldErr={fieldErr}
            formMsg={formMsg}
            isLoading={isLoading}
            onEmailChange={(e) => setEmail(e.target.value)}
            onNicknameChange={(e) => setNickname(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
            onSubmit={handleSubmit}
            onGoLogin={() => navigate("/login")}
          />
        </div>
      </div>
    </main>
  );
}