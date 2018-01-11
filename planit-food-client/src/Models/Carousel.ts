import { ComponentClass } from "react";

export type CardCarouselType<P> = ComponentClass<P & {
    centerMode?: boolean,
    centerSlidePercentage?: number
}>;