import './App.css';
import data from './routine.json';
import { useState } from 'react';

function App() {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");


  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedTimeSlot("");
  };


  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };


  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];


  const timeSlots = [
    "08:00 AM - 09:15 AM",
    "09:25 AM - 10:40 AM",
    "10:50 AM - 12:05 PM",
    "12:15 PM - 01:30 PM",
    "01:40 PM - 02:55 PM",
    "03:05 PM - 04:20 PM",
    "04:30 PM - 05:45 PM",
    "05:55 PM - 07:00 PM",
  ];

  const timeToMinutes = (time) => {
    if (time) {
      const [hour, minute] = time.split(":");
      const [timePart, ampm] = minute.split(" ");
      let hours = parseInt(hour, 10);

      if (ampm === "PM" && hours !== 12) {
        hours += 12;
      } else if (ampm === "AM" && hours === 12) {
        hours = 0;
      }

      return hours * 60 + parseInt(timePart, 10);
    }

    return 0;
  };

  const checkTimeSlot = (timeSlot, classItem) => {
    if (classItem.duration === 1) {
      return classItem.time === selectedTimeSlot;
    } else if (classItem.duration > 1) {
      const startTimeSlot = classItem.time.split(" - ")[0];
      const endTimeSlot = classItem.time.split(" - ")[1];
      const selectedStartTime = selectedTimeSlot.split(" - ")[0];
      const selectedEndTime = selectedTimeSlot.split(" - ")[1];

      const startMinutes = timeToMinutes(startTimeSlot);
      const endMinutes = timeToMinutes(endTimeSlot);
      const selectedStartMinutes = timeToMinutes(selectedStartTime);
      const selectedEndMinutes = timeToMinutes(selectedEndTime);

      return (
        startMinutes <= selectedStartMinutes &&
        endMinutes >= selectedEndMinutes
      );
    } else {
      return false;
    }
  };


  const filteredUsers = data.users.filter((user) =>
    user.schedule.some(
      (schedule) =>
        schedule.day === selectedDay &&
        schedule.classes.some((classItem) => {
          if (classItem.duration === 1) {
            return classItem.time === selectedTimeSlot;
          } else if (classItem.duration > 1) {
            return checkTimeSlot(selectedTimeSlot, classItem);
          } else {
            return false;
          }
        })
    )
  );

  const filteredUsers2 = data.users.filter((user) =>
    user.schedule.some(
      (schedule) =>
        schedule.day === selectedDay
    )
  );


  // console.log(filteredUsers2);
  return (
    <div>
      <div className="container">
        <h1>Users' Routines</h1>
      </div>

      <div className="container">
        <div>
          <h2><b>Select Day Then Time</b></h2>
          <h2>Select a day:</h2>
          <ul>
            {daysOfWeek.map((day) => (
              <li
                key={day}
                className={selectedDay === day ? "selected" : ""}
                onClick={() => handleDaySelect(day)}
              >
                {day}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <div>
          <h2>Select a time slot:</h2>
          <ul>
            {timeSlots.map((timeSlot) => (
              <li
                key={timeSlot}
                className={selectedTimeSlot === timeSlot ? "selected" : ""}
                onClick={() => handleTimeSlotSelect(timeSlot)}
              >
                {timeSlot}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="container">
          {selectedDay && selectedTimeSlot && (
            <div>
              <h2>
                {selectedDay} - {selectedTimeSlot}
              </h2>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user.name}>
                    <h3>{user.name}</h3>
                    <ul>
                      {user.schedule
                        .filter((schedule) => schedule.day === selectedDay)
                        .map((schedule) =>
                          schedule.classes
                            .filter(
                              (classItem) =>
                                checkTimeSlot(selectedTimeSlot, classItem)
                            )
                            .map((classItem) => (
                              <li
                                key={classItem.course}
                                className="show"
                              >
                                {classItem.time} - {classItem.course} - <div style={{ color: 'white', background: 'black' }} >{classItem.room}</div>
                              </li>
                            ))
                        )}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No users have classes on {selectedDay} - {selectedTimeSlot}.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="container">
          {selectedDay && !selectedTimeSlot && (
            <div>
              <h2>
                {selectedDay} - {selectedTimeSlot}
              </h2>
              {filteredUsers2.length > 0 ? (
                filteredUsers2.map((user) => (
                  <div key={user.name}>
                    <h3>{user.name}</h3>
                    <ul>
                      {user.schedule
                        .filter((schedule) => schedule.day === selectedDay).map((schedule) =>
                          schedule.classes.map((classItem) => (
                            <li
                              key={classItem.course}
                              className="show"
                              style={{ marginBottom: '20px' }}
                            >
                              {classItem.time} - {classItem.course} <div style={{ color: 'white', background: 'black' }} >{classItem.room}</div>
                            </li>

                          ))
                        )}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No users have classes on {selectedDay} - {selectedTimeSlot}.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
///this is temp

export default App;
