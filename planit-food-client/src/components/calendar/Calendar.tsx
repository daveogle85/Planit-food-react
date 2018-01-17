import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';
import { SlotInfo, BigCalendarProps, Event, CalendarEvent } from '../../models/Calendar';
import Modal from '../common/modal/Modal';
import DayCard from '../common/day-card/DayCard';
import { DayCard as DayCardModel } from '../../models/DayCard';
import { Moment } from 'moment';
import { Recipe } from '../../models/Recipes';

import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

BigCalendar.momentLocalizer(moment);

interface CalendarState {
    currentDate: Date;
    modalOpen: boolean;
    currentCard?: DayCardModel;
}

type CalendarProps = BigCalendarProps & {
    events?: Array<Event<DayCardModel>>,
    refetch?: (variables: {}) => void
};

/**
 * Calendar page using https://www.npmjs.com/package/react-big-calendar
 */
class Calendar extends Component<CalendarProps, CalendarState> {

    public constructor(props: CalendarProps) {
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
                        onNavigate={(selectedDate: Moment) => {
                            return this.props.refetch && this.props.refetch({
                                startDate: moment(selectedDate).startOf('month').format(),
                                endDate: moment(selectedDate).endOf('month').format()
                            });
                        }}
                        events={this.props.events || []}
                        selectable={true}
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
        const selectedEvent = this.props.events ? (this.props.events as CalendarEvent[]).find((event) =>
            event.start.isSame(slotInfo.start, 'day')) : undefined;
        this.setState({
            currentDate: slotInfo.start,
            modalOpen: true,
            currentCard: selectedEvent && (selectedEvent as Event<DayCardModel>).card
        });
    }

    private renderModal = () => {
        let date = moment(this.state.currentDate);
        let mealList: Recipe[] = [];
        if (this.state.currentCard) {
            date = this.state.currentCard.date;
            mealList = this.state.currentCard.recipes;
        }
        return ([
            (
                <DayCard
                    date={date}
                    mealList={mealList}
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
        ]);
    }
}

export default Calendar;