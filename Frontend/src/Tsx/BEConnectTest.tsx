import { useEffect, useState } from "react";

export function TestBackendConnection(  ) {
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch("http://localhost:5092/api/test") 
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      {data ? <p>Backend: {data.message}</p> : <h5> Loading...</h5>}
    </div>
  );
}

export default TestBackendConnection;