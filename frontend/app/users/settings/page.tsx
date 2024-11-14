import axios from "axios";

export default async function DataTest() {
  const response = await axios.get("http://backend:8000/dummy/api/get-dummy-data");
  const data = await response.data;

  return (
    <div>
      <pre>{data.dummy_data}</pre>
    </div>
  );
}
