// import React from "react";
// import styles from "./styles.scss"
// // import FullCalendar from "@fullcalendar/react";
// // import dayGridPlugin from "@fullcalendar/daygrid";
// // import interactionPlugin from "@fullcalendar/interaction";
// // import timeGridPlugin from "@fullcalendar/timegrid";

// // import "../../../../node_modules/@fullcalendar/core/main.css";
// // import "node_modules/@fullcalendar/daygrid/main.css";


// export class Calendar extends React.Component {
//   // calendarComponentRef = React.createRef<FullCalendar>();
//   state = {
//     events: [
//       { id: 1, title: "event 1", date: "2019-12-01" },
//     ]
//   };

//   handleDateClick = arg => {
//     alert(arg.dateStr);
//   };

//   handleSelectedDates = info => {
//     alert("selected " + info.startStr + " to " + info.endStr);
//     const title = prompt("What's the name of the title");
//     console.log(info);
//     if (title != null) {
//       const newEvent = {
//         title,
//         start: info.startStr,
//         end: info.endStr
//       };
//       const data = [...this.state.events, newEvent];
//       this.setState({ events: data });
//       console.log("here", data);
//     } else {
//       console.log("nothing");
//     }
//   };

//   render() {
//     return (
//       <div className={styles.container}>
//         <FullCalendar
//           ref={this.calendarComponentRef}
//           defaultView="dayGridMonth"
//           dateClick={this.handleDateClick}
//           displayEventTime={true}
//           header={{
//             left: "prev,next today",
//             center: "title",
//             right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
//           }}
//           selectable={true}
//           plugins={[
//             dayGridPlugin,
//             interactionPlugin,
//             timeGridPlugin,
//           ]}
//           eventClick={event => {
//             console.log(event.event._def.publicId);
//           }}
//           events={this.state.events}
//           select={this.handleSelectedDates}
//           eventLimit={3}
//         />  
//       </div>
//     );
//   }
// }
