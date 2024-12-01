import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WrappedData } from "./definitions";

interface CarouselItem {
  title: string;
  items: string[];
}

export function DashboardCarousel({
  wrappedData,
}: {
  wrappedData: WrappedData;
}) {
  let carouselItems: CarouselItem[] = [
    {
      title: "Top Artists",
      items: [],
    },
  ];

  for (let i = 0; i < wrappedData.artists.length; i++) {
    let artist = wrappedData.artists[i];

    const newArtistSlide: CarouselItem = {
      title: `Artist #${i + 1}`,
      items: [artist.name, "", artist.photo_url],
    };

    carouselItems.push(newArtistSlide);
  }

  const trackCoverSlide: CarouselItem = {
    title: "Top Tracks",
    items: [],
  };
  carouselItems.push(trackCoverSlide);

  for (let i = 0; i < wrappedData.tracks.length; i++) {
    let track = wrappedData.tracks[i];

    const newArtistSlide: CarouselItem = {
      title: `Track #${i + 1}`,
      items: [
        track.track_name,
        track.artist_name,
        track.track_cover_url,
      ],
    };

    carouselItems.push(newArtistSlide);
  }

  return (
    <Carousel
      className="w-full max-w-xs"
      opts={{
        align: "start",
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="-ml-1 flex">
        {carouselItems.map((section, sectionIndex) => (
          <CarouselItem key={`section-${sectionIndex}`} className="">
            <div className="p-1">
              <Card className="w-full h-full">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-center">
                      {section.title}
                    </h3>
                    <div className="text-center">
                      {section.items.map((item, itemIndex) => (
                        <div key={`item-${sectionIndex}-${itemIndex}`}>
                          {itemIndex === 2 ? (
                            <img
                              className="p-4"
                              src={item}
                              alt={`${section.title} image`}
                            />
                          ) : (
                            <p className="text-pretty sm:text-lg">
                              {item}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
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
