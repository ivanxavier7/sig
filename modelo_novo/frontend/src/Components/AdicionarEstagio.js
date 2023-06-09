import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// React Leaflet
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	Polygon,
} from "react-leaflet";

// Contexts
import StateContext from "../Contexts/StateContext";

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

const areaOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Inner London",
		label: "Inner London",
	},
	{
		value: "Outer London",
		label: "Outer London",
	},
];

const innerLondonOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Camden",
		label: "Camden",
	},
	{
		value: "Greenwich",
		label: "Greenwich",
	},
	{
		value: "Hackney",
		label: "Hackney",
	},
	{
		value: "Hammersmith and Fulham",
		label: "Hammersmith and Fulham",
	},
	{
		value: "Islington",
		label: "Islington",
	},
	{
		value: "Kensington and Chelsea",
		label: "Kensington and Chelsea",
	},
	{
		value: "Lambeth",
		label: "Lambeth",
	},
	{
		value: "Lewisham",
		label: "Lewisham",
	},
	{
		value: "Southwark",
		label: "Southwark",
	},
	{
		value: "Tower Hamlets",
		label: "Tower Hamlets",
	},
	{
		value: "Wandsworth",
		label: "Wandsworth",
	},
	{
		value: "Westminster",
		label: "Westminster",
	},
	{
		value: "City of London",
		label: "City of London",
	},
];

const outerLondonOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Agueda",
		label: "Agueda",
	},
	{
		value: "Barnet",
		label: "Barnet",
	},
	{
		value: "Bexley",
		label: "Bexley",
	},
	{
		value: "Brent",
		label: "Brent",
	},
	{
		value: "Bromley",
		label: "Bromley",
	},
	{
		value: "Croydon",
		label: "Croydon",
	},
	{
		value: "Ealing",
		label: "Ealing",
	},
	{
		value: "Enfield",
		label: "Enfield",
	},
	{
		value: "Haringey",
		label: "Haringey",
	},
	{
		value: "Harrow",
		label: "Harrow",
	},
	{
		value: "Havering",
		label: "Havering",
	},
	{
		value: "Hillingdon",
		label: "Hillingdon",
	},
	{
		value: "Hounslow",
		label: "Hounslow",
	},
	{
		value: "Kingston upon Thames",
		label: "Kingston upon Thames",
	},
	{
		value: "Merton",
		label: "Merton",
	},
	{
		value: "Newham",
		label: "Newham",
	},
	{
		value: "Redbridge",
		label: "Redbridge",
	},
	{
		value: "Richmond upon Thames",
		label: "Richmond upon Thames",
	},
	{
		value: "Sutton",
		label: "Sutton",
	},
	{
		value: "Waltham Forest",
		label: "Waltham Forest",
	},
];

const listingTypeOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Curricular",
		label: "Curricular",
	},
	{
		value: "Profissional",
		label: "Profissional",
	},
	{
		value: "Voluntário",
		label: "Voluntário",
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
		value: "Cursos de Especialização",
		label: "Cursos de Especialização",
	},
];


const internshipCoursesCTeSPOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Cibersegurança",
		label: "Cibersegurança",
	},
	{
		value: "Gestão de PME",
		label: "Gestão de PME",
	},
	{
		value: "Instalações Elétricas e Automação",
		label: "Instalações Elétricas e Automação",
	},
	{
		value: "Manutenção Industrial",
		label: "Manutenção Industrial",
	},
	{
		value: "Programação de Sistemas de Informação",
		label: "rogramação de Sistemas de Informação",
	},
	{
		value: "Redes e Sistemas Informáticos",
		label: "Redes e Sistemas Informáticos",
	},
	{
		value: "Tecnologia Mecânica",
		label: "Tecnologia Mecânica",
	},
];

const internshipCoursesLicenciaturaOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Eletrónica e Mecânica Industrial",
		label: "Eletrónica e Mecânica Industrial",
	},
	{
		value: "Gestão Comercial",
		label: "Gestão Comercial",
	},
	{
		value: "Gestão da Qualidade",
		label: "Gestão da Qualidade",
	},
	{
		value: "Gestão Pública",
		label: "Gestão Pública",
	},
	{
		value: "Secretariado e Comunicação Empresarial",
		label: "Secretariado e Comunicação Empresarial",
	},
	{
		value: "Tecnologias da Informação",
		label: "Tecnologias da Informação",
	},
];

const internshipCoursesMestradoOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Assessoria de Direção e Comunicação nas Organizações",
		label: "Assessoria de Direção e Comunicação nas Organizações",
	},
	{
		value: "Gestão Comercial",
		label: "Gestão Comercial",
	},
	{
		value: "Gestão da Qualidade Total",
		label: "Gestão da Qualidade Total",
	},
	{
		value: "Gestão e Negócios Digitais",
		label: "Gestão e Negócios Digitais",
	},
	{
		value: "Informática Aplicada",
		label: "Informática Aplicada",
	},
];

const internshipCoursesCEOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Auditorias de Sistemas Integrados de Gestão",
		label: "Auditorias de Sistemas Integrados de Gestão",
	},
	{
		value: "Dados e Inteligência Artificial",
		label: "Dados e Inteligência Artificial",
	},
	{
		value: "Desenvolvimento de Aplicações Móveis",
		label: "Desenvolvimento de Aplicações Móveis",
	},
	{
		value: "Excelência nas Organizações",
		label: "Excelência nas Organizações",
	},
	{
		value: "Gestão de Negócios de Retalho",
		label: "Gestão de Negócios de Retalho",
	},
];


function AddProperty() {
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

	const initialState = {
		titleValue: "",
		listingTypeValue: "",
		descriptionValue: "",
		areaValue: "",
		boroughValue: "",
		latitudeValue: "",
		longitudeValue: "",
		propertyStatusValue: "",
		vacanciesValue: "",
		internshipBachelorValue: "",


		internshipCoursesCTeSPValue: "",
		internshipCoursesLicenciaturaValue: "",
		internshipCoursesMestradoValue: "",
		internshipCoursesCEValue: "",


		totalHoursValue: "",
		programmingLangPythonValue: false,
		programmingLangJavaValue: false,
		programmingLangC1Value: false,
		programmingLangC2Value: false,
		programmingLangJavaScriptValue: false,
		programmingLangSQLValue: false,
		programmingLangPHPValue: false,
		programmingLangGoValue: false,	
		programmingLangKotlinValue: false,
		programmingLangMATLABValue: false,
		programmingLangSwiftValue: false,
		programmingLangRustValue: false,
		programmingLangRubyValue: false,
		programmingLangDartValue: false,
		programmingLangScalaValue: false,
		programmingFWFrontEndAngularValue: false,
		programmingFWFrontEndjQueryValue: false,
		programmingFWFrontEndReactValue: false,
		programmingFWFrontEndRubyValue: false,
		programmingFWFrontEndVuejsValue: false,
		programmingFWBackEndASPNetValue: false,
		programmingFWBackEndDjangoValue: false,
		programmingFWBackEndExpressValue: false,
		programmingFWBackEndLaravelValue: false,
		programmingFWBackEndNodejsValue: false,
		programmingFWBackEndSpringValue: false,
		picture1Value: "",
		picture2Value: "",
		picture3Value: "",
		picture4Value: "",
		picture5Value: "",
		mapInstance: null,
		markerPosition: {
			lat: "51.505",
			lng: "-0.09",
		},
		uploadedPictures: [],
		sendRequest: 0,
		userProfile: {
			agencyName: "",
			phoneNumber: "",
		},
		openSnack: false,
		disabledBtn: false,
		titleErrors: {
			hasErrors: false,
			errorMessage: "",
		},
		listingTypeErrors: {
			hasErrors: false,
			errorMessage: "",
		},
		propertyStatusErrors: {
			hasErrors: false,
			errorMessage: "",
		},
		vacanciesErrors: {
			hasErrors: false,
			errorMessage: "",
		},
		areaErrors: {
			hasErrors: false,
			errorMessage: "",
		},
		boroughErrors: {
			hasErrors: false,
			errorMessage: "",
		},
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchTitleChange":
				draft.titleValue = action.titleChosen;
				draft.titleErrors.hasErrors = false;
				draft.titleErrors.errorMessage = "";
				break;

			case "catchListingTypeChange":
				draft.listingTypeValue = action.listingTypeChosen;
				draft.listingTypeErrors.hasErrors = false;
				draft.listingTypeErrors.errorMessage = "";
				break;

			case "catchDescriptionChange":
				draft.descriptionValue = action.descriptionChosen;
				break;

			case "catchAreaChange":
				draft.areaValue = action.areaChosen;
				draft.areaErrors.hasErrors = false;
				draft.areaErrors.errorMessage = "";
				break;

			case "catchBoroughChange":
				draft.boroughValue = action.boroughChosen;
				draft.boroughErrors.hasErrors = false;
				draft.boroughErrors.errorMessage = "";
				break;

			case "catchLatitudeChange":
				draft.latitudeValue = action.latitudeChosen;
				break;

			case "catchLongitudeChange":
				draft.longitudeValue = action.longitudeChosen;
				break;

			case "catchPropertyStatusChange":
				draft.propertyStatusValue = action.propertyStatusChosen;
				draft.propertyStatusErrors.hasErrors = false;
				draft.propertyStatusErrors.errorMessage = "";
				break;

			case "catchVacanciesChange":
				draft.vacanciesValue = action.vacanciesChosen;
				draft.vacanciesErrors.hasErrors = false;
				draft.vacanciesErrors.errorMessage = "";
				break;

			case "catchInternshipBachelorChange":
				draft.internshipBachelorValue = action.internshipBachelorChosen;
				break;

			case "catchInternshipCoursesCTeSPChange":
				draft.internshipCoursesCTeSPValue = action.internshipCoursesCTeSPChosen;
				break;

			case "catchInternshipCoursesLicenciaturaChange":
				draft.internshipCoursesLicenciaturaValue = action.internshipCoursesLicenciaturaChosen;
				break;

			case "catchInternshipCoursesMestradoChange":
				draft.internshipCoursesMestradoValue = action.internshipCoursesMestradoChosen;
				break;

			case "catchInternshipCoursesCEChange":
				draft.internshipCoursesCEValue = action.internshipCoursesCEChosen;
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
				draft.programmingLangSQLValue = action.programmingLangSQLChosen;
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

			case "catchPicture1Change":
				draft.picture1Value = action.picture1Chosen;
				break;

			case "catchPicture2Change":
				draft.picture2Value = action.picture2Chosen;
				break;

			case "catchPicture3Change":
				draft.picture3Value = action.picture3Chosen;
				break;

			case "catchPicture4Change":
				draft.picture4Value = action.picture4Chosen;
				break;

			case "catchPicture5Change":
				draft.picture5Value = action.picture5Chosen;
				break;

			case "getMap":
				draft.mapInstance = action.mapData;
				break;

			case "changeMarkerPosition":
				draft.markerPosition.lat = action.changeLatitude;
				draft.markerPosition.lng = action.changeLongitude;
				draft.latitudeValue = "";
				draft.longitudeValue = "";
				break;

			case "catchUploadedPictures":
				draft.uploadedPictures = action.picturesChosen;
				break;

			case "changeSendRequest":
				draft.sendRequest = draft.sendRequest + 1;
				break;

			case "catchUserProfileInfo":
				draft.userProfile.agencyName = action.profileObject.agency_name;
				draft.userProfile.phoneNumber = action.profileObject.phone_number;
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

			case "catchTitleErrors":
				if (action.titleChosen.length === 0) {
					draft.titleErrors.hasErrors = true;
					draft.titleErrors.errorMessage = "Este campo não deve estar vazio";
				}
				break;

			case "catchListingTypeErrors":
				if (action.listingTypeChosen.length === 0) {
					draft.listingTypeErrors.hasErrors = true;
					draft.listingTypeErrors.errorMessage = "Este campo não deve estar vazio";
				}
				break;

			case "catchPropertyStatusErrors":
				if (action.propertyStatusChosen.length === 0) {
					draft.propertyStatusErrors.hasErrors = true;
					draft.propertyStatusErrors.errorMessage =
					"Este campo não deve estar vazio";
				}
				break;

			case "catchVacanciesErrors":
				if (action.vacanciesChosen.length === 0 || action.vacanciesChosen.value <= 99) {
					draft.vacanciesErrors.hasErrors = true;
					draft.vacanciesErrors.errorMessage = "Este campo não deve estar vazio ou passar as 99 vagas";
				}
				break;

			case "catchAreaErrors":
				if (action.areaChosen.length === 0) {
					draft.areaErrors.hasErrors = true;
					draft.areaErrors.errorMessage = "Este campo não deve estar vazio";
				}
				break;

			case "catchBoroughErrors":
				if (action.boroughChosen.length === 0) {
					draft.boroughErrors.hasErrors = true;
					draft.boroughErrors.errorMessage = "Este campo não deve estar vazio";
				}
				break;

			case "emptyTitle":
				draft.titleErrors.hasErrors = true;
				draft.titleErrors.errorMessage = "Este campo não deve estar vazio";
				break;

			case "emptyListingType":
				draft.listingTypeErrors.hasErrors = true;
				draft.listingTypeErrors.errorMessage = "Este campo não deve estar vazio";
				break;

			case "emptyPropertyStatus":
				draft.propertyStatusErrors.hasErrors = true;
				draft.propertyStatusErrors.errorMessage =
				"Este campo não deve estar vazio";
				break;

			case "emptyVacancies":
				draft.vacanciesErrors.hasErrors = true;
				draft.vacanciesErrors.errorMessage = "Este campo não deve estar vazio";
				break;

			case "emptyArea":
				draft.areaErrors.hasErrors = true;
				draft.areaErrors.errorMessage = "Este campo não deve estar vazio";
				break;

			case "emptyBoroug":
				draft.borougErrors.hasErrors = true;
				draft.borougErrors.errorMessage = "Este campo não deve estar vazio";
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	function TheMapComponent() {
		const map = useMap();
		dispatch({ type: "getMap", mapData: map });
		return null;
	}

	// Use effect to change the map view depending on chosen borough
	// Changing the map view depending on the choen borough

	useEffect(() => {
		if (state.boroughValue === "Camden") {
			state.mapInstance.setView([51.54103467179952, -0.14870897037846917], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.54103467179952,
				changeLongitude: -0.14870897037846917,
			});
		} else if (state.boroughValue === "Greenwich") {
			state.mapInstance.setView([51.486316313935134, 0.005925763550159742], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.486316313935134,
				changeLongitude: 0.005925763550159742,
			});
		} else if (state.boroughValue === "Hackney") {
			state.mapInstance.setView([51.55421119118178, -0.061054618357071246], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.55421119118178,
				changeLongitude: -0.061054618357071246,
			});
		} else if (state.boroughValue === "Hammersmith and Fulham") {
			state.mapInstance.setView([51.496961673854216, -0.22495912738555046], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.496961673854216,
				changeLongitude: -0.22495912738555046,
			});
		} else if (state.boroughValue === "Islington") {
			state.mapInstance.setView([51.54974373783584, -0.10746608414711818], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.54974373783584,
				changeLongitude: -0.10746608414711818,
			});
		} else if (state.boroughValue === "Kensington and Chelsea") {
			state.mapInstance.setView([51.49779579272461, -0.1908227388030137], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.49779579272461,
				changeLongitude: -0.1908227388030137,
			});
		} else if (state.boroughValue === "Lambeth") {
			state.mapInstance.setView([51.457598293463874, -0.12030697867735651], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.457598293463874,
				changeLongitude: -0.12030697867735651,
			});
		} else if (state.boroughValue === "Lewisham") {
			state.mapInstance.setView([51.45263474786279, -0.017657579903930083], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.45263474786279,
				changeLongitude: -0.017657579903930083,
			});
		} else if (state.boroughValue === "Southwark") {
			state.mapInstance.setView([51.47281414549159, -0.07657080658293915], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.47281414549159,
				changeLongitude: -0.07657080658293915,
			});
		} else if (state.boroughValue === "Tower Hamlets") {
			state.mapInstance.setView([51.52222760075287, -0.03427379217816716], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.52222760075287,
				changeLongitude: -0.03427379217816716,
			});
		} else if (state.boroughValue === "Wandsworth") {
			state.mapInstance.setView([51.45221859319854, -0.1910578642162312], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.45221859319854,
				changeLongitude: -0.1910578642162312,
			});
		} else if (state.boroughValue === "Westminster") {
			state.mapInstance.setView([51.51424692365236, -0.1557886924596714], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.51424692365236,
				changeLongitude: -0.1557886924596714,
			});
		} else if (state.boroughValue === "City of London") {
			state.mapInstance.setView([51.51464652712437, -0.09207257068971077], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.51464652712437,
				changeLongitude: -0.09207257068971077,
			});
		} else if (state.boroughValue === "Agueda") {
      state.mapInstance.setView([40.585990757000125, -8.395834105612362], 12);
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 40.585990757000125,
        changeLongitude: -8.395834105612362,
      });
		} else if (state.boroughValue === "Barnet") {
			state.mapInstance.setView([51.61505810569654, -0.20104146847921367], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.61505810569654,
				changeLongitude: -0.20104146847921367,
			});
		} else if (state.boroughValue === "Bexley") {
			state.mapInstance.setView([51.45784336604241, 0.1386755093498764], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.45784336604241,
				changeLongitude: 0.1386755093498764,
			});
		} else if (state.boroughValue === "Brent") {
			state.mapInstance.setView([51.55847917911348, -0.2623697479848262], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.55847917911348,
				changeLongitude: -0.2623697479848262,
			});
		} else if (state.boroughValue === "Bromley") {
			state.mapInstance.setView([51.37998089785619, 0.056091833685512606], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.37998089785619,
				changeLongitude: 0.056091833685512606,
			});
		} else if (state.boroughValue === "Croydon") {
			state.mapInstance.setView([51.36613815034951, -0.08597242883896719], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.36613815034951,
				changeLongitude: -0.08597242883896719,
			});
		} else if (state.boroughValue === "Ealing") {
			state.mapInstance.setView([51.52350664933499, -0.33384540332179463], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.52350664933499,
				changeLongitude: -0.33384540332179463,
			});
		} else if (state.boroughValue === "Enfield") {
			state.mapInstance.setView([51.650718869158275, -0.07999628038008409], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.650718869158275,
				changeLongitude: -0.07999628038008409,
			});
		} else if (state.boroughValue === "Haringey") {
			state.mapInstance.setView([51.591214467057085, -0.10319530898095737], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.591214467057085,
				changeLongitude: -0.10319530898095737,
			});
		} else if (state.boroughValue === "Harrow") {
			state.mapInstance.setView([51.60218606442213, -0.33540294600548437], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.60218606442213,
				changeLongitude: -0.33540294600548437,
			});
		} else if (state.boroughValue === "Havering") {
			state.mapInstance.setView([51.57230623503768, 0.2256095005492423], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.57230623503768,
				changeLongitude: 0.2256095005492423,
			});
		} else if (state.boroughValue === "Hillingdon") {
			state.mapInstance.setView([51.5430033964411, -0.4435905982156584], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.5430033964411,
				changeLongitude: -0.4435905982156584,
			});
		} else if (state.boroughValue === "Hounslow") {
			state.mapInstance.setView([51.475988836438525, -0.3660060903075389], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.475988836438525,
				changeLongitude: -0.3660060903075389,
			});
		} else if (state.boroughValue === "Kingston upon Thames") {
			state.mapInstance.setView([51.39401320084246, -0.2841003136670212], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.39401320084246,
				changeLongitude: -0.2841003136670212,
			});
		} else if (state.boroughValue === "Merton") {
			state.mapInstance.setView([51.41148120353897, -0.18805584151013174], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.41148120353897,
				changeLongitude: -0.18805584151013174,
			});
		} else if (state.boroughValue === "Newham") {
			state.mapInstance.setView([51.533282275935306, 0.031692014878610064], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.533282275935306,
				changeLongitude: 0.031692014878610064,
			});
		} else if (state.boroughValue === "Redbridge") {
			state.mapInstance.setView([51.585885574074965, 0.07764760021283491], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.585885574074965,
				changeLongitude: 0.07764760021283491,
			});
		} else if (state.boroughValue === "Richmond upon Thames") {
			state.mapInstance.setView([51.450368976651696, -0.30801386088548505], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.450368976651696,
				changeLongitude: -0.30801386088548505,
			});
		} else if (state.boroughValue === "Sutton") {
			state.mapInstance.setView([51.363672040828504, -0.1702200806863363], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.363672040828504,
				changeLongitude: -0.1702200806863363,
			});
		} else if (state.boroughValue === "Waltham Forest") {
			state.mapInstance.setView([51.59466635701797, -0.012215840493378892], 12);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.59466635701797,
				changeLongitude: -0.012215840493378892,
			});
		}
	}, [state.boroughValue]);

	// Borough display function

	function BoroughDisplay() {
		if (state.boroughValue === "Camden") {
			return <Polygon positions={Camden} />;
		} else if (state.boroughValue === "Greenwich") {
			return <Polygon positions={Greenwich} />;
		} else if (state.boroughValue === "Hackney") {
			return <Polygon positions={Hackney} />;
		} else if (state.boroughValue === "Hammersmith and Fulham") {
			return <Polygon positions={Hammersmith} />;
		} else if (state.boroughValue === "Islington") {
			return <Polygon positions={Islington} />;
		} else if (state.boroughValue === "Kensington and Chelsea") {
			return <Polygon positions={Kensington} />;
		} else if (state.boroughValue === "Lambeth") {
			return <Polygon positions={Lambeth} />;
		} else if (state.boroughValue === "Lewisham") {
			return <Polygon positions={Lewisham} />;
		} else if (state.boroughValue === "Southwark") {
			return <Polygon positions={Southwark} />;
		} else if (state.boroughValue === "Tower Hamlets") {
			return <Polygon positions={Hamlets} />;
		} else if (state.boroughValue === "Wandsworth") {
			return <Polygon positions={Wandsworth} />;
		} else if (state.boroughValue === "Westminster") {
			return <Polygon positions={Westminster} />;
		} else if (state.boroughValue === "City of London") {
			return <Polygon positions={City_of_London} />;
		} else if (state.boroughValue === "Agueda") {
			return <Polygon positions={Agueda} />;
		} else if (state.boroughValue === "Barnet") {
			return <Polygon positions={Barnet} />;
		} else if (state.boroughValue === "Bexley") {
			return <Polygon positions={Bexley} />;
		} else if (state.boroughValue === "Brent") {
			return <Polygon positions={Brent} />;
		} else if (state.boroughValue === "Bromley") {
			return <Polygon positions={Bromley} />;
		} else if (state.boroughValue === "Croydon") {
			return <Polygon positions={Croydon} />;
		} else if (state.boroughValue === "Ealing") {
			return <Polygon positions={Ealing} />;
		} else if (state.boroughValue === "Enfield") {
			return <Polygon positions={Enfield} />;
		} else if (state.boroughValue === "Haringey") {
			return <Polygon positions={Haringey} />;
		} else if (state.boroughValue === "Harrow") {
			return <Polygon positions={Harrow} />;
		} else if (state.boroughValue === "Havering") {
			return <Polygon positions={Havering} />;
		} else if (state.boroughValue === "Hillingdon") {
			return <Polygon positions={Hillingdon} />;
		} else if (state.boroughValue === "Hounslow") {
			return <Polygon positions={Hounslow} />;
		} else if (state.boroughValue === "Kingston upon Thames") {
			return <Polygon positions={Kingston} />;
		} else if (state.boroughValue === "Merton") {
			return <Polygon positions={Merton} />;
		} else if (state.boroughValue === "Newham") {
			return <Polygon positions={Newham} />;
		} else if (state.boroughValue === "Redbridge") {
			return <Polygon positions={Redbridge} />;
		} else if (state.boroughValue === "Richmond upon Thames") {
			return <Polygon positions={Richmond} />;
		} else if (state.boroughValue === "Sutton") {
			return <Polygon positions={Sutton} />;
		} else if (state.boroughValue === "Waltham Forest") {
			return <Polygon positions={Waltham} />;
		}
	}

	// Draggable marker

	const markerRef = useRef(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				dispatch({
					type: "catchLatitudeChange",
					latitudeChosen: marker.getLatLng().lat,
				});
				dispatch({
					type: "catchLongitudeChange",
					longitudeChosen: marker.getLatLng().lng,
				});
			},
		}),
		[]
	);

	// Catching picture fields
	useEffect(() => {
		if (state.uploadedPictures[0]) {
			dispatch({
				type: "catchPicture1Change",
				picture1Chosen: state.uploadedPictures[0],
			});
		}
	}, [state.uploadedPictures[0]]);

	useEffect(() => {
		if (state.uploadedPictures[1]) {
			dispatch({
				type: "catchPicture2Change",
				picture2Chosen: state.uploadedPictures[1],
			});
		}
	}, [state.uploadedPictures[1]]);

	useEffect(() => {
		if (state.uploadedPictures[2]) {
			dispatch({
				type: "catchPicture3Change",
				picture3Chosen: state.uploadedPictures[2],
			});
		}
	}, [state.uploadedPictures[2]]);

	useEffect(() => {
		if (state.uploadedPictures[3]) {
			dispatch({
				type: "catchPicture4Change",
				picture4Chosen: state.uploadedPictures[3],
			});
		}
	}, [state.uploadedPictures[3]]);

	useEffect(() => {
		if (state.uploadedPictures[4]) {
			dispatch({
				type: "catchPicture5Change",
				picture5Chosen: state.uploadedPictures[4],
			});
		}
	}, [state.uploadedPictures[4]]);

	// request to get profile info
	useEffect(() => {
		async function GetProfileInfo() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/profiles/${GlobalState.userId}/`
				);

				dispatch({
					type: "catchUserProfileInfo",
					profileObject: response.data,
				});
			} catch (e) {}
		}
		GetProfileInfo();
	}, []);

	function FormSubmit(e) {
		e.preventDefault();

		if (
			!state.titleErrors.hasErrors &&
			!state.listingTypeErrors.hasErrors &&
			!state.propertyStatusErrors.hasErrors &&
			!state.vacanciesErrors.hasErrors &&
			!state.areaErrors.hasErrors &&
			!state.boroughErrors.hasErrors &&
			state.latitudeValue &&
			state.longitudeValue
		) {
			dispatch({ type: "changeSendRequest" });
			dispatch({ type: "disableTheButton" });
		} else if (state.titleValue === "") {
			dispatch({ type: "emptyTitle" });
			window.scrollTo(0, 0);
		} else if (state.listingTypeValue === "") {
			dispatch({ type: "emptyListingType" });
			window.scrollTo(0, 0);
		} else if (state.propertyStatusValue === "") {
			dispatch({ type: "emptyPropertyStatus" });
			window.scrollTo(0, 0);
		} else if (state.vacanciesValue === "") {
			dispatch({ type: "emptyVacancies" });
			window.scrollTo(0, 0);
		} else if (state.areaValue === "") {
			dispatch({ type: "emptyArea" });
			window.scrollTo(0, 0);
		} else if (state.boroughValue === "") {
			dispatch({ type: "emptyBorough" });
			window.scrollTo(0, 0);
		}
	}

	useEffect(() => {
		if (state.sendRequest) {
			async function AddProperty() {
				const formData = new FormData();
				formData.append("title", state.titleValue);
				formData.append("description", state.descriptionValue);
				formData.append("area", state.areaValue);
				formData.append("borough", state.boroughValue);
				formData.append("listing_type", state.listingTypeValue);
				formData.append("internship_status", state.propertyStatusValue);
				formData.append("vacancies", state.vacanciesValue);
				formData.append("internship_bachelor", state.internshipBachelorValue);
				formData.append("internship_courses_ctesp", state.internshipCoursesCTeSPValue);
				formData.append("internship_courses_licenciatura", state.internshipCoursesLicenciaturaValue);
				formData.append("internship_courses_mestrado", state.internshipCoursesMestradoValue);
				formData.append("internship_courses_ce", state.internshipCoursesCEValue);
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
				formData.append("latitude", state.latitudeValue);
				formData.append("longitude", state.longitudeValue);
				formData.append("picture1", state.picture1Value);
				formData.append("picture2", state.picture2Value);
				formData.append("picture3", state.picture3Value);
				formData.append("picture4", state.picture4Value);
				formData.append("picture5", state.picture5Value);
				formData.append("seller", GlobalState.userId);

				try {
					const response = await Axios.post(
						"http://localhost:8000/api/listings/create/",
						formData
					);

					dispatch({ type: "openTheSnack" });
				} catch (e) {
					dispatch({ type: "allowTheButton" });
				}
			}
			AddProperty();
		}
	}, [state.sendRequest]);

	function SubmitButtonDisplay() {
		if (
			GlobalState.userIsLogged &&
			state.userProfile.agencyName !== null &&
			state.userProfile.agencyName !== "" &&
			state.userProfile.phoneNumber !== null &&
			state.userProfile.phoneNumber !== ""
		) {
			return (
				<Button
					variant="contained"
					fullWidth
					type="submit"
					style={{
						backgroundColor: "green",
						color: "white",
						fontSize: "1.1rem",
						marginLeft: "1rem",
						"&:hover": {
							backgroundColor: "blue",
						},
					}}
					disabled={state.disabledBtn}
				>
					SUBMIT
				</Button>
			);
		} else if (
			GlobalState.userIsLogged &&
			(state.userProfile.agencyName === null ||
				state.userProfile.agencyName === "" ||
				state.userProfile.phoneNumber === null ||
				state.userProfile.phoneNumber === "")
		) {
			return (
				<Button
					variant="outlined"
					fullWidth
					style={{
						backgroundColor: "green",
						color: "white",
						fontSize: "1.1rem",
						marginLeft: "1rem",
						"&:hover": {
							backgroundColor: "blue",
						},
					}}
					onClick={() => navigate("/profile")}
				>
					COMPLETE YOUR PROFILE TO ADD A PROPERTY
				</Button>
			);
		} else if (!GlobalState.userIsLogged) {
			return (
				<Button
					variant="outlined"
					fullWidth
					onClick={() => navigate("/login")}
					style={{
						backgroundColor: "green",
						color: "white",
						fontSize: "1.1rem",
						marginLeft: "1rem",
						"&:hover": {
							backgroundColor: "blue",
						},
					}}
				>
					SIGN IN TO ADD A PROPERTY
				</Button>
			);
		}
	}

	useEffect(() => {
		if (state.openSnack) {
			setTimeout(() => {
				navigate("/listings");
			}, 1500);
		}
	}, [state.openSnack]);

	if (
		GlobalState.userIsLogged &&
		state.userProfile.agencyName !== null &&
		state.userProfile.agencyName !== "" &&
		state.userProfile.phoneNumber !== null &&
		state.userProfile.phoneNumber !== ""
	) {

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
						<Typography variant="h4">Adicionar Proposta de Estágio	</Typography>
					</Grid>

					<Grid item container style={{ marginTop: "1rem" }}>
						<TextField
							id="title"
							label="Título da proposta*"
							variant="standard"
							fullWidth
							value={state.titleValue}
							onChange={(e) =>
								dispatch({
									type: "catchTitleChange",
									titleChosen: e.target.value,
								})
							}
							onBlur={(e) =>
								dispatch({
									type: "catchTitleErrors",
									titleChosen: e.target.value,
								})
							}
							error={state.titleErrors.hasErrors ? true : false}
							helperText={state.titleErrors.errorMessage}
						/>
					</Grid>

					<Grid item container justifyContent="space-between">
						<Grid item xs={5} style={{ marginTop: "1rem" }}>
							<TextField
								id="listingType"
								label="Tipo de Estágio*"
								variant="standard"
								fullWidth
								value={state.listingTypeValue}
								onChange={(e) =>
									dispatch({
										type: "catchListingTypeChange",
										listingTypeChosen: e.target.value,
									})
								}
								onBlur={(e) =>
									dispatch({
										type: "catchListingTypeErrors",
										listingTypeChosen: e.target.value,
									})
								}
								error={state.listingTypeErrors.hasErrors ? true : false}
								helperText={state.listingTypeErrors.errorMessage}
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
								label="Modelo de Trabalho*"
								variant="standard"
								fullWidth
								value={state.propertyStatusValue}
								onChange={(e) =>
									dispatch({
										type: "catchPropertyStatusChange",
										propertyStatusChosen: e.target.value,
									})
								}
								onBlur={(e) =>
									dispatch({
										type: "catchPropertyStatusErrors",
										propertyStatusChosen: e.target.value,
									})
								}
								error={state.propertyStatusErrors.hasErrors ? true : false}
								helperText={state.propertyStatusErrors.errorMessage}
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
								label="Grau Académico"
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

							{state.internshipBachelorValue === "CTeSP" 
							? 	<TextField
									id="internshipCoursesCTeSP"
									label="Cursos CTeSP"
									variant="standard"
									fullWidth
									value={state.internshipCoursesCTeSPValue}
									onChange={(e) =>
										dispatch({
											type: "catchInternshipCoursesCTeSPChange",
											internshipCoursesCTeSPChosen: e.target.value,
										})
									}
									select
									SelectProps={{
										native: true,
									}}
									>
									{internshipCoursesCTeSPOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</TextField>

							: state.internshipBachelorValue === "Licenciatura"
								? <TextField
									id="internshipCoursesLicenciatura"
									label="Cursos de Licenciatura"
									variant="standard"
									fullWidth
									value={state.internshipCoursesLicenciaturaValue}
									onChange={(e) =>
										dispatch({
											type: "catchInternshipCoursesLicenciaturaChange",
											internshipCoursesLicenciaturaChosen: e.target.value,
										})
									}
									select
									SelectProps={{
										native: true,
									}}
									>
									{internshipCoursesLicenciaturaOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</TextField>

							: state.internshipBachelorValue === "Mestrado"
							? <TextField
								id="internshipCoursesMestrado"
								label="Cursos de Mestrado"
								variant="standard"
								fullWidth
								value={state.internshipCoursesMestradoValue}
								onChange={(e) =>
									dispatch({
										type: "catchInternshipCoursesMestradoChange",
										internshipCoursesMestradoChosen: e.target.value,
									})
								}
								select
								SelectProps={{
									native: true,
								}}
								>
								{internshipCoursesMestradoOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField>
							
							: state.internshipBachelorValue === "Cursos de Especialização"
							? <TextField
								id="internshipCoursesCE"
								label="Cursos de Especialização"
								variant="standard"
								fullWidth
								value={state.internshipCoursesCEValue}
								onChange={(e) =>
									dispatch({
										type: "catchInternshipCoursesCEChange",
										internshipCoursesCEChosen: e.target.value,
									})
								}
								select
								SelectProps={{
									native: true,
								}}
								>
								{internshipCoursesCEOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField>
							: <TextField
								disabled
								id="internshipCoursesDefault"
								label="Curso"
								variant="standard"
								fullWidth
								defaultValue="Selecione o Grau Académico primeiro"
								>
							</TextField>
							}
						</Grid>
					</Grid>

					<Grid item container justifyContent="space-between">
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
									onBlur={(e) =>
										dispatch({
											type: "catchVacanciesErrors",
											vacanciesChosen: e.target.value,
										})
									}
									error={state.vacanciesErrors.hasErrors ? true : false}
									helperText={state.vacanciesErrors.errorMessage}
								/>
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

					<Grid item container justifyContent="left" style={{ marginTop: "1rem" }}>
						<Typography variant="h5">Linguagens de Programação</Typography>
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

					<Grid item container justifyContent="left" style={{ marginTop: "1rem" }}>
						<Typography variant="h5">Localização</Typography>
					</Grid>

					<Grid item container justifyContent="space-between">
						<Grid item xs={5} style={{ marginTop: "1rem" }}>
							<TextField
								id="area"
								label="Area*"
								variant="standard"
								fullWidth
								value={state.areaValue}
								onChange={(e) =>
									dispatch({
										type: "catchAreaChange",
										areaChosen: e.target.value,
									})
								}
								onBlur={(e) =>
									dispatch({
										type: "catchAreaErrors",
										areaChosen: e.target.value,
									})
								}
								error={state.areaErrors.hasErrors ? true : false}
								helperText={state.areaErrors.errorMessage}
								select
								SelectProps={{
									native: true,
								}}
							>
								{areaOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField>
						</Grid>

						<Grid item xs={5} style={{ marginTop: "1rem" }}>
							<TextField
								id="borough"
								label="Borough*"
								variant="standard"
								fullWidth
								value={state.boroughValue}
								onChange={(e) =>
									dispatch({
										type: "catchBoroughChange",
										boroughChosen: e.target.value,
									})
								}
								onBlur={(e) =>
									dispatch({
										type: "catchBoroughErrors",
										boroughChosen: e.target.value,
									})
								}
								error={state.boroughErrors.hasErrors ? true : false}
								helperText={state.boroughErrors.errorMessage}
								select
								SelectProps={{
									native: true,
								}}
							>
								{state.areaValue === "Inner London"
									? innerLondonOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
									))
									: ""}

								{state.areaValue === "Outer London"
									? outerLondonOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
									))
									: ""}
							</TextField>
						</Grid>
					</Grid>

					{/* Map */}
					<Grid item style={{ marginTop: "1rem" }}>
						{state.latitudeValue && state.longitudeValue ? (
							<Alert severity="success">
								You property is located @ {state.latitudeValue},{" "}
								{state.longitudeValue}
							</Alert>
						) : (
							<Alert severity="warning">
								Locate your property on the map before submitting this form
							</Alert>
						)}
					</Grid>
					<Grid item container style={{ height: "35rem", marginTop: "1rem" }}>
						<MapContainer
							center={[51.505, -0.09]}
							zoom={14}
							scrollWheelZoom={true}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>

							<TheMapComponent />
							{BoroughDisplay()}
							<Marker
								draggable
								eventHandlers={eventHandlers}
								position={state.markerPosition}
								ref={markerRef}
							></Marker>
						</MapContainer>
					</Grid>

					<Grid
						item
						container
						xs={6}
						style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
					>
						<Button
							variant="contained"
							component="label"
							fullWidth
							style={{
								backgroundColor: "blue",
								color: "white",
								fontSize: "0.8rem",
								border: "1px solid black",
								marginLeft: "1rem",
							}}
						>
							UPLOAD PICTURES (MAX 5)
							<input
								type="file"
								multiple
								accept="image/png, image/gif, image/jpeg"
								hidden
								onChange={(e) =>
									dispatch({
										type: "catchUploadedPictures",
										picturesChosen: e.target.files,
									})
								}
							/>
						</Button>
					</Grid>

					<Grid item container>
						<ul>
							{state.picture1Value ? <li>{state.picture1Value.name}</li> : ""}
							{state.picture2Value ? <li>{state.picture2Value.name}</li> : ""}
							{state.picture3Value ? <li>{state.picture3Value.name}</li> : ""}
							{state.picture4Value ? <li>{state.picture4Value.name}</li> : ""}
							{state.picture5Value ? <li>{state.picture5Value.name}</li> : ""}
						</ul>
					</Grid>

					<Grid
						item
						container
						xs={8}
						style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
					>
						{SubmitButtonDisplay()}
					</Grid>
				</form>

				<Snackbar
					open={state.openSnack}
					message="You have successfully added your property!"
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
				/>
			</div>
		);
	} else if (
		GlobalState.userIsLogged &&
		(state.userProfile.agencyName === null ||
			state.userProfile.agencyName === "" ||
			state.userProfile.phoneNumber === null ||
			state.userProfile.phoneNumber === "")
	) {
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
				<Button
					variant="outlined"
					fullWidth
					style={{
						backgroundColor: "green",
						color: "white",
						fontSize: "1.1rem",
						marginLeft: "1rem",
						"&:hover": {
							backgroundColor: "blue",
						},
					}}
					onClick={() => navigate("/profile")}
				>
					COMPLETE YOUR PROFILE TO ADD A PROPERTY
				</Button>
			</div>
		);
	} else if (!GlobalState.userIsLogged) {
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
				<Button
					variant="outlined"
					fullWidth
					onClick={() => navigate("/login")}
					style={{
						backgroundColor: "green",
						color: "white",
						fontSize: "1.1rem",
						marginLeft: "1rem",
						"&:hover": {
							backgroundColor: "blue",
						},
					}}
				>
					SIGN IN TO ADD A PROPERTY
				</Button>
			</div>
		);
	}
}

export default AddProperty;
