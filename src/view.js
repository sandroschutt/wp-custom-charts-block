/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
import $ from "jquery";
import Chart from "chart.js/auto";

$(document).ready(() => {
	const data = JSON.parse($(".chart-container .chart-data pre").html());
	const description = data.description;
	const type = data.type;
	const labels = JSON.parse(data.labels);
	const stringValues = JSON.parse(data.values);
	const intValues = stringValues.map(value => value = parseInt(value))
	const colors = JSON.parse(data.colors);

	const canvas = $(".chart-container canvas");

	const chartData = {
		labels: labels,
		datasets: [
			{
				fill: 'origin',
				label: description,
				data: intValues,
				borderWidth: 1,
				backgroundColor: type == "line" ? colors[0] + "25" : colors,
			},
		],
	};

	new Chart(canvas, {
		type: type,
		data: chartData,
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	});
});

/* eslint-enable no-console */
