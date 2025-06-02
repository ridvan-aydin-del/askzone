"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  questionId?: string;
  answerId?: string;
};

export default function UpvoteButton({ questionId, answerId }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  const voteField = questionId ? "question_id" : "answer_id";
  const targetId = questionId || answerId;

  useEffect(() => {
    // 1. Oy sayısını herkes için göster
    fetchVoteCount();

    // 2. Giriş yapmışsa oy verip vermediğini kontrol et
    supabase.auth.getUser().then(({ data: userData }) => {
      const user = userData?.user;
      if (!user) return;
      setUserId(user.id);
      fetchUserVoteStatus(user.id);
    });
  }, [questionId, answerId]);

  const fetchVoteCount = async () => {
    const { count } = await supabase
      .from("upvotes")
      .select("*", { count: "exact", head: true })
      .eq(voteField, targetId);

    setVoteCount(count ?? 0);
  };

  const fetchUserVoteStatus = async (userId: string) => {
    const { data: vote } = await supabase
      .from("upvotes")
      .select("*")
      .eq("user_id", userId)
      .eq(voteField, targetId)
      .maybeSingle();

    setHasVoted(!!vote);
  };

  const handleUpvote = async () => {
    if (!userId) {
      alert("Giriş yapmalısın!");
      return;
    }

    if (hasVoted) {
      await supabase
        .from("upvotes")
        .delete()
        .eq("user_id", userId)
        .eq(voteField, targetId);

      setHasVoted(false);
      setVoteCount((prev) => prev - 1);
    } else {
      await supabase.from("upvotes").insert([
        {
          user_id: userId,
          question_id: questionId ?? null,
          answer_id: answerId ?? null,
        },
      ]);

      setHasVoted(true);
      setVoteCount((prev) => prev + 1);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={!userId}
      className={`px-3 py-1 rounded text-sm ${
        hasVoted ? "bg-green-500 text-white" : "bg-gray-200"
      } ${!userId ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      ⬆️ {voteCount}
    </button>
  );
}
