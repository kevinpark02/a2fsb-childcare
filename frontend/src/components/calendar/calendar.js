import React from 'react';
import { withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.handleDateClick = this.handleDateClick.bind(this);
    }

    componentDidMount(){
      this.props.fetchEvents();
    }

    handleDateClick(e) {
        this.props.openModal('event');
    }

    handleEventClick = ({ event }) => {
      console.log(event)
    }

    formatEvent() {
      let events = Object.values(this.props.events)
      let formattedEvents = [];

      events.forEach(event => {
        formattedEvents.push({
          "title": event.eventName,
          "start": event.startTime,
          "end": event.endTime,
          "children": ["Kara", "Elena"]
        })
      })

      return formattedEvents;
    }

    render() {
        return (
          <div className="all-children-wrapper" 
               style={{zIndex: 0}}
               id='draggable-el'>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              initialView="dayGridMonth"
              selectable="true"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
              }}
              events={this.formatEvent()}
              dateClick={this.handleDateClick}
              editable="true"
              eventClick={this.handleEventClick}
            />
          </div>
        );
    }
}

export default withRouter(Calendar);