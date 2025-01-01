import React from "react";

interface MarqueeProps {
    labels: string[]
}

export default function Marquee ({labels} : MarqueeProps) {
    return (
        <div className="marquee text-sm">
            <div className="marquee-group">
                {
                    labels.map((label, index) => {
                        if (index == 0) {
                            return (
                                <>
                                    <p key={index}>{label}</p>
                                    <span>-</span>
                                </>
                            )
                        }

                        return (
                            <>  
                                <p aria-hidden="true" key={index}>{label}</p>
                                <span>-</span>
                            </>
                        )
                    })
                }
            </div>
            <div aria-hidden="true" className="marquee-group">
                {
                    labels.map((label, index) => {
                        return (
                            <>
                                <p key={index}>{label}</p>
                                <span>-</span>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}