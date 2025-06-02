"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // sayfa ilk açıldığında kullanıcıyı al
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });

    // auth değiştiğinde güncelle
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // çıkış yaptıktan sonra state otomatik güncellenecek
  };

  return (
    <nav className="w-full border-b border-gray-200 py-4 px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          AskZone
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/ask">Soru Sor</Link>
          {userEmail ? (
            <>
              <span className="text-gray-600">{userEmail}</span>
              <Link href="/login">
                <button onClick={handleLogout} className="text-red-500">
                  Çıkış
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">Giriş</Link>
              <Link href="/register">Kayıt</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
