import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Camera, Mail, User } from "lucide-react";
import AuthShell from "../components/layout/AuthShell";
import FormError from "../components/ui/FormError";
import PasswordInput from "../components/ui/PasswordInput";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "../utils/errors";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    return () => {
      if (avatar) URL.revokeObjectURL(avatar.url);
    };
  }, [avatar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      return setError("Profile photo must be a JPG, PNG, WebP or GIF file.");
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return setError("Profile photo must be smaller than 2 MB.");
    }
    setError("");
    setAvatar({ file, url: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim()) {
      setError("Enter your full name.");
      nameRef.current?.focus();
      return;
    }
    if (!form.email.trim()) {
      setError("Enter your email.");
      emailRef.current?.focus();
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      passwordRef.current?.focus();
      return;
    }

    const body = new FormData();
    body.append("fullName", form.fullName.trim());
    body.append("email", form.email.trim());
    body.append("password", form.password);
    if (avatar) body.append("profileImage", avatar.file);

    setBusy(true);
    try {
      await register(body);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start tracking income and expenses in a minute."
      footer={
        <div className="relative mt-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#D4DDF3]" />
          </div>
          <div className="relative bg-white px-3 text-sm font-normal text-[#556987]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#4779D5] hover:underline inline-flex items-center gap-1"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Profile photo picker */}
        <div className="flex items-center gap-4 rounded-2xl border border-[#D4DDF3] p-3 bg-[#F5F7FC]/50">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-dashed border-[#AFC3EA] bg-white transition-colors hover:border-[#4779D5] cursor-pointer"
            aria-label="Choose a profile photo"
          >
            {avatar ? (
              <img
                src={avatar.url}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera className="h-5 w-5 text-[#4779D5]" aria-hidden="true" />
            )}
          </button>
          <div className="text-sm">
            <p className="font-semibold text-[#0B2452]">Profile photo</p>
            <p className="text-xs font-normal text-[#556987]">
              Optional. JPG, PNG, WebP or GIF under 2 MB.
            </p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept={IMAGE_TYPES.join(",")}
            onChange={handleFile}
            className="hidden"
          />
        </div>

        {/* Full name input */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#0B2452]">
            <User className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="fullName"
            name="fullName"
            ref={nameRef}
            value={form.fullName}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[#D4DDF3] bg-white py-3.5 pl-11 pr-4 text-sm font-normal text-[#0B2452] placeholder:font-normal placeholder:text-[#94A3B8] transition-colors focus:border-[#4779D5] focus:ring-2 focus:ring-[#4779D5]/20 focus:outline-none"
            placeholder="Full name"
            autoComplete="name"
            aria-label="Full name"
          />
        </div>

        {/* Email input */}
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

        {/* Password input */}
        <div>
          <PasswordInput
            id="password"
            name="password"
            inputRef={passwordRef}
            value={form.password}
            onChange={handleChange}
            placeholder="Password (at least 8 characters)"
            autoComplete="new-password"
            aria-label="Password"
            leftIcon={true}
          />
        </div>

        <FormError>{error}</FormError>

        {/* Submit button */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FFB900] py-3.5 text-base font-semibold text-[#0B2452] shadow-sm transition-all hover:bg-[#eab007] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          disabled={busy}
        >
          <span>{busy ? "Creating account..." : "Create account"}</span>
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </AuthShell>
  );
};

export default Register;
