"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { WrappedSectionProps } from "../actions";

export function DashboardWrappedSection({
  carouselsData,
}: WrappedSectionProps) {
  return (
    <div className="space-y-8 px-4">
      <div className="mt-4 flex justify-center">
        <Button
          variant="default"
          size="default"
          onClick={() => console.log("Create new wrap")}
        >
          Create New Wrap
        </Button>
      </div>
      <Separator className="my-8" />
      {carouselsData.map((_, carouselIndex) => (
        <div key={carouselIndex} className="relative px-10">
          <div className="relative flex items-center justify-center">
            <Carousel className="w-full max-w-sm">
              <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, itemIndex) => (
                  <CarouselItem
                    key={itemIndex}
                    className="pl-1 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-2xl font-semibold">
                            {`Carousel ${carouselIndex + 1} - Item ${
                              itemIndex + 1
                            }`}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <Button
              variant="default"
              size="default"
              onClick={() =>
                console.log(`Post this wrap ${carouselIndex + 1}`)
              }
            >
              Post this carousel
            </Button>
            <Button
              variant="destructive"
              size="default"
              onClick={() =>
                console.log(`Delete this carousel ${carouselIndex + 1}`)
              }
            >
              Delete
            </Button>
          </div>
          <Separator className="my-8" />
        </div>
      ))}
    </div>
  );
}
