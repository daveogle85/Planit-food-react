import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';

import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import { SlotInfo, BigCalendarProps } from '../../Models/Calendar';

BigCalendar.momentLocalizer(moment);

interface CalendarPageState {
    currentDate: Date;
}

/**
 * Calendar page using https://www.npmjs.com/package/react-big-calendar
 */
class CalendarPage extends Component<BigCalendarProps, CalendarPageState> {

    public constructor(props: BigCalendarProps) {
        super(props);
        this.state = {
            currentDate: new Date()
        };
    }

    public render() {
        return (
            <div className="CalendarPage">
                <Link to={`/`} className="nav-link">
                    Go to Home
                </Link>
                <div className="big-calendar">
                    <BigCalendar
                        onNavigate={() => null}
                        events={[]}
                        selectable={true}
                        startAccessor="startDate"
                        endAccessor="endDate"
                        onSelectSlot={this.onSelectSlot}
                    />
                </div>
            </div>
        );
    }

    private onSelectSlot = (slotInfo: SlotInfo) => {
        this.setState({ currentDate: slotInfo.start });
    }
}

export default CalendarPage;