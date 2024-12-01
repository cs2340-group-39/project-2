"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WrappedData } from "./actions";

export function DashboardCarousel({
  wrappedData,
}: {
  wrappedData: WrappedData;
}) {
  console.log(wrappedData);

  const carouselItems = [
    {
      title: "Top Artists",
      items: wrappedData.topArtists,
    },
    {
      title: "Top Albums",
      items: wrappedData.topAlbums,
    },
    {
      title: "Top Genres",
      items: wrappedData.topGenres,
    },
    {
      title: "Top Genres",
      items: wrappedData.topGenres,
    },
  ];
  console.log(carouselItems);

  return (
    <Carousel
      className="w-full max-w-full p-10"
      opts={{
        align: "start",
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="-ml-1 flex">
        {carouselItems.map((section, sectionIndex) => (
          <CarouselItem
            key={sectionIndex}
            className="pl-1 md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <Card className="h-full">
                <CardContent className="flex flex-col aspect-square items-center justify-center p-2 sm:p-6 space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-center">
                    {section.title}
                  </h3>
                  <div className="text-center">
                    {section.items.map((item, itemIndex) => (
                      <p
                        key={itemIndex}
                        className="text-base sm:text-lg"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
