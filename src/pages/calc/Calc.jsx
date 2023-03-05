import "../../general.scss";

import Navbar from "../../components/navbar/Navbar";

import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

import CALC from "../../img/calc.jpg";

const Calc = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLectureHall, setSelectedLectureHall] = useState(null);
  const [currentAvailability, setCurrentAvailability] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [unBookingSuccess, setUnbookingSuccess] = useState(false);
  const [CalcLecture, setCalcLecture] = useState([
    {
      id: 1,
      name: "CALC_1",
      img: CALC,
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
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
        },
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
        },
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
        },
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
        },
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
        },
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
        },
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
        },
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
        },
        {
          startTime: "19:51",
          endTime: "19:55",
          availability: false,
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
      name: "CALC_2",
      img: CALC,
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
      name: "CALC_3",
      img: CALC,
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
      name: "CALC_4",
      img: CALC,
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

  //connect to the backend

  // useEffect(() => {
  //   const fetchLectureHalls = async () => {
  //     try {
  //       const response = await axios.get("/api/lecturehalls");
  //       setCodeLecture(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchLectureHalls();
  // }, []);

  useEffect(() => {
    const updateAvailability = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentAvailability = CalcLecture.map((lectureHall) => {
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
  }, [CalcLecture]);

  const handleBooking = async () => {
    if (!selectedLectureHall) {
      return;
    }

    const selectedSchedule = selectedLectureHall.schedules.find(
      (schedule) =>
        schedule.startTime === startTime && schedule.endTime === endTime
    );

    if (!selectedSchedule) {
      return;
    }

    if (selectedSchedule.availability) {
      return;
    }

    try {
      const response = await axios.post("/api/bookings", {
        lectureHallName: selectedLectureHall.name,
        startTime,
        endTime,
      });

      if (response.status === 201) {
        const updatedLectureHalls = CalcLecture.map((lectureHall) => {
          if (lectureHall.name !== selectedLectureHall.name) {
            return lectureHall;
          }

          return {
            ...lectureHall,
            schedules: lectureHall.schedules.map((schedule) => {
              if (
                schedule.startTime !== startTime ||
                schedule.endTime !== endTime
              ) {
                return schedule;
              }

              return {
                ...schedule,
                availability: false,
              };
            }),
          };
        });

        setSelectedLectureHall(updatedLectureHalls);
        setBookingSuccess(true);
        setTimeout(() => {
          setBookingSuccess(false);
        }, 3000);
      }
    } catch (error) {
      alert(`the error is ${error}`);
    }
  };

  const handleUnbooking = async () => {
    if (!selectedLectureHall) {
      return;
    }

    const selectedSchedule = selectedLectureHall.schedules.find(
      (schedule) =>
        schedule.startTime === startTime && schedule.endTime === endTime
    );

    if (!selectedSchedule) {
      return;
    }

    if (selectedSchedule.availability) {
      return;
    }

    try {
      const response = await axios.delete("/api/bookings", {
        data: {
          lectureHallName: selectedLectureHall.name,
          startTime,
          endTime,
        },
      });

      if (response.status === 200) {
        const updatedLectureHalls = CalcLecture.map((lectureHall) => {
          if (lectureHall.name !== selectedLectureHall.name) {
            return lectureHall;
          }

          return {
            ...lectureHall,
            schedules: lectureHall.schedules.map((schedule) => {
              if (
                schedule.startTime !== startTime ||
                schedule.endTime !== endTime
              ) {
                return schedule;
              }

              return {
                ...schedule,
                availability: true,
              };
            }),
          };
        });

        setSelectedLectureHall(updatedLectureHalls);
        setUnbookingSuccess(true);
        setTimeout(() => {
          setUnbookingSuccess(false);
        }, 3000);
      }
    } catch (error) {
      alert(`the error is ${error}`);
    }
  };

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="calc">
        <img
          src="https://images.unsplash.com/photo-1627560985113-ab67e8031f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="hell0"
        />

        <div className="container">
          {selectedLectureHall ? (
            <>
              <div className="book">
                {bookingSuccess && <div>Lecture hall booked successfully!</div>}
                <h3>{selectedLectureHall.name}</h3>
                <p>Capacity: {selectedLectureHall.capacity}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLectureHall.schedules.map((schedule) => (
                      <tr key={`${schedule.startTime}-${schedule.endTime}`}>
                        <td>{schedule.startTime}</td>
                        <td>{schedule.endTime}</td>
                        <td>
                          {schedule.availability
                            ? "Available"
                            : "Not Available"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="time">
                  <label htmlFor="start-time">Start Time:</label>
                  <select
                    id="start-time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                  >
                    <option value="">Select a start time</option>
                    {selectedLectureHall.schedules
                      .filter((schedule) => schedule.availability === false)
                      .map((schedule) => (
                        <option
                          key={schedule.startTime}
                          value={schedule.startTime}
                        >
                          {schedule.startTime}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="below">
                  <div className="time">
                    <label htmlFor="end-time">End Time:</label>
                    <select
                      id="end-time"
                      value={endTime}
                      onChange={(event) => setEndTime(event.target.value)}
                    >
                      <option value="">Select an end time</option>
                      {selectedLectureHall.schedules
                        .filter(
                          (schedule) =>
                            schedule.availability === false &&
                            schedule.startTime >= startTime
                        )
                        .map((schedule) => (
                          <option
                            key={schedule.endTime}
                            value={schedule.endTime}
                          >
                            {schedule.endTime}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="button">
                    <button onClick={handleBooking}>Book</button>
                    <button onClick={handleUnbooking}>UnBook</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {currentAvailability.map((lectureHall) => (
                <div
                  className="item"
                  key={lectureHall.id}
                  onClick={() => setSelectedLectureHall(lectureHall)}
                >
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
            </>
          )}
        </div>
      </div>
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Calc;
