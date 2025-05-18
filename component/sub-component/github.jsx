"use client";

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "Athela19";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

function getColor(count) {
  if (count === 0) return "#ebedf0";
  if (count <= 1) return "#c6e48b";
  if (count <= 3) return "#7bc96f";
  if (count <= 5) return "#239a3b";
  return "#196127";
}

const monthNames = ["", "Feb", "", "Apr", "", "Jun", "", "Aug", "", "Oct", "", "Dec"];
const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CommitHeatmap() {
  const [commitData, setCommitData] = useState([]);
  const [dailyData, setDailyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [availableMonths, setAvailableMonths] = useState([]);
  
  // Pagination & responsive state
  const [page, setPage] = useState(0);
  const itemsPerPage = 7;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchCommitData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              {
                user(login: "${GITHUB_USERNAME}") {
                  contributionsCollection {
                    contributionCalendar {
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                        }
                      }
                    }
                  }
                }
              }
            `,
          }),
        });

        const json = await response.json();
        if (!response.ok || json.errors) {
          console.log(json);
          throw new Error("Failed to fetch commit data");
        }

        const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;
        setCommitData(weeks);

        // Process data for monthly view
        const allDays = weeks.flatMap((week) => week.contributionDays);
        const byMonth = {};
        allDays.forEach((day) => {
          const date = new Date(day.date);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          if (!byMonth[key]) byMonth[key] = [];
          byMonth[key].push({ ...day, dateObj: date });
        });

        const months = Object.keys(byMonth).sort().reverse();
        setAvailableMonths(months);
        setSelectedMonth(months[0]);
        setDailyData(byMonth);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCommitData();
  }, []);

  // Monthly view functions
  const selectedIndex = availableMonths.indexOf(selectedMonth);
  const goToPrevMonth = () => {
    if (selectedIndex < availableMonths.length - 1) {
      setSelectedMonth(availableMonths[selectedIndex + 1]);
    }
  };
  const goToNextMonth = () => {
    if (selectedIndex > 0) {
      setSelectedMonth(availableMonths[selectedIndex - 1]);
    }
  };

  // Weekly view functions
  const totalPages = Math.ceil(commitData.length / itemsPerPage);
  const weeksToShow = commitData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  function getMonthLabels(weeksSlice) {
    const labels = [];
    let lastMonth = null;

    weeksSlice.forEach((week, index) => {
      if (week.contributionDays.length > 0) {
        const date = new Date(week.contributionDays[0].date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          labels.push({ index, monthName: monthNames[month] });
          lastMonth = month;
        }
      }
    });

    return labels;
  }

  const monthLabels = getMonthLabels(weeksToShow);

  if (loading) return <div className="p-2 text-center text-sm">Loading commit data...</div>;
  if (error) return <div className="p-2 text-red-500 text-sm">Error: {error}</div>;
  if (!commitData.length) return <div className="p-2 text-sm">No commit data available</div>;

  return (
    <div className="md:mt-4 max-w-full md:p-4 text-sm font-sans">
      {isMobile ? (
        // Mobile view - Monthly calendar
        <>
          <div className="flex justify-between items-center mb-2 flex-col">
            <h3 className="font-semibold">Commit Activity</h3>
           
            <div className="flex gap-2">
              <button
                onClick={goToPrevMonth}
                disabled={selectedIndex === availableMonths.length - 1}
                className="px-2 py-1 border rounded text-xs disabled:opacity-50"
              >
                 &#8249;
              </button>
               <h3 className="font-semibold">{selectedMonth}</h3>
              <button
                onClick={goToNextMonth}
                disabled={selectedIndex === 0}
                className="px-2 py-1 border rounded text-xs disabled:opacity-50"
              >
                 &#8250;
              </button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-[4px] text-center text-[10px]">
            {dayLabels.map((d) => (
              <div key={d} className="text-gray-600 font-medium">{d}</div>
            ))}
            {dailyData[selectedMonth] && (
              <>
                {Array.from({ length: dailyData[selectedMonth][0]?.dateObj.getDay() || 0 }).map((_, i) => (
                  <div key={"empty" + i}></div>
                ))}
                {dailyData[selectedMonth].map((day) => (
                  <div
                    key={day.date}
                    title={`${day.contributionCount} commits on ${day.date}`}
                    className="w-6 h-6 rounded-sm mx-auto"
                    style={{
                      backgroundColor: getColor(day.contributionCount),
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </>
      ) : (
        // Desktop view - Weekly heatmap
        <>
          <h3 className="mb-1 font-semibold text-center">Commit Activity</h3>
          <div
            className={`grid items-center gap-[2px] select-none mx-auto`}
            style={{
              gridTemplateColumns: `24px repeat(${commitData.length}, 12px)`,
            }}
          >
            {/* Month Labels */}
            {getMonthLabels(commitData).map(({ index, monthName }) => (
              <div
                key={index}
                style={{ gridColumnStart: index + 2 }}
                className="text-center font-semibold leading-none text-xs"
              >
                {monthName}
              </div>
            ))}

            {/* Day Labels */}
            {dayLabels.map((day, i) => (
              <div
                key={day}
                style={{ gridRowStart: i + 2 }}
                className="text-gray-600 leading-none h-3 flex items-center justify-center text-[9px]"
              >
                {day.slice(0, 2)}
              </div>
            ))}

            {/* Commit Squares */}
            {commitData.map((week, weekIdx) =>
              week.contributionDays.map((item, dayIdx) => {
                const col = weekIdx + 2;
                const row = dayIdx + 2;
                return (
                  <div
                    key={item.date}
                    title={`${item.contributionCount} commit${item.contributionCount !== 1 ? "s" : ""} on ${item.date}`}
                    className="w-2.5 h-2.5 rounded-xs cursor-default transition-colors duration-200"
                    style={{
                      gridColumnStart: col,
                      gridRowStart: row,
                      backgroundColor: getColor(item.contributionCount),
                    }}
                  />
                );
              })
            )}
          </div>
        </>
      )}

      {/* Legend */}
      <div className="flex items-center mt-4 gap-2 select-none text-xs text-gray-700 justify-center">
        <span className="font-semibold">Less</span>
        {[0, 1, 3, 5, 7].map((val) => (
          <div
            key={val}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getColor(val) }}
          />
        ))}
        <span className="font-semibold">More</span>
      </div>
    </div>
  );
}