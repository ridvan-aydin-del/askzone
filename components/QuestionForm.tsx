"use client";
import { supabase } from "@/lib/supabase";
import { useFormik } from "formik";
import * as Yup from "yup";
const QuestionForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      tags: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(10, "Başlık en az 10 karakter olmalı")
        .required("Başlık zorunludur"),
      content: Yup.string()
        .min(20, "İçerik en az 20 karakter olmalı")
        .required("İçerik zorunludur"),
      tags: Yup.string().required("Etiket girin (virgülle ayırın)"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const tagArray = values.tags
        .replace(/\s+/g, ",") // boşlukları virgül yap
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Oturum bulunamadı. Lütfen giriş yapın.");
        return;
      }

      const { error } = await supabase.from("questions").insert({
        title: values.title,
        content: values.content,
        tags: tagArray,
        user_id: user.id,
      });

      if (error) {
        console.error("Soru eklenemedi:", error.message);
        alert("Bir hata oluştu");
      } else {
        alert("Soru başarıyla eklendi!");
        resetForm(); // Formu temizle
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* 2️⃣ Title input */}
      <div>
        <label className="block font-medium">Başlık</label>
        <input
          type="text"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-sm">{formik.errors.title}</div>
        )}
      </div>

      {/* 3️⃣ Content input */}
      <div>
        <label className="block font-medium">İçerik</label>
        <textarea
          name="content"
          rows={6}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.content && formik.errors.content && (
          <div className="text-red-500 text-sm">{formik.errors.content}</div>
        )}
      </div>

      {/* 4️⃣ Tags input */}
      <div>
        <label className="block font-medium">Etiketler</label>
        <input
          type="text"
          name="tags"
          onChange={formik.handleChange}
          onBlur={(e) => {
            const cleaned = e.target.value
              .replace(/\s+/g, ",") // boşlukları virgüle çevir
              .replace(/,+/g, ",") // fazla virgülleri teke indir
              .replace(/^,|,$/g, ""); // baştaki/sondaki virgülü sil

            formik.setFieldValue("tags", cleaned); // değeri güncelle
            formik.handleBlur(e); // formik blur işlemini yine çalıştır
          }}
          value={formik.values.tags}
          className="w-full border px-3 py-2 rounded"
          placeholder="react,nextjs,supabase"
        />
        {formik.touched.tags && formik.errors.tags && (
          <div className="text-red-500 text-sm">{formik.errors.tags}</div>
        )}
      </div>

      {/* 5️⃣ Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Soruyu Gönder
      </button>
    </form>
  );
};

export default QuestionForm;
