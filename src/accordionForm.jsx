import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Slider, Button, ButtonGroup } from '@material-ui/core';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Typography } from '@material-ui/core';


export default function AccordionForm({ selectedDate, timeRange, setTimeRange, workingTime, setWorkingTime, dateType, setDateType }) {

	let sendData = () => {
		console.log("data sended")

	}

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>
					<AlarmOnIcon /> Select schedule
			</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container
					// styles={{padding:"20px"}}
					direction="column">
					<Grid item container
						justify="space-between"
						style={{ margin: '10px 17px 0', width: 'calc(100% - 34px)' }}>
						<Typography>
							choose set range
						</Typography>
						<Slider
							style={{ width: "150px", margin: '0 17px' }}
							defaultValue={0}
							onChange={(e, v) => v === 25 ? setTimeRange(30) : setTimeRange(v)}
							marks={[
								{ label: '5', value: 5 },
								{ label: '10', value: 10 },
								{ label: '15', value: 15 },
								{ label: '20', value: 20 },
								{ label: '30', value: 25 },
							]}
							min={0}
							max={25}
							step={5}
						/>
						<ButtonGroup
							size="small"
							orientation="vertical"
							variant="text"
							color="primary"
							aria-label="text primary button group"
							onClick={(e) => setDateType(`${e.target.innerHTML}`)
							}>
							<Button color={dateType === 'weekend' ? 'secondary' : 'primary'}>weekend</Button>
							<Button color={dateType === 'weekday' ? 'secondary' : 'primary'}>weekday</Button>
							<Button color={dateType === 'holiday' ? 'secondary' : 'primary'}>holiday</Button>
						</ButtonGroup>
					</Grid>
					<Grid item container
						style={{ margin: '40px 17px 15px', width: 'calc(100% - 34px)' }}
					>
						<Typography>
							choose working time
						</Typography>
						<Slider
							style={{ margin: '20px 0 0' }}
							// defaultValue={workingTime}
							value={workingTime}
							onChange={(e, v) => {
								setWorkingTime(v)
								console.log(workingTime);
							}}
							valueLabelFormat={(v) => {
								if (v === 288) return '23:59';
								const h = Math.floor(v / 12);
								const m = (v % 12) * 5;

								return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
							}}
							marks={[
								{ label: '00:00', value: 0 },
								{ label: '03:00', value: 36 },
								{ label: '06:00', value: 72 },
								{ label: '09:00', value: 108 },
								{ label: '12:00', value: 144 },
								{ label: '15:00', value: 180 },
								{ label: '18:00', value: 216 },
								{ label: '21:00', value: 252 },
								{ label: '23:59', value: 288 },
							]}
							aria-labelledby='discrete-slider-small-steps'
							step={timeRange / 5}
							min={0}
							max={288}
							valueLabelDisplay='auto'
						/>
					</Grid>
				</Grid>
			</AccordionDetails>
			<AccordionActions>
				<Button
					disabled={!selectedDate.length || timeRange === 0}
					onClick={() => sendData()}
					variant="contained"
					color="primary"
				>
					Submit
				</Button>

			</AccordionActions>
		</Accordion>
	)
}