"use client";

import { Separator } from "@/components/ui/separator";
import { WrappedSectionProps } from "../definitions";
import { SharedCarousel } from "../shared-carousel";

export function SocialWrappedSection({ carouselsData }: WrappedSectionProps) {
    return (
        <div className="space-y-8 px-4">
            {carouselsData.map((wrappedData, carouselIndex) => (
                <div key={carouselIndex} className="relative px-10">
                    <h2 className="p-4 text-lg font-semibold mb-2">
                        Wrapped #{carouselsData[carouselIndex].id} by @
                        {carouselsData[carouselIndex].username}
                    </h2>
                    <div className="relative flex items-center justify-center">
                        <SharedCarousel wrappedData={wrappedData} />
                    </div>
                    <Separator className="my-8" />
                </div>
            ))}
        </div>
    );
}
