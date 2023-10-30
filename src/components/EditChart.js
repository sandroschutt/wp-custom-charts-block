import { __ } from "@wordpress/i18n";
import {
	Flex,
	FlexBlock,
	TextControl,
	Button,
	SelectControl
} from "@wordpress/components";
import { useState, useEffect } from "react";
import $ from "jquery";
import uniqid from "uniqid";

export default function EditChart(props) {
	let data = props.attributes;
	let attributes = data.attributes;

	const [id, setId] = useState(attributes.id);
	const [title, setTitle] = useState(attributes.title);
	const [description, setDescription] = useState(attributes.description);
	const [type, setType] = useState(attributes.type);
	const [label, setLabel] = useState("");
	const [labels, setLabels] = useState(attributes.labels);
	const [editLabels, setEditLabels] = useState(attributes.labels);
	const [values, setValues] = useState(attributes.values);
	const [colors, setColors] = useState(attributes.colors);

	if (id == "none") setId(uniqid());

	function addNewLabel() {
		try {
			if (label != "") {
				let newLabels = JSON.parse(labels);
				newLabels.push(label);
				setLabels(JSON.stringify(newLabels));
				setEditLabels(JSON.stringify(newLabels));

				//create a default value for the label
				let defaultValue = JSON.parse(values);
				defaultValue.push("0");
				setValues(JSON.stringify(defaultValue));

				//set a default color for the column
				let defaultColor = JSON.parse(colors);
				defaultColor.push("#4f65a9");
				setColors(JSON.stringify(defaultColor));

				setLabel("");
			} else alert("You must name you label before adding it.");
		} catch (error) {
			console.log(error);
		}
	}

	function saveLabel(event) {
		try {
			let inputValues = Array();

			event.target.parentNode.childNodes.forEach((element) => {
				if ($(element)[0].nodeName == "SPAN") {
					let inputContainer = $(element)[0];
					let index = $(event.target.parentNode).attr("id");
					let ogLabels = JSON.parse(labels);
					let ogValues = JSON.parse(values);
					let ogColors = JSON.parse(colors);

					inputValues.push($(inputContainer).find("input").val());

					ogLabels[index] = inputValues[0];
					ogValues[index] = inputValues[1];
					ogColors[index] = inputValues[2];
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	function editLabel(value, index) {
		try {
			let editingLabels = JSON.parse(editLabels);
			editingLabels[index] = value;
			setEditLabels(JSON.stringify(editingLabels));
			setLabels(JSON.stringify(editingLabels));
		} catch (error) {
			console.log(error);
		}
	}

	function editValue(value, index) {
		try {
			let editingValues = JSON.parse(values);
			editingValues[index] = value;
			setValues(JSON.stringify(editingValues));
		} catch (error) {
			console.log(error);
		}
	}

	function editColor(event, index) {
		try {
			let editingColors = JSON.parse(colors);
			let editingColor = event.target.value;
			editingColors[index] = editingColor;
			setColors(JSON.stringify(editingColors));
		} catch (error) {
			console.log(error);
		}
	}

	function deleteLabel(index) {
		try {
			let deleteLabel = JSON.parse(labels);
			deleteLabel.splice(index, 1);
			setLabels(JSON.stringify(deleteLabel));

			let deleteValue = JSON.parse(values)
			deleteValue.splice(index, 1);
			setValues(JSON.stringify(deleteValue));

			let deleteColor = JSON.parse(colors)
			deleteColor.splice(index, 1);
			setColors(JSON.stringify(deleteColor));
		} catch (error) {
			console.log(error);
		}
	}

	function saveChart() {
		try {
			data.setAttributes({ id: id });
			data.setAttributes({ title: title });
			data.setAttributes({ description: description });
			data.setAttributes({ labels: labels });
			data.setAttributes({ values: values });
			data.setAttributes({ colors: colors });
			data.setAttributes({ type: type });
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Flex>
			<FlexBlock id={id} className={"chart-container"}>
				<div className={"chart-header"}>
					<span>
						<TextControl
							label={__("Chart title:", title)}
							value={`${title}`}
							onChange={(value) => setTitle(value)}
						/>
					</span>

					<span>
						<TextControl
							label={__("Description:", description)}
							value={`${description}`}
							onChange={(value) => setDescription(value)}
						/>
					</span>

					<span className={`ctype-select-${id}`}>
						<SelectControl
							label="Type: "
							options={[
								{ label: "Bar", value: "bar" },
								{ label: "Line", value: "line" },
								{ label: "Doughnut", value: "doughnut" },
								{ label: "Pie", value: "pie" },
								{ label: "Polar Area", value: "polarArea" },
							]}
							onChange={(value) => setType(value)}
						/>
					</span>
				</div>

				<hr />

				<div class="chart-labels">
					<div className="add-new-label">
						<p className="container">
							<div className="labels">
								<TextControl
									label="Column: "
									value={label}
									onChange={(value) => setLabel(value)}
								/>
							</div>
							<Button
								variant="secondary"
								size="compact"
								onClick={() => {
									addNewLabel();
								}}
							>
								Add new
							</Button>
						</p>
					</div>

					<div className="your-labels">
						<p className="section-title">CHART DATA: </p>
						{JSON.parse(labels).map((label, index) => {
							return (
								<p className={"container"} id={__(index)}>
									<span>
										<TextControl
											className="label-input"
											label={`Label:`}
											value={`${JSON.parse(editLabels)[index]}`}
											onChange={(value) => editLabel(value, index)}
										/>
									</span>

									<span>
										<TextControl
											className="label-input"
											label={`Value:`}
											value={`${JSON.parse(values)[index]}`}
											onChange={(value) => editValue(value, index)}
										/>
									</span>

									<span>
										<input
											type="color"
											className="label-color"
											name="color"
											value={`${JSON.parse(colors)[index]}`}
											onChange={(event) => editColor(event, index)}
										/>
									</span>

									<Button
										className="label-button"
										variant="tertiary"
										size="default"
										onClick={(event) => {
											saveLabel(event);
										}}
									>
										Save
									</Button>

									<Button
										className="label-button"
										variant="tertiary"
										size="default"
										onClick={() => {deleteLabel(index)}}
									>
										Delete
									</Button>
								</p>
							);
						})}
					</div>
				</div>

				<Button
					variant="primary"
					onClick={() => {
						saveChart();
					}}
				>
					Save Chart
				</Button>
			</FlexBlock>
		</Flex>
	);
}
