import Validator from "helpers/ValidatonModel";

/**
 * Check if error exists
 * @param model
 */
const checkError = (model) => {
	let err = {};
	Object.keys(model).forEach(key => {
		let validator = new Validator();
		let msg = validator.validate(model[key]["value"], model[key]["validator"], model[key]["key"] || key);
		
		if (msg.trim()) {
			err[key] = msg;
		}
	});
	return err;
};

const getParameterByName = (name, url) => {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/**
 * Default export
 */
export {
	checkError,
	getParameterByName,
};