export const dynamic = "force-dynamic";

import AnswersSection from "@/components/AnswersSection";
import UpvoteButton from "@/components/UpVoteButton";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: question, error } = await supabase
    .from("questions")
    .select("id, title, content, tags, created_at")
    .eq("id", id)
    .single();

  if (!question || error) {
    notFound();
  }

  return (
    <div className="">
      <h1 className="text-3xl mb-4 underline">{question.title}</h1>
      <p className="text-lg">{question.content}</p>
      <div className="flex justify-between items-center mt-10">
        <p className="bg-gray-300 rounded-full p-4">
          {question.tags.join(", ")}
        </p>
        <p>{new Date(question.created_at).toLocaleDateString("tr-TR")}</p>
        <UpvoteButton questionId={question.id} />
      </div>
      <AnswersSection questionId={question.id} />
    </div>
  );
}
