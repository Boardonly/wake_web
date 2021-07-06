import React, { useEffect, useState } from "react";
import moment from "moment";


export function ListTime({ time, setTime }) {
	const [step, setStep] = useState(5);
	// selectedRang [start, end]
	useEffect(() => {
		let q = []
		let minutesRange = 60 / step;

		for (let i = 0; i <= 24; i++) {
			for (let j = 0; j < minutesRange; j++) {
				let hours = "" + i;
				let minutes = j * step + ''
				let time = `${hours.length < 2 ? "0" + hours : hours}:${minutes.length < 2 ? "0" + minutes : minutes}`
				q.push(time);
			}
		}
		setTime(q)
		// return <select name={name} id={name}>{q}</select>
	}
		, [step])

	let rangeSetter = (targVal) => {
		// console.log(targVal);
		targVal < 30 && targVal > 20 ? setStep("30") : setStep(targVal)

	}
	// console.log(Time);
	return (
		<div className="list_time">
			{step}
			<input type="range" name="" id="" max="25" min="5" step="5" onChange={(e) => rangeSetter(e.target.value)} />
			<select name="time_start" id="time_start">{
				time.length && time.map((el) => <option key={el} value={el}>{el}</option>)
			}</select>
			<select name="time_end" id="time_end">{
				time.length && time.map((el) => <option key={el} value={el}>{el}</option>)
			}</select>
			<select name="date_type" id="date_type">
				<option value="weekend"> weekend </option>
				<option value="weekdays" > weekday</option>
				<option value="holiday"> holiday </option>
			</select>
			{/* {timeSet("asd")}
			{timeSet("time-end")} */}
			{/* <ul id='111'>
				{
					Time.length && Time.map(({ time, selected }) => (
						<li key={time}>{time} <input type="checkbox" checked={selected} /></li>
					))
				}
			</ul> */}
		</div>
	);
}
