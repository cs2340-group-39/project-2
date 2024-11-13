import { useEffect, useState } from "react";
import { Text, View } from "tamagui";

export default function TabTwoScreen() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/app/dummy/api/get-dummy-data");
        const json = await response.json();
        setData(json.dummy_data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <View flex={1} alignItems="center" justifyContent="center" bg="$background">
      <Text fontSize={20} color="$blue10">
        {data}
      </Text>
    </View>
  );
}
