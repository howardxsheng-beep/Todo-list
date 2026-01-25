import { useState } from "react";
import Cookies from "js-cookie";
import { signIn } from "../../api/auth";

export default function useLoginActions({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [formMsg, setFormMsg] = useState("");
  const [fieldErr, setFieldErr] = useState({ email: "", password: "" });

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

      Cookies.set("token", data.token, { expires: 7, sameSite: "strict" });
      Cookies.set("nickname", data.nickname, { expires: 7, sameSite: "strict" });
      Cookies.set("exp", String(data.exp), { expires: 7, sameSite: "strict" });

      setFormMsg("登入成功");
      onSuccess?.();
    } catch (err) {
      setFormMsg(err.message || "登入失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    formMsg,
    fieldErr,
    setFormMsg,
    handleSubmit,
  };
}