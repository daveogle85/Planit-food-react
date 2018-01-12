import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';
import { SlotInfo, BigCalendarProps } from '../../Models/Calendar';
import Modal from '../common/modal/Modal';
import DayCard from '../home/day-card/DayCard';

import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

BigCalendar.momentLocalizer(moment);

interface CalendarPageState {
    currentDate: Date;
    modalOpen: boolean;
}

/**
 * Calendar page using https://www.npmjs.com/package/react-big-calendar
 */
class CalendarPage extends Component<BigCalendarProps, CalendarPageState> {

    public constructor(props: BigCalendarProps) {
        super(props);
        this.state = {
            currentDate: new Date(),
            modalOpen: false
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
                        views={['month']}
                        onNavigate={() => null}
                        events={[]}
                        selectable={true}
                        startAccessor="startDate"
                        endAccessor="endDate"
                        onSelectSlot={this.onSelectSlot}
                    />
                </div>
                <Modal
                    isOpen={this.state.modalOpen}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.555)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        content: {
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '0',
                            background: 'transparent',
                            overflow: 'none',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '0',
                            outline: 'none',
                            padding: '0',
                            zIndex: '1'
                        }
                    }}
                >
                    {this.renderModal()}
                </Modal>
            </div >
        );
    }

    private onSelectSlot = (slotInfo: SlotInfo) => {
        this.setState({
            currentDate: slotInfo.start,
            modalOpen: true
        });
    }

    private renderModal = () => ([
        (
            <DayCard
                mealList={[{ id: '1', name: 'meal1' }]}
                key="day-card"
                allowEditing={true}
            />
        ),
        (
            <div className="modal-buttons" key="buttons">
                <button>Expand</button>
                <button onClick={() => this.setState({ modalOpen: false })}>Close</button>
            </div>
        )
    ])
}

export default CalendarPage;