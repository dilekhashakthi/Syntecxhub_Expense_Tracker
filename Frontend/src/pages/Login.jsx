import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import AuthShell from "../components/layout/AuthShell";
import FormError from "../components/ui/FormError";
import PasswordInput from "../components/ui/PasswordInput";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "../utils/errors";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim()) {
      setError("Enter your email.");
      emailRef.current?.focus();
      return;
    }

    if (!form.password) {
      setError("Enter your password.");
      passwordRef.current?.focus();
      return;
    }

    setBusy(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
      setBusy(false);
      passwordRef.current?.select();
    }
  };

  return (
    <AuthShell
      title="Welcome back!"
      subtitle="Log in to your account and take control of your finances."
      footer={
        <div className="relative mt-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#D4DDF3]" />
          </div>
          <div className="relative bg-white px-3 text-sm font-normal text-[#556987]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#4779D5] hover:underline inline-flex items-center gap-1"
            >
              Create one <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email Field */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#0B2452]">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            ref={emailRef}
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[#D4DDF3] bg-white py-3.5 pl-11 pr-4 text-sm font-normal text-[#0B2452] placeholder:font-normal placeholder:text-[#94A3B8] transition-colors focus:border-[#4779D5] focus:ring-2 focus:ring-[#4779D5]/20 focus:outline-none"
            placeholder="Email address"
            autoComplete="email"
            aria-label="Email address"
          />
        </div>

        {/* Password Field */}
        <div>
          <PasswordInput
            id="password"
            name="password"
            inputRef={passwordRef}
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="current-password"
            aria-label="Password"
            leftIcon={true}
          />
        </div>

        <FormError>{error}</FormError>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FFB900] py-3.5 text-base font-semibold text-[#0B2452] shadow-sm transition-all hover:bg-[#eab007] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          disabled={busy}
        >
          <span>{busy ? "Logging in..." : "Log in"}</span>
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </AuthShell>
  );
};

export default Login;
