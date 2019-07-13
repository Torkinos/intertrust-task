import { put }      from "redux-saga/effects";
import axios        from "axios";
import moment       from "moment";
import * as actions from "./actions";

const id        = "bom_access-g_global_40km",
			longitude = "-50.5",
			latitude  = "49.5",
			apikey    = "b2f029c9e36c461fbaef926d75fa9e79";

const forecastUrl = `http://api.planetos.com/v1/datasets/${ id }
		/point?lon=${ longitude }
		&lat=${ latitude }
		&apikey=${ apikey }`;

// should be removed lately
const mock = `axis:latitude,axis:longitude,axis:reftime,axis:time,data:av_ttl_cld
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-11T15:00:00",1.0
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-11T18:00:00",123
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-11T21:00:00",232
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-12T00:00:00",443
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-12T03:00:00",299
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-12T06:00:00",181.0
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-12T09:00:00",221.0
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-12T12:00:00",155.984375
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-12T15:00:00",64.0`;

// should be removed lately
const mockCloud = `axis:latitude,axis:longitude,axis:reftime,axis:time,data:av_ttl_cld
49.453125,-50.625,"2019-07-11T12:00:00","2019-07-11T15:00:00",0.53`;

export function* fetchCloudData() {
	try {

		// const response = yield axios.get(forecastUrl + "&var=av_ttl_cld&csv=true&count=1");
		const response  = {
			data: mockCloud
		};
		const arr       = response.data.split(","),
					currValue = arr[arr.length - 1],
					data      = generateRandom(0, 100);
		// data      = Math.round(parseFloat(currValue) * 100);

		yield put(actions.setCloudData(data));
	}
	catch (e) {
		console.log("error : ", e);
	}
}

export function* fetchSolarData() {
	try {

		// const response = yield axios.get(forecastUrl + "&var=av_swsfcdown&csv=true&count=9");
		const response = {
			data: mock
		};
		const data     = {
			values: [],
			hours:  []
		};

		response.data.split("\n").forEach((item, index) => {

			if (index > 0) {

				const arr        = item.split(","),                    // split with commas
							date       = arr[3], 																		 // get date value for 24 hour forecast
							fixedDate  = date.replace(/"/g, ""), // remove unnecessary quote marks
							momentDate = moment(fixedDate), 												 // convert date to moment object
							hour       = momentDate.format("HH:00"),              // extract only hour value from date
							value      = Math.round(parseFloat(arr[4]));						 // get value from array

				data.values.push(value);
				data.hours.push(hour);
			}
		});

		yield put(actions.setSolarData(data));
	}
	catch (e) {
		console.log("error : ", e);
	}
}

export function* fetchPanelData() {
	try {

		const data = [];

		for (let i = 0; i < 30; i++) {

			const index = i < 10
										? "0" + i
										: i;

			data.push({
				id:      `SP-0${ index }`,
				wattage: generateRandom(100, 250),
				voltage: generateRandom(12, 17),
			});
		}

		yield put(actions.setPanelData(data));
	}
	catch (e) {
		console.log("error : ", e);
	}
}

const generateRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};
