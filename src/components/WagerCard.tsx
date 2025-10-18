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
                return <div className="border border-neutral-400 text-neutral-400 px-3 py-1 rounded-md text-sm font-medium">PENDING</div>;
        }
    };

    const getBannerColor = (result: string) => {
        switch (result) {
            case 'WIN':
                return 'bg-green-500/20 border-green-500/30';
            case 'LOSS':
                return 'bg-red-500/20 border-red-500/30';
            case 'PUSH':
                return 'bg-gray-500/20 border-gray-500/30';
            default:
                return 'bg-neutral-400/20 border-neutral-400/30';
        }
    };

    // Format gameDate to user's local timezone
    const formatEventDateTime = (eventDate?: string) => {
        if (!eventDate) return undefined;
        
        const date = new Date(eventDate);
        
        // Format as "MM/DD/YY • H:MM AM/PM" in user's local timezone
        const options: Intl.DateTimeFormatOptions = {
            month: 'numeric',
            day: 'numeric', 
            year: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        
        const formatted = date.toLocaleString('en-US', options);
        return formatted.replace(',', ' •'); // Replace comma with bullet
    };

    // Hard-coded values for missing data
    // const betType = "Spread"; // or extract from pick if available
    // const odds = "-110"; // or extract from pick if available
    const matchup = pick.sport; // or extract from pick if available
    const eventDateTime = formatEventDateTime(pick.eventDate);
    // const stake = "$10.00"; // or extract from pick if available
    // const payout = pick.result === 'WIN' ? "$19.09" : "$0.00"; // or extract from pick if available
    const pickDate = pick.pickDate;
    const pickedBy = pick.picker;
    const betSlipId = pick.id; // or extract from pick if available

    return (
        <div className="w-full max-w-sm rounded-lg bg-white text-neutral-600 shadow-lg overflow-hidden relative">
            {/* Header section with banner background */}
            <div className={`relative ${getBannerColor(pick.result)} py-4 px-4`}>
                {/* Header with result badge and brand */}
                <div className="flex items-center justify-between">
                    {getResultBadge(pick.result)}
                    <div className="flex items-center gap-2">
                        {/* <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-gray-800 font-bold text-xs">P</span>
                        </div> */}
                        {/* <img src="/src/assets/logo_small.png" alt="Par's Parlays Logo" className="h-6" /> */}
                        {/* <span className="font-bold text-sm">PARSPARLAYS</span> */}
                    </div>
                </div>
            </div>

            {/* Main bet details */}
            <div className="px-4 pb-4 pt-2">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">{pick.name}</span>
                    {/* <span className="text-white">{odds}</span> */}
                </div>
                
                {/* <div className="text-sm text-gray-300 mb-1">{betType}</div> */}
                <div className="text-sm text-neutral-400 mb-1">{matchup}</div>
                {eventDateTime && (
                    <div className="text-xs text-neutral-400 mb-4">{eventDateTime}</div>    
                )}

                {/* Financial section */}
                {/* <div className="border-t border-gray-600 pt-3 pb-3">
                    <div className="flex justify-between text-sm">
                        <span>Stake: {stake}</span>
                        <span>Payout: {payout}</span>
                    </div>
                </div> */}

                {/* Notes section */}
                {pick.notes && (
                    <div className={`border-t border-neutral-400 pt-3 ${isShowingNotes ? 'pb-3' : ''}`}>
                        <button
                            aria-expanded={isShowingNotes}
                            onClick={() => setIsShowingNotes((v) => !v)}
                            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-2"
                        >
                            <span>{isShowingNotes ? 'Hide notes' : 'Show notes'}</span>
                            <ChevronIcon isExpanded={isShowingNotes} />
                        </button>

                        {isShowingNotes && (
                            <div className="bg-neutral-100 rounded p-3">
                                <p className="text-sm text-neutral-400">{pick.notes}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Bet placement metadata */}
                <div className="border-t border-gray-600 pt-3">
                    <div className="flex justify-between text-xs text-neutral-400">
                        <span>{pickDate} • {pickedBy}</span>
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                                <path d="M6 8h8v1H6V8zm0 2h8v1H6v-1zm0 2h4v1H6v-1z"/>
                            </svg>
                            <span>Bet slip ID: {betSlipId}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default WagerCard;