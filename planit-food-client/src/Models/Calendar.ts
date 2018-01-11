export type SlotInfo = {
    start: Date,
    end: Date,
    slots: Array<Date>,
    action: string
}

type stringOrDate = string | Date;

interface CalendarEvent {
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
    desc: string;
}

export interface BigCalendarProps {
    date?: stringOrDate;
    view?: string;
    events?: Object[];
    onNavigate?: Function;
    onView?: Function;
    onSelectSlot?: (slotInfo: { start: stringOrDate, end: stringOrDate, slots: Date[] | string[] }) => void;
    onSelectEvent?: (event: CalendarEvent) => void;
    onSelecting?: (slotInfo: { start: stringOrDate, end: stringOrDate }) => boolean;
    views?: Object;
    toolbar?: boolean;
    popup?: boolean;
    popupOffset?: number | { x: number, y: number };
    selectable?: boolean;
    step?: number;
    rtl?: boolean;
    eventPropGetter?: (event: Object, start: stringOrDate, end: stringOrDate, isSelected: boolean) => void;
    titleAccessor?: string | ((row: Object) => string);
    allDayAccessor?: string | ((row: Object) => boolean);
    startAccessor?: string | ((row: Object) => Date);
    endAccessor?: string | ((row: Object) => Date);
    min?: stringOrDate;
    max?: stringOrDate;
    scrollToTime?: stringOrDate;
    formats?: Object;
    components?: Object;
    messages?: Object;
    timeslots?: number;
    defaultView?: string;
    className?: string;
    elementProps?: React.HTMLAttributes<HTMLElement>;
}