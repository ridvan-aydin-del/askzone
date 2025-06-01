"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Props = {
  type: "login" | "register";
};

export default function AuthForm({ type }: Props) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Geçerli bir e-posta girin")
        .required("E-posta zorunludur"),
      password: Yup.string()
        .min(6, "Şifre en az 6 karakter olmalı")
        .required("Şifre zorunludur"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      let result;

      if (type === "login") {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }

      if (result.error) {
        alert("Hata: " + result.error.message);
      } else {
        alert("Başarılı!");
        router.push("/");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center mb-2">
        {type === "login" ? "Giriş Yap" : "Kayıt Ol"}
      </h1>
      <div>
        <label className="block">E-posta</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
      <div>
        <label className="block">Şifre</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {type === "login" ? "Giriş Yap" : "Kayıt Ol"}
      </button>
      <h1 className="text-center mb-2">
        {type === "login" ? (
          <Link href="/register">Hesap oluşturmak için tıkla !</Link>
        ) : (
          <Link href="/login">Zaten hesabın var mı ? Giriş Yap</Link>
        )}
      </h1>
    </form>
  );
}
