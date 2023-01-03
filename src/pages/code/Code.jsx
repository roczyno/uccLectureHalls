import "../../general.scss";

import Navbar from "../../components/navbar/Navbar";

import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import CODE from "../../img/code.jpg";

const Code = () => {
  const [CodeLecture, setCodeLecture] = useState([
    {
      id: 1,
      name: "CODE_1",
      img: CODE,
      capacity: 90,
      schedules: [
        {
          startTime: "20:53",
          endTime: "20:58",
          availability: true,
        },
        {
          startTime: "13:00",
          endTime: "15:00",
          availability: true,
        },
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
        },
      ],
    },
    {
      id: 2,
      name: "CODE_2",
      img: CODE,
      capacity: 120,
      schedules: [
        {
          startTime: "09:00",
          endTime: "11:00",
          availability: true,
        },
        {
          startTime: "13:00",
          endTime: "15:00",
          availability: false,
        },
      ],
    },
    {
      id: 3,
      name: "CODE_3",
      img: CODE,
      capacity: 150,
      schedules: [
        {
          startTime: "09:00",
          endTime: "11:00",
          availability: true,
        },
        {
          startTime: "13:00",
          endTime: "15:00",
          availability: false,
        },
      ],
    },
    {
      id: 4,
      name: "CODE_4",
      img: CODE,
      capacity: 100,
      schedules: [
        {
          startTime: "09:00",
          endTime: "11:00",
          availability: true,
        },
        {
          startTime: "13:00",
          endTime: "15:00",
          availability: false,
        },
      ],
    },
  ]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false);
  const [sortByCapacity, setSortByCapacity] = useState(false);
  const [currentAvailability, setCurrentAvailability] = useState([]);

  useEffect(() => {
    const updateAvailability = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentAvailability = CodeLecture.map((lectureHall) => {
        const currentSchedule = lectureHall.schedules.find(
          (schedule) =>
            schedule.startTime <= `${currentHour}:${currentMinute}` &&
            `${currentHour}:${currentMinute}` < schedule.endTime
        );
        return {
          ...lectureHall,
          availability: currentSchedule ? currentSchedule.availability : false,
          currentStartTime: currentSchedule ? currentSchedule.startTime : null,
          currentEndTime: currentSchedule ? currentSchedule.endTime : null,
        };
      });
      setCurrentAvailability(currentAvailability);
    };

    updateAvailability();

    // Update the availability every minute
    const interval = setInterval(updateAvailability, 60000);

    return () => clearInterval(interval);
  }, [CodeLecture]);

  const handleClick = () => {
    setShowAvailable(!showAvailable);
  };

  const handleSortClick = () => {
    setSortByCapacity(!sortByCapacity);
  };

  let filteredLectureHalls = currentAvailability;
  if (showAvailable) {
    filteredLectureHalls = filteredLectureHalls.filter((lectureHall) => {
      return lectureHall.availability;
    });
  }
  if (sortByCapacity) {
    filteredLectureHalls = filteredLectureHalls.sort((a, b) => {
      return a.capacity - b.capacity;
    });
  }

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="calc">
        <img
          src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="hell0"
        />
        <div className="buttons">
          <button onClick={handleClick}>
            {showAvailable ? "Show all" : "Show available"}
          </button>
          <button onClick={handleSortClick}>
            {sortByCapacity ? "Sort by name" : "Sort by capacity"}
          </button>
        </div>

        <div className="container">
          {filteredLectureHalls.map((lectureHall) => (
            <div className="item" key={lectureHall.id}>
              <img src={lectureHall.img} alt="" />
              <div className="desc">
                <span className="name">{lectureHall.name}</span>
                <span className="capacity">
                  Capacity: {lectureHall.capacity}
                </span>

                <span className="status">
                  {lectureHall.availability ? "Available" : "Not available"}
                  {lectureHall.availability && (
                    <span>
                      {`  from ${lectureHall.currentStartTime} to
                      ${lectureHall.currentEndTime}`}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Code;
