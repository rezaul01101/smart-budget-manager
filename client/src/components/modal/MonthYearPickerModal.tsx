import { useEffect, useRef, useCallback } from "react";

interface MonthYearPickerModalProps {
  isOpen: boolean;
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onClose: () => void;
  onApply: () => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ITEM_HEIGHT = 44;

const MonthYearPickerModal = ({
  isOpen,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onClose,
  onApply,
}: MonthYearPickerModalProps) => {
  const monthScrollRef = useRef<HTMLDivElement>(null);
  const yearScrollRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - 25 + i);

  const scrollToItem = useCallback((ref: React.RefObject<HTMLDivElement | null>, index: number) => {
    if (ref.current) {
      const targetScroll = index * ITEM_HEIGHT;
      ref.current.scrollTop = targetScroll;
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      scrollToItem(monthScrollRef, selectedMonth);
      scrollToItem(yearScrollRef, years.indexOf(selectedYear));
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen, selectedMonth, selectedYear, years, scrollToItem]);

  if (!isOpen) return null;

  const handleMonthScroll = () => {
    if (!monthScrollRef.current) return;
    const scrollTop = monthScrollRef.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(11, index));
    onMonthChange(clampedIndex);
  };

  const handleYearScroll = () => {
    if (!yearScrollRef.current) return;
    const scrollTop = yearScrollRef.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(years.length - 1, index));
    onYearChange(years[clampedIndex]);
  };

  const ScrollPicker = ({
    items,
    selectedIndex,
    scrollRef,
    onScroll,
    label,
  }: {
    items: string[];
    selectedIndex: number;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    onScroll: () => void;
    label: string;
  }) => (
    <div className="flex-1 flex flex-col min-w-0">
      <p className="text-center text-sm text-gray-500 mb-2 font-medium">{label}</p>
      <div className="relative h-64 rounded-xl bg-gray-800/30">
        {/* Fade gradients */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0f1419] via-[#0f1419]/80 to-transparent z-20 pointer-events-none rounded-t-xl" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f1419] via-[#0f1419]/80 to-transparent z-20 pointer-events-none rounded-b-xl" />

        {/* Selection highlight */}
        <div className="absolute top-1/2 left-1 right-1 -translate-y-1/2 h-[44px] bg-white/5 border border-white/10 rounded-lg z-0" />

        {/* Scrollable list */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="h-full overflow-y-auto overflow-x-hidden z-10 relative"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            [data-scroll-container]::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Top padding for centering */}
          <div className="h-[110px] flex-shrink-0" />

          {items.map((item, index) => (
            <div
              key={item}
              data-scroll-container
              className="h-[44px] flex items-center justify-center text-base cursor-pointer select-none"
              style={{
                color: selectedIndex === index ? "#ffffff" : "#6b7280",
                fontWeight: selectedIndex === index ? 600 : 400,
                fontSize: selectedIndex === index ? "17px" : "16px",
              }}
            >
              {item}
            </div>
          ))}

          {/* Bottom padding for centering */}
          <div className="h-[110px] flex-shrink-0" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center backdrop-blur-sm">
      <div className="bg-[#0f1419] w-full md:max-w-sm md:rounded-2xl rounded-t-3xl">
        {/* Header */}
        <div className="border-b border-gray-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-orange-500 font-semibold hover:bg-orange-500/10 transition-colors"
            >
              Cancel
            </button>
            <h2 className="text-lg font-semibold text-white">
              {months[selectedMonth]} {selectedYear}
            </h2>
            <button
              onClick={onApply}
              className="px-4 py-2 rounded-lg text-orange-500 font-semibold hover:bg-orange-500/10 transition-colors"
            >
              Done
            </button>
          </div>
        </div>

        {/* Scroll Pickers */}
        <div className="p-6 pb-8">
          <div className="flex gap-4">
            <ScrollPicker
              items={months}
              selectedIndex={selectedMonth}
              scrollRef={monthScrollRef}
              onScroll={handleMonthScroll}
              label="Month"
            />
            <ScrollPicker
              items={years.map(String)}
              selectedIndex={years.indexOf(selectedYear)}
              scrollRef={yearScrollRef}
              onScroll={handleYearScroll}
              label="Year"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthYearPickerModal;
