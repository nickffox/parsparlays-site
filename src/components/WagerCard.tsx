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

    const getResultBadge = (result: string) => {
        switch (result) {
            case 'WIN':
                return <div className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium">WON</div>;
            case 'LOSS':
                return <div className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">LOST</div>;
            case 'PUSH':
                return <div className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm font-medium">PUSH</div>;
            default:
                return <div className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-medium">PENDING</div>;
        }
    };

    // Hard-coded values for missing data
    const betType = "Spread"; // or extract from pick if available
    const odds = "-110"; // or extract from pick if available
    const matchup = `${pick.sport} Match`; // or extract from pick if available
    const eventDateTime = "10/4/25 • 7:35 PM"; // or extract from pick if available
    const stake = "$10.00"; // or extract from pick if available
    const payout = pick.result === 'WIN' ? "$19.09" : "$0.00"; // or extract from pick if available
    const betPlacement = pick.date;
    const betSlipId = "2099NPNR8J"; // or extract from pick if available

    return (
        <div className="w-full max-w-sm rounded-lg bg-gray-800 text-white shadow-lg overflow-hidden relative">
            {/* Confetti pattern background */}
            {/* <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-yellow-400/20 to-transparent opacity-30"></div> */}
            
            {/* Header with result badge and brand */}
            <div className="relative z-10 flex items-center justify-between p-4 pb-2">
                {getResultBadge(pick.result)}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-gray-800 font-bold text-xs">P</span>
                    </div>
                    <span className="font-bold text-sm">PARSPARLAYS</span>
                </div>
            </div>

            {/* Main bet details */}
            <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">{pick.name}</span>
                    {/* <span className="text-white">{odds}</span> */}
                </div>
                
                {/* <div className="text-sm text-gray-300 mb-1">{betType}</div> */}
                <div className="text-sm text-gray-300 mb-1">{matchup}</div>
                {/* <div className="text-sm text-gray-300 mb-4">{eventDateTime}</div> */}

                {/* Financial section */}
                {/* <div className="border-t border-gray-600 pt-3 pb-3">
                    <div className="flex justify-between text-sm">
                        <span>Stake: {stake}</span>
                        <span>Payout: {payout}</span>
                    </div>
                </div> */}

                {/* Bet placement metadata */}
                <div className="border-t border-gray-600 pt-3 pb-3">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>{betPlacement}</span>
                        {/* <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                                <path d="M6 8h8v1H6V8zm0 2h8v1H6v-1zm0 2h4v1H6v-1z"/>
                            </svg>
                            <span>Bet slip ID: {betSlipId}</span>
                        </div> */}
                    </div>
                </div>

                {/* Notes section */}
                {pick.notes && (
                    <div className="border-t border-gray-600 pt-3">
                        <button
                            aria-expanded={isShowingNotes}
                            onClick={() => setIsShowingNotes((v) => !v)}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-2"
                        >
                            <span>{isShowingNotes ? 'Hide notes' : 'Show notes'}</span>
                            <ChevronIcon isExpanded={isShowingNotes} />
                        </button>

                        {isShowingNotes && (
                            <div className="bg-gray-700 rounded p-3">
                                <p className="text-sm text-gray-300">{pick.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WagerCard;