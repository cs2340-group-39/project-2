import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { WrappedData } from "../definitions";
import { SocialWrappedSection } from "./social-wrapped-section";

export default function Page() {
  const carouselsData: WrappedData[] = [];

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
        <TabsContent value="liked">
          <div className="w-full">
            <SocialWrappedSection carouselsData={carouselsData} />
          </div>
        </TabsContent>
        <TabsContent value="following">
          <div className="w-full">
            <SocialWrappedSection carouselsData={carouselsData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
