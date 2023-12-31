/*
Geocoding: function to retrieve lat and lon given address
Params:
street (string) = address street number and name, default: empty string
city (string) = address city, default: empty string
state (string) = address state, default: empty string
country (string) = address country, default: empty string
Return:
coords (array of strings) = latitude and longitude
*/
async function getLatLon(venue='',street='', city='', state='', country='') {
    // format params: + sign separated, no whitespace
    const parts = [];

    if (venue) {
        parts.push(venue);
    }
    else {
        if (street) parts.push(street);
    }
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (country) parts.push(country);

    const searchParams = parts.join('+').replace(/ /g, '+');
    // nominatim api url with search params
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchParams}`;
    // console.log(url);
    // retrieve json results from url
    try {
        const results = await getJSON(url);
        // take first item in json, which is the top result; assumes that the top result in the right one
        const topRes = results[0];
        // extract latitude and longitude from results
        const lat = topRes.lat;
        const lon = topRes.lon;
        // format lat and lon as list and return
        const coords = [lat, lon];
        // console.log(coords)
        return coords;
    } catch (error) {
        console.log(`in geocoding.js : ${error.message}`);
        return [0,0];
    }
}

/*
Function to retrieve json from api call to given url
Params:
url (string) = url to retrieve json from
Return:
results (json) = api fetch results in json format
*/
async function getJSON(url) {
    const response = await fetch(url);
    const results = await response.json();
    return results;
}

export default getLatLon

// testing
// getLatLon("123 street st", "boston", "ma")
// getLatLon("2207 Lou Neff Rd", "Austin", "TX")
// getLatLon("denver", "co")