import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// React Leaflet
import {
	MapContainer,
	TileLayer,
	Marker,
	useMap,
	Polygon,
} from "react-leaflet";

// MUI
import {
	Grid,
	AppBar,
	Typography,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CircularProgress,
	TextField,
	FormControlLabel,
	Checkbox,
	Snackbar,
	Alert,
} from "@mui/material";

// Boroughs
import Camden from "./Assets/Boroughs/Camden";
import Greenwich from "./Assets/Boroughs/Greenwich";
import Hackney from "./Assets/Boroughs/Hackney";
import Hammersmith from "./Assets/Boroughs/Hammersmith";
import Islington from "./Assets/Boroughs/Islington";
import Kensington from "./Assets/Boroughs/Kensington";
import Lambeth from "./Assets/Boroughs/Lambeth";
import Lewisham from "./Assets/Boroughs/Lewisham";
import Southwark from "./Assets/Boroughs/Southwark";
import Hamlets from "./Assets/Boroughs/Hamlets";
import Wandsworth from "./Assets/Boroughs/Wandsworth";
import Westminster from "./Assets/Boroughs/Westminster";
import City_of_London from "./Assets/Boroughs/City_of_London";
import Agueda from "./Assets/Boroughs/Agueda";
import Barnet from "./Assets/Boroughs/Barnet";
import Bexley from "./Assets/Boroughs/Bexley";
import Brent from "./Assets/Boroughs/Brent";
import Bromley from "./Assets/Boroughs/Bromley";
import Croydon from "./Assets/Boroughs/Croydon";
import Ealing from "./Assets/Boroughs/Ealing";
import Enfield from "./Assets/Boroughs/Enfield";
import Haringey from "./Assets/Boroughs/Haringey";
import Harrow from "./Assets/Boroughs/Harrow";
import Havering from "./Assets/Boroughs/Havering";
import Hillingdon from "./Assets/Boroughs/Hillingdon";
import Hounslow from "./Assets/Boroughs/Hounslow";
import Kingston from "./Assets/Boroughs/Kingston";
import Merton from "./Assets/Boroughs/Merton";
import Newham from "./Assets/Boroughs/Newham";
import Redbridge from "./Assets/Boroughs/Redbridge";
import Richmond from "./Assets/Boroughs/Richmond";
import Sutton from "./Assets/Boroughs/Sutton";
import Waltham from "./Assets/Boroughs/Waltham";


const listingTypeOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Apartment",
		label: "Apartment",
	},
	{
		value: "House",
		label: "House",
	},
	{
		value: "Office",
		label: "Office",
	},
];

const propertyStatusOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Presencial",
		label: "Presencial",
	},
	{
		value: "Remoto",
		label: "Remoto",
	},
	{
		value: "Híbrido",
		label: "Híbrido",
	},
];

const internshipBachelorOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "CTeSP",
		label: "CTeSP",
	},
	{
		value: "Licenciatura",
		label: "Licenciatura",
	},
	{
		value: "Mestrado",
		label: "Mestrado",
	},
	{
		value: "Doutoramento",
		label: "Doutoramento",
	},
];

