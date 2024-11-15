"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { createDummyDataAction } from "./actions";

export default function CreatePage() {
  const [name, setName] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      alert("Name is required.");
      return;
    }
    const result = await createDummyDataAction(name);
    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      alert(`Dummy data created with ID: ${result.id}`);
      setName("");
    }
  }

  return (
    <div className="w-screen h-screen">
      <Card className="place-content-center">
        <CardHeader>
          <CardTitle>Create Dummy Data</CardTitle>
          <CardDescription>Enter a name to create new dummy data</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input type="text" name="name" placeholder="Enter name..." required className="w-full" />
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
