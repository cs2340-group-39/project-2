import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authenticateWithSpotifyAction } from "./actions";

export function LinkWithSpotifyForm() {
  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Link With Spotify</CardTitle>
        <CardDescription>
          In order to proceed, you must link your Spotify account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={authenticateWithSpotifyAction}
          className="w-full"
        >
          Link
        </Button>
      </CardContent>
    </Card>
  );
}
