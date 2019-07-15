import { put, delay, select } from "redux-saga/effects";
import axios                  from "axios";
import moment                 from "moment";
import { getPanelData }       from "./selectors";
import * as actions           from "./actions";

// endpoint configurations
const id        = "bom_access-g_global_40km",
			longitude = "-50.5",
			latitude  = "49.5",
			apikey    = "b2f029c9e36c461fbaef926d75fa9e79";

// forecast endpoint
const forecastUrl = `http://api.planetos.com/v1/datasets/${ id }
		/point?lon=${ longitude }
		&lat=${ latitude }
		&apikey=${ apikey }`;


// fetch solar activity forecast
export function* fetchSolarData() {
	try {

		// start loading
		yield put(actions.setSolarDataLoading(true));

		// send request
		const response = yield axios.get(forecastUrl + "&var=av_swsfcdown&csv=true&count=20");

		const data = {
			values: [],
			hours:  []
		};

		let dayIndex = null;

		// sort data
		response.data.split("\n").forEach((item, index) => {

			if (index > 0) {

				const arr        = item.split(","),                    // split with commas
							date       = arr[3], 																		 // get date value for 24 hour forecast
							fixedDate  = date.replace(/"/g, ""), // remove unnecessary quote marks
							momentDate = moment(fixedDate);										  		 // convert date to moment object

				if (momentDate > moment().subtract(3, "hours") && dayIndex < 9) {

					const hour  = momentDate.format("HH:00"),           // extract only hour value from date
								value = Math.round(parseFloat(arr[4]));						  // get value from array

					data.values.push(value);
					data.hours.push(hour);

					dayIndex++;
				}
			}
		});

		// save in store
		yield put(actions.setSolarData(data));

		// end loading
		yield put(actions.setSolarDataLoading(false));
	}
	catch (e) {

		// in case of error use mock data
		console.log("error : ", e);

		// create effect of server fetching
		yield delay(500);

		// end loading
		yield put(actions.setSolarDataLoading(false));

		yield put(actions.setSolarData(generateSolarData()));
	}
}

// fetch cloud coverage forecast
export function* fetchCloudData() {
	try {

		// start loading
		yield put(actions.setCloudDataLoading(true));

		// send request
		const response = yield axios.get(forecastUrl + "&var=av_ttl_cld&csv=true&count=20");

		// split with lines
		const arrSplit = response.data.split("\n");

		// remove header from array
		arrSplit.shift();

		// find current time
		const arr = arrSplit.find(arr => {

			// get time
			const axisTime = arr.split(",")[3].replace(/"/g, "");

			// parse time as moment object
			const momentTime = moment(axisTime);

			// compare and return
			return momentTime >= moment() && momentTime < moment().add(3, "hours");
		});

		// get value from found array
		const value = arr.split(",")[4];

		//
		const data = Math.round(parseFloat(value) * 100);   // parse and round the value

		// save in store
		yield put(actions.setCloudData(data));

		// end loading
		yield put(actions.setCloudDataLoading(false));
	}
	catch (e) {

		// in case of error use mock data
		console.log("error : ", e);

		// create effect of server fetching
		yield delay(500);

		// end loading
		yield put(actions.setCloudDataLoading(false));

		// save in store
		yield put(actions.setCloudData(generateRandom(0, 100)));
	}
}

// fetch solar panel data
export function* fetchPanelData() {

	// create mock data for solar panels
	try {

		// start loading
		yield put(actions.setPanelDataLoading(true));

		const panelData = yield select(getPanelData);

		// if data does not exit generate new, other case update existing
		const result = panelData === null
									 ? generatePanelData()
									 : updatePanelData(panelData);

		// create effect of server fetching
		yield delay(500);

		// save in store
		yield put(actions.setPanelData(result));

		// end loading
		yield put(actions.setPanelDataLoading(false));
	}
	catch (e) {
		console.log("error : ", e);
	}
}

// generate fake solar activity forecast
const generateSolarData = () => {

	const data = {
		values: [],
		hours:  []
	};

	for (let i = 0; i < 24; i++) {

		// generate time
		const time = moment().add(i, "hours");

		// format as a number for calculations
		const hour = time.format("H");

		// format as an hour
		const result = time.format("HH:00");

		let max = 300;

		// calculate which period of day is according hour
		const morning = hour >= 7 && hour < 11,
					evening = hour > 18 && hour < 24,
					night   = hour >= 0 && hour < 7;

		// calculate max according day period
		if (morning || evening) {
			max = 100;
		}

		if (night) {
			max = 0;
		}

		// calculate min according daytime
		const min = max === 0
								? 0
								: 50;

		// generate result
		data.hours.push(result);
		data.values.push(generateRandom(min, max));
	}

	return data;
};

// generate fake solar panel data
const generatePanelData = () => {

	const data = [];

	for (let i = 0; i < 30; i++) {

		// generate index
		const index = i < 10
									? "0" + i
									: i;

		data.push({
			id:      `SP-0${ index }`,
			wattage: generateRandom(50, 150), // generate wattage
			voltage: generateRandom(12, 17),   // generate voltage
		});
	}

	return data;
};

// add fake numbers on solar panel data
const updatePanelData = data => {

	return data.map(item => {

		const wattage = item.wattage + generateRandom(0.7, 1.2);

		return {
			...item,
			wattage
		};
	});
};

// generates random number, from specific parameters
const generateRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};
