"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const carouselsData = Array.from({ length: 3 });

  return (
    <div className="space-y-8 px-4">

      {carouselsData.map((_, carouselIndex) => (
        <div key={carouselIndex} className="relative px-10">

          <h2 className="text-lg font-semibold mb-2">
            Posted by User @saada7553
          </h2>

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
                console.log(`Like Wrap ${carouselIndex + 1}`)
              }
            >
              Like Wrap
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={() =>
                console.log(`Follow User ${carouselIndex + 1}`)
              }
            >
              Follow User
            </Button>
          </div>
          <Separator className="my-8" />
        </div>
      ))}
    </div>
  );
}
