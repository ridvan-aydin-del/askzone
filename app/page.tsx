import UpvoteButton from "@/components/UpVoteButton";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function Home() {
  const { data: questions, error } = await supabase
    .from("questions")
    .select("id, title, content, tags, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Hata: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="bg-gray-200 shadow rounded p-4 mb-4">
          <p className="text-xl font-semibold mb-2">{question.title}</p>

          <p className=" text-gray-700">{question.content.slice(0, 100)}...</p>

          <p>{question.tags.join(", ")}</p>

          <p className="text-sm text-gray-500 ">
            {new Date(question.created_at).toLocaleDateString("tr-TR")}
          </p>
          <div className="flex justify-between items-center mt-2">
            <Link
              href={`/questions/${question.id}`}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm mt-2 inline-block"
            >
              Detay
            </Link>
            <UpvoteButton questionId={question.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
