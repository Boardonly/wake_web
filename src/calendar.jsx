import React, { useState } from "react";
import moment from "moment";

import useStyle from './calendar.styles'

import AccordionForm from "./accordionForm"
import ListDays from "./list_days";
import init from './init.json'

import { Grid, Typography, IconButton } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab/';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';


function Calendar({ locale = 'en', utcOffset = -180 }) {
	const [mode, setMode] = useState('range'); // range | unique
	const classes = useStyle();
	const nowDate = moment(new Date()).format('YYYY-MM-DD');
	const [selectedDate, setSelectedDate] = useState([]);
	const [calendarDate, setCalendarDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
	const [timeRange, setTimeRange] = useState(0)
	const [workingTime, setWorkingTime] = useState([0, 288])
	const [dateType, setDateType] = useState('weekend')

	window.init = init
	window.dateType = dateType
	window.timeRange = timeRange
	window.selectedDate = selectedDate


	const increaseCalendarDate = () => {
		const month = calendarDate.split("-")[1];
		const formatedDate = moment(calendarDate).month(month).format('YYYY-MM-DD');

		setCalendarDate(formatedDate);
	};

	const decreaseCalendarDate = () => {
		const month = Number(calendarDate.split("-")[1]) - 2;
		const formatedDate = moment(calendarDate).month(month).format('YYYY-MM-DD');

		setCalendarDate(formatedDate);
	};

	const hendleSelectUnique = (date) => {
		const has = selectedDate.includes(date);

		if (has) {
			setSelectedDate(selectedDate.filter((d) => d !== date));
		} else {
			setSelectedDate([...selectedDate, date]);
		}
	}

	const hendleSelectRange = (date) => {
		if (selectedDate.length > 1) return setSelectedDate([date]);
		if (!selectedDate.length) return setSelectedDate([date]);
		if (date < selectedDate[0]) return setSelectedDate([date]); // isLess

		const rangeCount = moment(date).diff(moment(selectedDate[0]), 'days') + 1;

		const range = new Array(rangeCount).fill().map((v, i) =>
			moment(selectedDate[0]).add(i, 'days').format('YYYY-MM-DD')
		);

		setSelectedDate(range);
	}

	return (
		<Grid container direction='column' className={classes.calendar} spacing={5}>
			<Grid container item>
				<ToggleButtonGroup size="small" value={mode} exclusive onChange={(e, v) => setMode(v)}>
					<ToggleButton value="range">
						<Typography variant='subtitle1'>RANGE</Typography>
					</ToggleButton>
					<ToggleButton value="unique">
						<Typography variant='subtitle1'>UNIQUE</Typography>
					</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
			<Grid item container direction='column' spacing={3}>
				<Grid item container direction='row' justify='space-between'>
					<IconButton disabled={calendarDate <= nowDate} onClick={decreaseCalendarDate}>
						<ChevronLeft />
					</IconButton>
					<Typography variant='h6'>
						{moment(calendarDate).locale(locale).utcOffset(utcOffset).format("MMMM YYYY")}
					</Typography>
					<IconButton onClick={increaseCalendarDate}>
						<ChevronRight />
					</IconButton>
				</Grid>

				<Grid item container direction='row' justify='space-around'>
					{moment.weekdaysMin(true).map((weekDay) => (
						<Grid item key={weekDay}>
							<Typography>
								{weekDay}
							</Typography>
						</ Grid>
					))}
				</Grid>

				<ListDays
					mode={mode}
					onSelect={mode === 'range' ? hendleSelectRange : hendleSelectUnique}
					selectedDate={selectedDate}
					schedule={init.data.filter(({ date }) => date.startsWith(''))}
					nowDate={nowDate}
					calendarDate={calendarDate}
				/>
			</Grid>
			<AccordionForm
				selectedDate={selectedDate}
				timeRange={timeRange}
				setTimeRange={setTimeRange}
				workingTime={workingTime}
				setWorkingTime={setWorkingTime}
				dateType={dateType}
				setDateType={setDateType} />
		</Grid>
	);
}

export default Calendar;

