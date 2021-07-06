import React, { useState } from "react";
import { Grid, Button } from '@material-ui/core'
import moment from "moment";
import uuid from 'react-uuid'
import clsx from 'clsx';
import useStyle from './list_days.styles'
import Day from './day'

function ListDays({ selectedDate, nowDate, schedule, mode, calendarDate, onSelect }) {
	const [hoverDate, setHoveDate] = useState(null);
	const classes = useStyle();

	const daysInMonth = Number(moment(calendarDate).daysInMonth());
	const dateIsNow = calendarDate.split('-')[1] === nowDate.split('-')[1] && Number(nowDate.split('-').pop());
	// This month starts with the week index 
	const MWI = Number(moment(calendarDate).date(1).format("e"));


	window.schedule = schedule
	window.selectedDate = selectedDate
	window.MWI = MWI
	window.daysInMonth = daysInMonth
	window.hoverDate = hoverDate

	return <Grid item className={classes.list} container>
		{
			new Array(MWI + daysInMonth).fill('').map((v, i) => {
				const dd = 1 + i - MWI;
				const fullDate = moment(calendarDate).date(dd).format("YYYY-MM-DD");
				const scheduledDay = schedule.filter((d) => d.date === moment().date(dd).format("YYYY-MM-DD"))

				return (
					<Grid item key={uuid()} className={classes.cell} >
						{dd > 0 && (
							<Button
								color="default"
								onMouseOver={() => mode === 'range' && setHoveDate(fullDate)}
								onClick={(e) => onSelect(fullDate)}
								disabled={dateIsNow && dd < dateIsNow}
								className={clsx(
									classes.btn,
									dd === dateIsNow && classes.now,
									selectedDate.includes(fullDate) && classes.selected,
									// scheduledDay.length && classes.scheduled,
									mode === 'range' && (fullDate === selectedDate[0]) && classes.start,
									mode === 'range' && fullDate === selectedDate[selectedDate.length - 1] && classes.end,
									mode === 'range' && selectedDate.length < 2 && hoverDate > fullDate && fullDate > selectedDate[0] && classes.hoverSelect,
									mode === 'range' && fullDate === hoverDate && classes.start,
									mode === 'range' && fullDate === hoverDate && classes.end,
								)}
							>
								<Day date={dd} scheduledDay={scheduledDay[0]} />
							</Button>
						)}
					</Grid>
				);
			})
		}
	</Grid>;
}

export default ListDays;
