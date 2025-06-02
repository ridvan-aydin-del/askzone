"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import * as Yup from "yup";
import { useFormik } from "formik";

type Answer = {
  id: string;
  content: string;
  question_id: string;
  created_at: string;
};

export default function AnswersSection({ questionId }: { questionId: string }) {
  const [answers, setAnswers] = useState<Answer[]>([]);

  // ✅ fetchAnswers fonksiyonu dışarı alındı ki hem useEffect'te hem onSubmit'te kullanabilelim
  const fetchAnswers = async () => {
    const { data, error } = await supabase
      .from("answers")
      .select("*")
      .eq("question_id", questionId)
      .order("created_at", { ascending: false });

    setAnswers(data ?? []);
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const validationSchema = Yup.object({
    content: Yup.string()
      .required("Cevap boş bırakılamaz")
      .max(500, "Cevap en fazla 500 karakter olabilir"),
  });

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        console.error("Kullanıcı giriş yapmamış");
        return;
      }

      const { error } = await supabase.from("answers").insert([
        {
          content: values.content,
          question_id: questionId,
          user_id: user.id,
        },
      ]);

      if (!error) {
        resetForm();
        fetchAnswers(); // ✅ Yeni eklenen veriyi göstermek için tekrar çekiyoruz
      } else {
        console.error("Hata:", error.message);
      }
    },
  });

  return (
    <div className="mt-10">
      <form onSubmit={formik.handleSubmit}>
        <textarea
          name="content"
          className="w-full border p-2 rounded"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Cevabınızı yazın..."
        />
        {formik.touched.content && formik.errors.content && (
          <p className="text-red-500 text-sm">{formik.errors.content}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
          disabled={formik.isSubmitting}
        >
          Gönder
        </button>
      </form>

      {answers.map((answer, index) => (
        <div key={index} className="bg-gray-300 rounded-lg p-4 my-4">
          <p className="text-gray-800 break-words whitespace-pre-wrap w-full">
            {answer.content}
          </p>
          <p className="text-sm text-gray-600 text-right mt-2">
            {new Date(answer.created_at).toLocaleDateString("tr-TR")}
          </p>
        </div>
      ))}
    </div>
  );
}
