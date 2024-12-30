import React from "react"
import ProductOption from "../utils/types/option"

interface OptionGroupProps {
    option: ProductOption,
    row: number,
    selection: number,
    handleSelectionChange: (row: number, selection: number) => void
}

export default function OptionGroup ({option, row, selection, handleSelectionChange}: OptionGroupProps) {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-1">{option.name}</h3>
            <div className="flex items-center justify-between gap-x-8 w-full">
                {
                    option.attributes.map((element, index) => {
                        if (index == selection) {
                            return (
                                <div key={index} className="flex flex-col w-full text-sm pt-2 border-t-4 border-emerald-600">
                                    <span className="text-xs">{option.label}</span>
                                    <span className="font-semibold">{element.value}</span>
                                </div>
                            )
                        }

                        return (
                            <div key={index} className="flex flex-col w-full border-t-[1px] text-sm pt-2 cursor-pointer border-dashed" onClick={() => handleSelectionChange(row, index)}>
                                <span className="text-xs">{option.label}</span>
                                <span className="font-semibold">{element.value}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}