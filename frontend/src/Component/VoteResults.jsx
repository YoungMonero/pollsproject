import { useEffect, useState } from "react";
import axios from "axios";

export default function VoteResults({ sessionId }) {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPolls() {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/host/polls/${sessionId}`,
        { withCredentials: true }
      );
      setPolls(res.data.polls || []);
    } catch (err) {
      console.error("Error fetching polls:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (sessionId) fetchPolls();
  }, [sessionId]);

  if (loading) return <p>Loading polls...</p>;

  if (polls.length === 0)
    return <p className="text-gray-500">No polls yet for this session.</p>;

  return (
    <div className="space-y-6">
      {polls.map((poll) => (
        <div
          key={poll.id}
          className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-3">{poll.question}</h3>
          <ul className="space-y-2">
            {poll.options.map((opt) => (
              <li
                key={opt.id}
                className="flex justify-between p-2 border rounded-lg"
              >
                <span>{opt.label}</span>
                <span className="font-semibold text-blue-600">
                  {opt.vote_count || 0} votes
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
