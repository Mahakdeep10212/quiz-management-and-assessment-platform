"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Loader2, User, Mail, Lock, ArrowRight } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      setError("");
      await axios.post("/api/auth/register", data);
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during registration");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo size="large" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Create an account
          </h2>
          <p className="text-sm text-slate-500">
            Join SkillPulse to begin testing and certifying your skills
          </p>
        </div>
        
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Alex Morgan"
                  autoComplete="name"
                  className={`pl-10 appearance-none relative block w-full px-3.5 py-2.5 border ${errors.name ? 'border-rose-300 ring-1 ring-rose-300' : 'border-slate-300'} placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm transition-all`}
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  autoComplete="email"
                  className={`pl-10 appearance-none relative block w-full px-3.5 py-2.5 border ${errors.email ? 'border-rose-300 ring-1 ring-rose-300' : 'border-slate-300'} placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm transition-all`}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address"
                    }
                  })}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`pl-10 appearance-none relative block w-full px-3.5 py-2.5 border ${errors.password ? 'border-rose-300 ring-1 ring-rose-300' : 'border-slate-300'} placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm transition-all`}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 active:scale-95 transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
          
          <div className="text-center text-sm pt-2">
            <span className="text-slate-500">Already have an account? </span>
            <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-700">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

