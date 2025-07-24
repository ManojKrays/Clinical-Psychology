import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  getDay,
  setMonth,
  setYear,
  startOfDay,
} from "date-fns";

const months = Array.from({ length: 12 }, (_, i) =>
  format(new Date(2025, i, 1), "MMMM")
);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 12 }, (_, i) => currentYear + i);

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  const today = startOfDay(new Date());

  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const isBeforeToday = (date) => {
    return date < today;
  };

  const handlePrevMonth = () => {
    setSelectedDate(null);

    const prevMonth = subMonths(currentMonth, 1);
    if (prevMonth >= startOfMonth(today)) {
      setCurrentMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    setSelectedDate(null);
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleMonthSelect = (monthIndex) => {
    const newDate = setMonth(currentMonth, monthIndex);
    if (
      newDate >= startOfMonth(today) ||
      newDate.getFullYear() > today.getFullYear()
    ) {
      setCurrentMonth(newDate);
    }
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year) => {
    const newDate = setYear(currentMonth, year);
    if (year >= today.getFullYear()) {
      setCurrentMonth(newDate);
    }
    setShowYearPicker(false);
  };

  return (
    <div className="font-avenir relative w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Date</label>
          <div className="bg-whitish flex w-fit cursor-pointer items-center gap-3 rounded border border-gray-300 px-3 py-1 text-sm">
            <span onClick={() => setShowMonthPicker(!showMonthPicker)}>
              {format(currentMonth, "MMMM")}
            </span>
            <span onClick={() => setShowYearPicker(!showYearPicker)}>
              {format(currentMonth, "yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`bg-whitish rounded border border-gray-300 p-2 ${
              currentMonth <= startOfMonth(today)
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            onClick={handlePrevMonth}
            disabled={currentMonth <= startOfMonth(today)}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="bg-whitish border-whitish cursor-pointer rounded border p-2 shadow-xs"
            onClick={handleNextMonth}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {daysInMonth.map((day, idx) => {
          const isDisabled = isBeforeToday(day);
          const isSelected =
            selectedDate &&
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <div
              key={idx}
              onClick={() => !isDisabled && setSelectedDate(day)}
              className={`min-w-[70px] rounded border p-3 text-center transition ${
                isSelected ? "border-yellow-500 shadow-md" : "border-gray-300"
              } ${
                isDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:border-yellow-500"
              }`}
            >
              <p className="text-sm font-medium">{format(day, "EEE")}</p>
              <p className="text-xl font-semibold">{format(day, "d")}</p>
            </div>
          );
        })}
      </div>

      {showMonthPicker && (
        <div className="absolute top-[80px] left-6 z-10 grid grid-cols-3 gap-2 rounded border bg-white p-4 shadow-md">
          {months.map((month, i) => {
            const today = new Date();
            const currentYear = currentMonth.getFullYear();
            const currentMonthIndex = currentMonth.getMonth();
            const isPastMonth =
              currentYear === today.getFullYear() && i < today.getMonth();

            const isSelected = i === currentMonthIndex;

            return (
              <button
                key={i}
                onClick={() => !isPastMonth && handleMonthSelect(i)}
                disabled={isPastMonth}
                className={`cursor-pointer rounded px-2 py-1 text-sm ${
                  isPastMonth
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-yellow-100"
                } ${isSelected ? "bg-yellow-300 font-semibold" : ""} `}
              >
                {month}
              </button>
            );
          })}
        </div>
      )}

      {showYearPicker && (
        <div className="absolute top-[80px] left-6 z-10 grid max-h-[200px] grid-cols-4 gap-2 overflow-y-auto rounded border bg-white p-4 shadow-md">
          {years.map((year) => {
            const isPastYear = year < currentYear;
            const isSelected = year === currentMonth.getFullYear();

            return (
              <button
                key={year}
                onClick={() => !isPastYear && handleYearSelect(year)}
                disabled={isPastYear}
                className={`cursor-pointer rounded px-2 py-1 text-sm ${
                  isPastYear
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-yellow-100"
                } ${isSelected ? "bg-yellow-300 font-semibold" : ""} `}
              >
                {year}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
