import { useState, useEffect } from "react";

export function useLectureHallAvailability() {
  const [currentAvailability, setCurrentAvailability] = useState([]);

  useEffect(() => {
    const updateAvailability = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentAvailability = lectureHalls.map((lectureHall) => {
        const currentSchedule = lectureHall.schedules.find(
          (schedule) =>
            schedule.startTime <= `${currentHour}:${currentMinute}` &&
            `${currentHour}:${currentMinute}` < schedule.endTime
        );
        return {
          ...lectureHall,
          availability: currentSchedule ? currentSchedule.availability : false,
        };
      });
      setCurrentAvailability(currentAvailability);
    };

    updateAvailability();

    // Update the availability every minute
    const interval = setInterval(updateAvailability, 60000);

    return () => clearInterval(interval);
  }, [lectureHalls]);

  return currentAvailability;
}
