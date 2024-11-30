import { WrappedData } from "../actions";
import { SocialWrappedSection } from "./social-wrapped-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
  const carouselsData: WrappedData[] = [
    {
      username: "saada7553",
    },
    {
      username: "arjun7553",
    },
  ];

  return (
    <div className="flex flex-col items-center">
    <Tabs defaultValue="all" className="w-full max-w-full">
      <TabsList className="flex justify-center">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="liked">Liked</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="w-full">
          <SocialWrappedSection carouselsData={carouselsData} />
        </div>
      </TabsContent>
      <TabsContent value="liked">Show liked here.</TabsContent>
      <TabsContent value="following">Show following here.</TabsContent>
    </Tabs>
    </div>
  )
}
