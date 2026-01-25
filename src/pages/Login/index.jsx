import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import useLoginActions from "./useLoginActions";
import LoginVisual from "./LoginVisual";

export default function Login() {
  const navigate = useNavigate();

  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    formMsg,
    fieldErr,
    handleSubmit,
  } = useLoginActions({
    onSuccess: () => navigate("/"),
  });

  return (
    <main className="bg-yellow pt-12 pb-33.5 md:pt-0 md:pb-0 md:min-h-screen md:flex md:items-center">
      <div className="w-full max-w-[816px] mx-auto px-6 md:px-0 ">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_304px] items-center gap-10 md:gap-26.5">

          <LoginVisual />


          <LoginForm
            email={email}
            password={password}
            fieldErr={fieldErr}
            formMsg={formMsg}
            isLoading={isLoading}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
            onGoRegister={() => navigate("/register")}
          />
        </div>
      </div>
    </main>
  );
}