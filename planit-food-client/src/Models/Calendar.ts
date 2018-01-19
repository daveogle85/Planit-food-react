import { Moment } from "moment";
import { ApiProps } from './Api';
import { DayCard, AddDayCardMutatorProps } from './DayCard';
import { AddRecipeMutatorProps, RemoveRecipeMutatorProps } from './Recipes';

export type SlotInfo = {
    start: Date,
    end: Date,
    slots: Array<Date>,
    action: string
}

type stringOrDate = string | Date;

export interface Event<T> extends CalendarEvent { card: T }

export interface CalendarEvent {
    title: string;
    allDay: boolean;
    start: Moment;
    end: Moment;
    desc: string;
}

export interface BigCalendarProps {
    date?: stringOrDate;
    view?: string;
    events?: CalendarEvent[];
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

export type queryVariables = { startDate: Moment, endDate: Moment };

type ApolloActions = {
    addRecipeToCard: DayCard,
    removeRecipeFromCard: boolean,
    addDayCard: DayCard
}

export type CalendarContainerProps = ApiProps<
    { getDayCards: DayCard[] },
    queryVariables,
    ApolloActions> & {
        addRecipeToCardWithData: (props: AddRecipeMutatorProps) => {
            data: ApolloActions
        },
        removeRecipeFromCardWithData: (props: RemoveRecipeMutatorProps) => {
            data: ApolloActions
        },
        addDayCardWithData: (props: AddDayCardMutatorProps) => {
            data: ApolloActions
        }
    };