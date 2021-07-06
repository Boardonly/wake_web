import React from "react";
import { Grid } from '@material-ui/core'



export default function Day({ date, scheduledDay }) {
	const dayStyle = {
		container: {
			minWidth: "75px",
			height: "50px",
			fontSize: 12,
			textTransform: "lowercase",
			alignItems: "center"
		},

	}

	if (scheduledDay) {
		return (
			<Grid container style={dayStyle.container} justify="space-between">
				<Grid style={{ fontSize: 16 }}>{date}</Grid>
				<Grid>{scheduledDay.type}</Grid>
				<Grid width="100%">{scheduledDay.time[0]}-{scheduledDay.time[scheduledDay.time.length - 1]}</Grid>
			</Grid >
		)
	}

	return (
		<Grid container style={dayStyle.container} >
			<Grid style={{ fontSize: 16, height: "50px" }}>{date}</Grid>
		</Grid >
	)


}
