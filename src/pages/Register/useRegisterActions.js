import { useState } from "react";
import { signUp } from "../../api/auth";

export default function useRegisterActions({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [formMsg, setFormMsg] = useState("");
  const [fieldErr, setFieldErr] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMsg("");

    if (!validate()) return;

    setIsLoading(true);
    try {
      const data = await signUp({ email, password, nickname });
      setFormMsg(`註冊成功（uid: ${data.uid}）`);
      onSuccess?.();
    } catch (err) {
      setFormMsg(err.message || "註冊失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    setFormMsg,

    handleSubmit,
  };
}