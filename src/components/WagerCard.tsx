import { useState } from "react";
import type { Pick } from "../domain/pick";

interface WagerCardProps {
    pick: Pick;
}

// Chevron icon component for better maintainability
function ChevronIcon({ isExpanded }: { isExpanded: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-4 w-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function WagerCard({ pick }: WagerCardProps) {
    const [isShowingNotes, setIsShowingNotes] = useState(false);

    const resultClass = (result: string) => {
        switch (result) {
            case 'WIN':
                return 'bg-green-500 text-white';
            case 'LOSS':
                return 'bg-red-500 text-white';
        }
    }

    return (
        <div className="w-full max-w-sm rounded-lg border border-gray-200 shadow-md p-4">
            {/* VStack equivalent - flex flex-col with gap */}
            <div className="flex flex-col gap-2">
                {/* Header row - HStack equivalent */}
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold">{pick.name}</h1> 
                    <span className="text-sm text-neutral-700">{pick.sport}</span>
                </div>
                
                {/* VStack of metadata */}
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-neutral-700">{pick.date}</span>
                    <span className="text-sm text-neutral-700">Picked by {pick.picker}</span>
                    
                    <span className={resultClass(pick.result)}>{pick.result}</span>



                    <span className="text-sm text-neutral-700">{pick.result}</span>
                </div>

                {/* Notes section */}
                {pick.notes && (
                    <div className="flex flex-col gap-2 mt-2">
                        <button
                            aria-expanded={isShowingNotes}
                            onClick={() => setIsShowingNotes((v) => !v)}
                            className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                        >
                            <span>{isShowingNotes ? 'Hide notes' : 'Show notes'}</span>
                            <ChevronIcon isExpanded={isShowingNotes} />
                        </button>

                        {isShowingNotes && (
                            <div className="px-3">
                                <p className="text-sm text-neutral-700">{pick.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WagerCard;