function ListingUpdate(props) {
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

	const initialState = {
		titleValue: props.listingData.title,
		listingTypeValue: props.listingData.listing_type,
		descriptionValue: props.listingData.description,
		propertyStatusValue: props.listingData.internship_status,
		vacanciesValue: props.listingData.vacancies,
		internshipBachelorValue: props.listingData.internship_bachelor,
		totalHoursValue: props.listingData.total_hours,
		programmingLangPythonValue: props.listingData.programming_lang_python,
		programmingLangJavaValue: props.listingData.programming_lang_java,
		programmingLangC1Value: props.listingData.programming_lang_c_1,
		programmingLangC2Value: props.listingData.programming_lang_c_2,
		programmingLangJavaScriptValue: props.listingData.programming_lang_javascript,


		programmingLangSQLValue: props.listingData.programming_lang_sql,
		programmingLangPHPValue: props.listingData.programming_lang_php,
		programmingLangGoValue: props.listingData.programming_lang_go,
		programmingLangKotlinValue: props.listingData.programming_lang_kotlin,
		programmingLangMATLABValue: props.listingData.programming_lang_matlab,
		programmingLangSwiftValue: props.listingData.programming_lang_swift,
		programmingLangRustValue: props.listingData.programming_lang_rust,
		programmingLangRubyValue: props.listingData.programming_lang_ruby,
		programmingLangDartValue: props.listingData.programming_lang_dart,
		programmingLangScalaValue: props.listingData.programming_lang_scala,

		programmingFWFrontEndAngular: props.listingData.programming_fw_frontend_angular,
		programmingFWFrontEndjQuery: props.listingData.programming_fw_frontend_jquery,
		programmingFWFrontEndReact: props.listingData.programming_fw_frontend_react,
		programmingFWFrontEndRuby: props.listingData.programming_fw_frontend_ruby,
		programmingFWFrontEndVuejs: props.listingData.programming_fw_frontend_vuejs,

		programmingFWBackEndASPNet: props.listingData.programming_fw_backend_aspnet,
		programmingFWBackEndDjango: props.listingData.programming_fw_backend_django,
		programmingFWBackEndExpress: props.listingData.programming_fw_backend_express,
		programmingFWBackEndLaravel: props.listingData.programming_fw_backend_laravel,
		programmingFWBackEndNodejs: props.listingData.programming_fw_backend_nodejs,
		programmingFWBackEndSpring: props.listingData.programming_fw_backend_spring,


		sendRequest: 0,
		openSnack: false,
		disabledBtn: false,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchTitleChange":
				draft.titleValue = action.titleChosen;
				break;

			case "catchListingTypeChange":
				draft.listingTypeValue = action.listingTypeChosen;
				break;

			case "catchDescriptionChange":
				draft.descriptionValue = action.descriptionChosen;
				break;

			case "catchPropertyStatusChange":
				draft.propertyStatusValue = action.propertyStatusChosen;
				break;

			case "catchVacanciesChange":
				draft.vacanciesValue = action.vacanciesChosen;
				break;

			case "catchInternshipBachelorChange":
				draft.internshipBachelorValue = action.internshipBachelorChosen;
				break;

			case "catchTotalHoursChange":
				draft.totalHoursValue = action.totalHoursChosen;
				break;

			case "catchProgrammingLangPythonChange":
				draft.programmingLangPythonValue = action.programmingLangPythonChosen;
				break;

			case "catchProgrammingLangJavaChange":
				draft.programmingLangJavaValue = action.programmingLangJavaChosen;
				break;

			case "catchProgrammingLangC1Change":
				draft.programmingLangC1Value = action.programmingLangC1Chosen;
				break;

			case "catchProgrammingLangC2Change":
				draft.programmingLangC2Value = action.programmingLangC2Chosen;
				break;

			case "catchProgrammingLangJavaScriptChange":
				draft.programmingLangJavaScriptValue = action.programmingLangJavaScriptChosen;
				break;



			case "catchProgrammingLangSQLChange":
				draft.programmingLangSQLScriptValue = action.programmingLangSQLScriptChosen;
				break;

			case "catchProgrammingLangPHPChange":
				draft.programmingLangPHPValue = action.programmingLangPHPChosen;
				break;
			
			case "catchProgrammingLangGoChange":
				draft.programmingLangGoValue = action.programmingLangGoChosen;
				break;

			case "catchProgrammingLangKotlinChange":
				draft.programmingLangKotlinValue = action.programmingLangKotlinChosen;
				break;

			case "catchProgrammingLangMATLABChange":
				draft.programmingLangMATLABValue = action.programmingLangMATLABChosen;
				break;
			
			case "catchProgrammingLangSwiftChange":
				draft.programmingLangSwiftValue = action.programmingLangSwiftChosen;
				break;

			case "catchProgrammingLangRustChange":
				draft.programmingLangRustValue = action.programmingLangRustChosen;
				break;
				
			case "catchProgrammingLangRubyChange":
				draft.programmingLangRubyValue = action.programmingLangRubyChosen;
				break;

			case "catchProgrammingLangDartChange":
				draft.programmingLangDartValue = action.programmingLangDartChosen;
				break;
			
			case "catchProgrammingLangScalaChange":
				draft.programmingLangScalaValue = action.programmingLangScalaChosen;
				break;

			case "catchProgrammingFWFrontEndAngularChange":
				draft.programmingFWFrontEndAngularValue = action.programmingFWFrontEndAngularChosen;
				break;

			case "catchProgrammingFWFrontEndjQueryChange":
				draft.programmingFWFrontEndjQueryValue = action.programmingFWFrontEndjQueryChosen;
				break;
				
			case "catchProgrammingFWFrontEndReactChange":
				draft.programmingFWFrontEndReactValue = action.programmingFWFrontEndReactChosen;
				break;

			case "catchProgrammingFWFrontEndRubyChange":
				draft.programmingFWFrontEndRubyValue = action.programmingFWFrontEndRubyChosen;
				break;
			
			case "catchProgrammingFWFrontEndVuejsChange":
				draft.programmingFWFrontEndVuejsValue = action.programmingFWFrontEndVuejsChosen;
				break;

			case "catchProgrammingFWBackEndASPNetChange":
				draft.programmingFWBackEndASPNetValue = action.programmingFWBackEndASPNetChosen;
				break;

			case "catchProgrammingFWBackEndDjangoChange":
				draft.programmingFWBackEndDjangoValue = action.programmingFWBackEndDjangoChosen;
				break;

			case "catchProgrammingFWBackEndExpressChange":
				draft.programmingFWBackEndExpressValue = action.programmingFWBackEndExpressChosen;
				break;
				
			case "catchProgrammingFWBackEndLaravelChange":
				draft.programmingFWBackEndLaravelValue = action.programmingFWBackEndLaravelChosen;
				break;

			case "catchProgrammingFWBackEndNodejsChange":
				draft.programmingFWBackEndNodejsValue = action.programmingFWBackEndNodejsChosen;
				break;
			
			case "catchProgrammingFWBackEndSpringChange":
				draft.programmingFWBackEndSpringValue = action.programmingFWBackEndSpringChosen;
				break;	



			case "changeSendRequest":
				draft.sendRequest = draft.sendRequest + 1;
				break;

			case "openTheSnack":
				draft.openSnack = true;
				break;

			case "disableTheButton":
				draft.disabledBtn = true;
				break;

			case "allowTheButton":
				draft.disabledBtn = false;
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	function FormSubmit(e) {
		e.preventDefault();

		dispatch({ type: "changeSendRequest" });
		dispatch({ type: "disableTheButton" });
	}

	useEffect(() => {
		if (state.sendRequest) {
			async function UpdateProperty() {
				const formData = new FormData();
				if (state.listingTypeValue === "Office") {
					formData.append("title", state.titleValue);
					formData.append("description", state.descriptionValue);
					formData.append("listing_type", state.listingTypeValue);
					formData.append("internship_status", state.propertyStatusValue);
					formData.append("vacancies", state.vacanciesValue);
					formData.append("internship_bachelor", state.internshipBachelorValue);
					formData.append("total_hours", 0);
					formData.append("programming_lang_python", state.programmingLangPythonValue);
					formData.append("programming_lang_java", state.programmingLangJavaValue);
					formData.append("programming_lang_c_1", state.programmingLangC1Value);
					formData.append("programming_lang_c_2", state.programmingLangC2Value);
					formData.append("programming_lang_javascript", state.programmingLangJavaScriptValue);


					formData.append("programming_lang_sql", state.programmingLangSQLValue);
					formData.append("programming_lang_php", state.programmingLangPHPValue);
					formData.append("programming_lang_go", state.programmingLangGoValue);
					formData.append("programming_lang_kotlin", state.programmingLangKotlinValue);
					formData.append("programming_lang_matlab", state.programmingLangMATLABValue);
					formData.append("programming_lang_swift", state.programmingLangSwiftValue);
					formData.append("programming_lang_rust", state.programmingLangRustValue);
					formData.append("programming_lang_ruby", state.programmingLangRubyValue);
					formData.append("programming_lang_dart", state.programmingLangDartValue);
					formData.append("programming_lang_scala", state.programmingLangScalaValue);
	
					formData.append("programming_fw_frontend_angular", state.programmingFWFrontEndAngularValue);
					formData.append("programming_fw_frontend_jquery", state.programmingFWFrontEndjQueryValue);
					formData.append("programming_fw_frontend_react", state.programmingFWFrontEndReactValue);
					formData.append("programming_fw_frontend_ruby", state.programmingFWFrontEndRubyValue);
					formData.append("programming_fw_frontend_vuejs", state.programmingFWFrontEndVuejsValue);
					
					formData.append("programming_fw_backend_aspnet", state.programmingFWBackEndASPNetValue);
					formData.append("programming_fw_backend_django", state.programmingFWBackEndDjangoValue);
					formData.append("programming_fw_backend_express", state.programmingFWBackEndExpressValue);
					formData.append("programming_fw_backend_laravel", state.programmingFWBackEndLaravelValue);
					formData.append("programming_fw_backend_nodejs", state.programmingFWBackEndNodejsValue);
					formData.append("programming_fw_backend_spring", state.programmingFWBackEndSpringValue);


					formData.append("seller", GlobalState.userId);
				} else {
					formData.append("title", state.titleValue);
					formData.append("description", state.descriptionValue);
					formData.append("listing_type", state.listingTypeValue);
					formData.append("internship_status", state.propertyStatusValue);
					formData.append("vacancies", state.vacanciesValue);
					formData.append("internship_bachelor", state.internshipBachelorValue);
					formData.append("total_hours", state.totalHoursValue);
					formData.append("programming_lang_python", state.programmingLangPythonValue);
					formData.append("programming_lang_java", state.programmingLangJavaValue);
					formData.append("programming_lang_c_1", state.programmingLangC1Value);
					formData.append("programming_lang_c_2", state.programmingLangC2Value);
					formData.append("programming_lang_javascript", state.programmingLangJavaScriptValue);


					formData.append("programming_lang_sql", state.programmingLangSQLValue);
					formData.append("programming_lang_php", state.programmingLangPHPValue);
					formData.append("programming_lang_go", state.programmingLangGoValue);
					formData.append("programming_lang_kotlin", state.programmingLangKotlinValue);
					formData.append("programming_lang_matlab", state.programmingLangMATLABValue);
					formData.append("programming_lang_swift", state.programmingLangSwiftValue);
					formData.append("programming_lang_rust", state.programmingLangRustValue);
					formData.append("programming_lang_ruby", state.programmingLangRubyValue);
					formData.append("programming_lang_dart", state.programmingLangDartValue);
					formData.append("programming_lang_scala", state.programmingLangScalaValue);
	
					formData.append("programming_fw_frontend_angular", state.programmingFWFrontEndAngularValue);
					formData.append("programming_fw_frontend_jquery", state.programmingFWFrontEndjQueryValue);
					formData.append("programming_fw_frontend_react", state.programmingFWFrontEndReactValue);
					formData.append("programming_fw_frontend_ruby", state.programmingFWFrontEndRubyValue);
					formData.append("programming_fw_frontend_vuejs", state.programmingFWFrontEndVuejsValue);
					
					formData.append("programming_fw_backend_aspnet", state.programmingFWBackEndASPNetValue);
					formData.append("programming_fw_backend_django", state.programmingFWBackEndDjangoValue);
					formData.append("programming_fw_backend_express", state.programmingFWBackEndExpressValue);
					formData.append("programming_fw_backend_laravel", state.programmingFWBackEndLaravelValue);
					formData.append("programming_fw_backend_nodejs", state.programmingFWBackEndNodejsValue);
					formData.append("programming_fw_backend_spring", state.programmingFWBackEndSpringValue);

					formData.append("seller", GlobalState.userId);
				}

				try {
					const response = await Axios.patch(
						`http://localhost:8000/api/listings/${props.listingData.id}/update/`,
						formData
					);

					dispatch({ type: "openTheSnack" });
				} catch (e) {
					dispatch({ type: "allowTheButton" });
				}
			}
			UpdateProperty();
		}
	}, [state.sendRequest]);

	useEffect(() => {
		if (state.openSnack) {
			setTimeout(() => {
				navigate(0);
			}, 1500);
		}
	}, [state.openSnack]);

	return (
		<div
			style={{
				width: "75%",
				marginLeft: "auto",
				marginRight: "auto",
				marginTop: "3rem",
				border: "5px solid black",
				padding: "3rem",
			}}
		>
			<form onSubmit={FormSubmit}>
				<Grid item container justifyContent="center">
					<Typography variant="h4">UPDATE LISTING</Typography>
				</Grid>

				<Grid item container style={{ marginTop: "1rem" }}>
					<TextField
						id="title"
						label="Title*"
						variant="standard"
						fullWidth
						value={state.titleValue}
						onChange={(e) =>
							dispatch({
								type: "catchTitleChange",
								titleChosen: e.target.value,
							})
						}
					/>
				</Grid>

				<Grid item container justifyContent="space-between">
					<Grid item xs={5} style={{ marginTop: "1rem" }}>
						<TextField
							id="listingType"
							label="Listing Type*"
							variant="standard"
							fullWidth
							value={state.listingTypeValue}
							onChange={(e) =>
								dispatch({
									type: "catchListingTypeChange",
									listingTypeChosen: e.target.value,
								})
							}
							select
							SelectProps={{
								native: true,
							}}
						>
							{listingTypeOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</TextField>
					</Grid>

					<Grid item xs={5} style={{ marginTop: "1rem" }}>
						<TextField
							id="propertyStatus"
							label="Property Status*"
							variant="standard"
							fullWidth
							value={state.propertyStatusValue}
							onChange={(e) =>
								dispatch({
									type: "catchPropertyStatusChange",
									propertyStatusChosen: e.target.value,
								})
							}
							select
							SelectProps={{
								native: true,
							}}
						>
							{propertyStatusOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</TextField>
					</Grid>
				</Grid>

				<Grid item container justifyContent="space-between">
					<Grid item xs={5} style={{ marginTop: "1rem" }}>
						<TextField
							id="internshipBachelor"
							label="Regime de Trabalho"
							variant="standard"
							fullWidth
							value={state.internshipBachelorValue}
							onChange={(e) =>
								dispatch({
									type: "catchInternshipBachelorChange",
									internshipBachelorChosen: e.target.value,
								})
							}
							select
							SelectProps={{
								native: true,
							}}
						>
							{internshipBachelorOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</TextField>
					</Grid>

					<Grid item xs={5} style={{ marginTop: "1rem" }}>
						<TextField
							id="vacancies"
							type="number"
							label="Vagas Disponíveis*"
							variant="standard"
							fullWidth
							value={state.vacanciesValue}
							onChange={(e) =>
								dispatch({
									type: "catchVacanciesChange",
									vacanciesChosen: e.target.value,
								})
							}
						/>
					</Grid>
				</Grid>

				<Grid item xs={5} container style={{ marginTop: "1rem" }}>
					<TextField
						id="totalHours"
						label="Total de horas"
						type="number"
						variant="standard"
						fullWidth
						value={state.totalHoursValue}
						onChange={(e) =>
							dispatch({
								type: "catchTotalHoursChange",
								totalHoursChosen: e.target.value,
							})
						}
					/>
				</Grid>

				<Grid item container style={{ marginTop: "1rem" }}>
					<TextField
						id="description"
						label="Descrição"
						variant="outlined"
						multiline
						rows={6}
						fullWidth
						value={state.descriptionValue}
						onChange={(e) =>
							dispatch({
								type: "catchDescriptionChange",
								descriptionChosen: e.target.value,
							})
						}
					/>
				</Grid>

				<Grid item container justifyContent="space-between">
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangPythonValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangPythonChange",
											programmingLangPythonChosen: e.target.checked,
										})
									}
								/>
							}
							label="Python"
						/>
					</Grid>

					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangJavaValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangJavaChange",
											programmingLangJavaChosen: e.target.checked,
										})
									}
								/>
							}
							label="Java"
						/>
					</Grid>

					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangC1Value}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangC1Change",
											programmingLangC1Chosen: e.target.checked,
										})
									}
								/>
							}
							label="C e C++"
						/>
					</Grid>

					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangC2Value}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangC2Change",
											programmingLangC2Chosen: e.target.checked,
										})
									}
								/>
							}
							label="C#"
						/>
					</Grid>

					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangJavaScriptValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangJavaScriptChange",
											programmingLangJavaScriptChosen: e.target.checked,
										})
									}
								/>
							}
							label="JavaScript"
						/>
					</Grid>
				</Grid>

				<Grid item container justifyContent="space-between">

					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangSQLValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangSQLChange",
											programmingLangSQLChosen: e.target.checked,
										})
									}
								/>
							}
							label="SQL"
						/>
					</Grid>

					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangPHPValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangPHPChange",
											programmingLangPHPChosen: e.target.checked,
										})
									}
								/>
							}
							label="PHP"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangGoValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangGoChange",
											programmingLangGoChosen: e.target.checked,
										})
									}
								/>
							}
							label="Go"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangKotlinValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangKotlinChange",
											programmingLangKotlinChosen: e.target.checked,
										})
									}
								/>
							}
							label="Kotlin"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangMATLABValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangMATLABChange",
											programmingLangMATLABChosen: e.target.checked,
										})
									}
								/>
							}
							label="MATLAB"
						/>
					</Grid>
					</Grid>

					<Grid item container justifyContent="space-between">
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangSwiftValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangSwiftChange",
											programmingLangSwiftChosen: e.target.checked,
										})
									}
								/>
							}
							label="Swift"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangRustValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangRustChange",
											programmingLangRustChosen: e.target.checked,
										})
									}
								/>
							}
							label="Rust"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangRubyValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangRubyChange",
											programmingLangRubyChosen: e.target.checked,
										})
									}
								/>
							}
							label="Ruby"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangDartValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangDartChange",
											programmingLangDartChosen: e.target.checked,
										})
									}
								/>
							}
							label="Dart"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingLangScalaValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingLangScalaChange",
											programmingLangScalaChosen: e.target.checked,
										})
									}
								/>
							}
							label="Scala"
						/>
					</Grid>
					</Grid>

					<Grid item container justifyContent="left" style={{ marginTop: "1rem" }}>
					<Typography variant="h5">Front-End Frameworks</Typography>
					</Grid>

					<Grid item container justifyContent="space-between">
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWFrontEndAngularValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWFrontEndAngularChange",
											programmingFWFrontEndAngularChosen: e.target.checked,
										})
									}
								/>
							}
							label="Angular"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWFrontEndjQueryValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWFrontEndjQueryChange",
											programmingFWFrontEndjQueryChosen: e.target.checked,
										})
									}
								/>
							}
							label="jQuery"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWFrontEndReactValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWFrontEndReactChange",
											programmingFWFrontEndReactChosen: e.target.checked,
										})
									}
								/>
							}
							label="React"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWFrontEndRubyValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWFrontEndRubyChange",
											programmingFWFrontEndRubyChosen: e.target.checked,
										})
									}
								/>
							}
							label="Ruby on Rails"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWFrontEndVuejsValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWFrontEndVuejsChange",
											programmingFWFrontEndVuejsChosen: e.target.checked,
										})
									}
								/>
							}
							label="Vue.js"
						/>
					</Grid>
					</Grid>


					<Grid item container justifyContent="left" style={{ marginTop: "1rem" }}>
					<Typography variant="h5">Back-End Frameworks</Typography>
					</Grid>


					<Grid item container justifyContent="space-between">
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWBackEndASPNetValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWBackEndASPNetChange",
											programmingFWBackEndASPNetChosen: e.target.checked,
										})
									}
								/>
							}
							label="ASP.Net"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWBackEndDjangoValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWBackEndDjangoChange",
											programmingFWBackEndDjangoChosen: e.target.checked,
										})
									}
								/>
							}
							label="Django"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWBackEndExpressValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWBackEndExpressChange",
											programmingFWBackEndExpressChosen: e.target.checked,
										})
									}
								/>
							}
							label="Express"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWBackEndLaravelValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWBackEndLaravelChange",
											programmingFWBackEndLaravelChosen: e.target.checked,
										})
									}
								/>
							}
							label="Laravel"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWBackEndNodejsValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWBackEndNodejsChange",
											programmingFWBackEndNodejsChosen: e.target.checked,
										})
									}
								/>
							}
							label="Node.js"
						/>
					</Grid>
					<Grid item xs={2} style={{ marginTop: "1rem" }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.programmingFWBackEndSpringValue}
									onChange={(e) =>
										dispatch({
											type: "catchProgrammingFWBackEndSpringChange",
											programmingFWBackEndSpringChosen: e.target.checked,
										})
									}
								/>
							}
							label="Spring"
						/>
					</Grid>
				</Grid>

				<Grid
					item
					container
					xs={8}
					style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
				>
					<Button
						variant="contained"
						fullWidth
						type="submit"
						style={{
							backgroundColor: "green",
							color: "white",
							fontSize: "1.1rem",
							marginLeft: "1rem",
							// "&:hover": {
							// 	backgroundColor: "blue",
							// },
						}}
						disabled={state.disabledBtn}
					>
						UPDATE
					</Button>
				</Grid>
			</form>
			<Button variant="contained" onClick={props.closeDialog}>
				CANCEL
			</Button>
			<Snackbar
				open={state.openSnack}
				message="You have successfully updated this listing!"
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
			/>
		</div>
	);
}

export default ListingUpdate;

//falta fazer no backend