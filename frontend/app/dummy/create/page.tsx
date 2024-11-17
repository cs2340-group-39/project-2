import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { createDummyDataAction } from "./actions";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Create Dummy Data</CardTitle>
          <CardDescription>Enter a name to create new dummy data</CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={createDummyDataAction} className="space-y-4">
            <div className="space-y-2">
              <Input type="text" name="name" placeholder="Name" required className="w-full" />
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
