import React from 'react';
import { withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.handleDateClick = this.handleDateClick.bind(this);
    }

    handleDateClick(e) {
        console.log(e);
        this.props.openModal('event');
    }

    render() {
        return (
          <div className="all-children-wrapper">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              initialView="dayGridMonth"
              selectable="true"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
              }}
              events={[
                {
                  title: "mbs",
                  start: "2022-05-08T25:00:00.000Z",
                  duration: "02:00"
                
                },
              ]}
              dateClick={this.handleDateClick}
            />
          </div>
        );
    }
}

export default withRouter(Calendar);