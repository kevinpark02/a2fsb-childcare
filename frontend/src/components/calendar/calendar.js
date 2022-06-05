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

    componentDidMount(){
      this.props.fetchEvents();
    }

    handleDateClick(e) {
        this.props.openModal('event');
    }

    render() {
      console.log(this.props.events)
        return (
          <div className="all-children-wrapper" style={{zIndex: 0}}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              initialView="dayGridMonth"
              selectable="true"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
              }}
              dateClick={this.handleDateClick}
            />
          </div>
        );
    }
}

export default withRouter(Calendar);