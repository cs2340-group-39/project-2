"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button" 

export default function Page() {
  const carouselsData = Array.from({ length: 3 });

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="space-y-8 px-4"> 
          {carouselsData.map((_, carouselIndex) => (
            <div key={carouselIndex} className="relative">
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

              
              <div className="mt-4 flex justify-center">
                <Button
                  variant="default"
                  size="default"
                  onClick={() =>
                    console.log(`Post this wrap ${carouselIndex + 1}`)
                  }
                >
                  Post this carousel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
