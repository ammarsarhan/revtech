import React from "react";
import { ReviewType } from "../utils/types/review";

interface ReviewProps {
    review: ReviewType;
}

export default function Review ({review}: ReviewProps) {
    return (
        <div className="w-full flex flex-col gap-y-2 text-sm my-6">
            <div>
                <span>{review.rating}/5 - {review.userName}</span>
            </div>
            <p>{review.description}</p>
        </div>
    )
}