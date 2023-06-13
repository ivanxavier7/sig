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
import Aveiro from "./Assets/Boroughs/Aveiro";
import Agueda from "./Assets/Boroughs/Agueda";
import Espinho from "./Assets/Boroughs/Espinho";
import Vale_de_Cambra from "./Assets/Boroughs/Vale_de_Cambra";
import Anadia from "./Assets/Boroughs/Anadia";
import Ílhavo from "./Assets/Boroughs/Ílhavo";
import Castelo_de_Paiva from "./Assets/Boroughs/Castelo_de_Paiva";
import Oliveira_de_Azeméis from "./Assets/Boroughs/Oliveira_de_Azeméis";
import Murtosa from "./Assets/Boroughs/Murtosa";
import Albergaria_a_Velha from "./Assets/Boroughs/Albergaria_a_Velha";
import Estarreja from "./Assets/Boroughs/Estarreja";
import Ovar from "./Assets/Boroughs/Ovar";
import Mealhada from "./Assets/Boroughs/Mealhada";
import Santa_Maria_da_Feira from "./Assets/Boroughs/Santa_Maria_da_Feira";
import Arouca from "./Assets/Boroughs/Arouca";
import Oliveira_do_Bairro from "./Assets/Boroughs/Oliveira_do_Bairro";
import Vagos from "./Assets/Boroughs/Vagos";
import São_João_da_Madeira from "./Assets/Boroughs/São_João_da_Madeira";
import Sever_do_Vouga from "./Assets/Boroughs/Sever_do_Vouga";
import Coimbra from "./Assets/Boroughs/Coimbra";
import Castelo_Branco from "./Assets/Boroughs/Castelo_Branco";
import Guarda from "./Assets/Boroughs/Guarda";
import Porto from "./Assets/Boroughs/Porto";
import Bragança from "./Assets/Boroughs/Bragança";
import Braga from "./Assets/Boroughs/Braga";
import Viana_do_Castelo from "./Assets/Boroughs/Viana_do_Castelo";
import Vila_Real from "./Assets/Boroughs/Vila_Real";
import Viseu from "./Assets/Boroughs/Viseu";
import Santarém from "./Assets/Boroughs/Santarém";
import Portalegre from "./Assets/Boroughs/Portalegre";
import Lisboa from "./Assets/Boroughs/Lisboa";
import Leiria from "./Assets/Boroughs/Leiria";

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
		value: "Aveiro",
		label: "Aveiro",
	},
	{
		value: "Outros Distritos",
		label: "Outros Distritos",
	},
];

const aveiroOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Aveiro",
		label: "Aveiro",
	},
	{
		value: "Agueda",
		label: "Agueda",
	},
	{
		value: "Espinho",
		label: "Espinho",
	},
	{
		value: "Vale de Cambra",
		label: "Vale de Cambra",
	},
	{
		value: "Anadia",
		label: "Anadia",
	},
	{
		value: "Ílhavo",
		label: "Ílhavo",
	},
	{
		value: "Castelo de Paiva",
		label: "Castelo de Paiva",
	},
	{
		value: "Oliveira de Azeméis",
		label: "Oliveira de Azeméis",
	},
	{
		value: "Murtosa",
		label: "Murtosa",
	},
	{
		value: "Albergaria a Velha",
		label: "Albergaria a Velha",
	},
	{
		value: "Estarreja",
		label: "Estarreja",
	},
	{
		value: "Ovar",
		label: "Ovar",
	},
	{
		value: "Mealhada",
		label: "Mealhada",
	},
	{
		value: "Santa Maria da Feira",
		label: "Santa Maria da Feira",
	},
	{
		value: "Arouca",
		label: "Arouca",
	},
	{
		value: "Oliveira do Bairro",
		label: "Oliveira do Bairro",
	},
	{
		value: "Vagos",
		label: "Vagos",
	},
	{
		value: "Sever do Vouga",
		label: "Sever do Vouga",
	},
	{
		value: "São João da Madeira",
		label: "São João da Madeira",
	},
];

const outrosDistritosOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Coimbra",
		label: "Coimbra",
	},
	{
		value: "Castelo Branco",
		label: "Castelo Branco",
	},
	{
		value: "Guarda",
		label: "Guarda",
	},
	{
		value: "Porto",
		label: "Porto",
	},
	{
		value: "Bragança",
		label: "Bragança",
	},
	{
		value: "Braga",
		label: "Braga",
	},
	{
		value: "Viana do Castelo",
		label: "Viana do Castelo",
	},
	{
		value: "Vila Real",
		label: "Vila Real",
	},
	{
		value: "Viseu",
		label: "Viseu",
	},
	{
		value: "Santarém",
		label: "Santarém",
	},
	{
		value: "Portalegre",
		label: "Portalegre",
	},
	{
		value: "Lisboa",
		label: "Lisboa",
	},
	{
		value: "Leiria",
		label: "Leiria",
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
			lat: "40.574436706354",
			lng: "-8.44588251531503",
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
		if (state.boroughValue === "Agueda") {
			state.mapInstance.setView([40.585990757000125, -8.395834105612362], 11);
			dispatch({
			  type: "changeMarkerPosition",
			  changeLatitude: 40.585990757000125,
			  changeLongitude: -8.395834105612362,
			});
		} else if (state.boroughValue === "Aveiro") {
			state.mapInstance.setView([40.6422506508447, -8.628273955951457], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.6422506508447,
				changeLongitude: -8.628273955951457,
			});

		} else if (state.boroughValue === "Espinho") {
			state.mapInstance.setView([40.99474669678123, -8.625585358719585], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.99474669678123,
				changeLongitude: -8.625585358719585,
			});
		} else if (state.boroughValue === "Vale de Cambra") {
			state.mapInstance.setView([40.833041592290506, -8.336088387064086], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.833041592290506,
				changeLongitude: -8.336088387064086,
			});
		} else if (state.boroughValue === "Anadia") {
			state.mapInstance.setView([40.45259606633376, -8.442786383000804], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.45259606633376,
				changeLongitude: -8.442786383000804,
			});
		} else if (state.boroughValue === "Ílhavo") {
			state.mapInstance.setView([40.60599514538373, -8.699600989528484], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.60599514538373,
				changeLongitude: -8.699600989528484,
			});
		} else if (state.boroughValue === "Castelo de Paiva") {
			state.mapInstance.setView([41.01821164181052, -8.302794645759056], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 41.01821164181052,
				changeLongitude: -8.302794645759056,
			});
		} else if (state.boroughValue === "Oliveira de Azeméis") {
			state.mapInstance.setView([40.8422680563805, -8.468398715348895], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.8422680563805,
				changeLongitude: -8.468398715348895,
			});
		} else if (state.boroughValue === "Murtosa") {
			state.mapInstance.setView([40.75776128873536, -8.673598185306682], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.75776128873536,
				changeLongitude: -8.673598185306682,
			});
		} else if (state.boroughValue === "Albergaria a Velha") {
			state.mapInstance.setView([40.70017811531499, -8.495510691830441], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.70017811531499,
				changeLongitude: -8.495510691830441,
			});
		} else if (state.boroughValue === "Estarreja") {
			state.mapInstance.setView([40.76138496687104, -8.575852512695551], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.76138496687104,
				changeLongitude: -8.575852512695551,
			});
		} else if (state.boroughValue === "Ovar") {
			state.mapInstance.setView([40.87621682061737, -8.619738494006493], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.87621682061737,
				changeLongitude: -8.619738494006493,
			});
		} else if (state.boroughValue === "Mealhada") {
			state.mapInstance.setView([40.35378622116512, -8.44101670618321], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.35378622116512, 
				changeLongitude: -8.44101670618321,
			});
		} else if (state.boroughValue === "Santa Maria da Feira") {
			state.mapInstance.setView([40.9670634206, -8.510398965403327], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.9670634206,
				changeLongitude: -8.510398965403327,
			});
		} else if (state.boroughValue === "Arouca") {
			state.mapInstance.setView([40.92874171302727, -8.251820767383897], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.92874171302727,
				changeLongitude: -8.251820767383897,
			});
		} else if (state.boroughValue === "Oliveira do Bairro") {
			state.mapInstance.setView([40.51579457704644, -8.55145307991501], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.51579457704644,
				changeLongitude: -8.55145307991501 ,
			});
		} else if (state.boroughValue === "Vagos") {
			state.mapInstance.setView([40.515438740098354, -8.689498993802456], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.515438740098354,
				changeLongitude: -8.689498993802456,
			});
		} else if (state.boroughValue === "Sever do Vouga") {
			state.mapInstance.setView([40.72396875325826, -8.351976587663556], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.72396875325826,
				changeLongitude: -8.351976587663556,
			});
		} else if (state.boroughValue === "São João da Madeira") {
			state.mapInstance.setView([40.89563309421154, -8.490512698158794], 11);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.89563309421154, 
				changeLongitude: -8.490512698158794,
			});
		} else if (state.boroughValue === "Coimbra") {
			state.mapInstance.setView([40.20443214236321, -8.335749260779656], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.20443214236321,
				changeLongitude: -8.335749260779656,
			});
		} else if (state.boroughValue === "Castelo Branco") {
			state.mapInstance.setView([39.94648698287161, -7.50161292880351], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 39.94648698287161,
				changeLongitude: -7.50161292880351,
			});
		} else if (state.boroughValue === "Guarda") {
			state.mapInstance.setView([40.64131286206713, -7.229584359287314], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.64131286206713,
				changeLongitude: -7.229584359287314,
			});
		} else if (state.boroughValue === "Porto") {
			state.mapInstance.setView([41.22467234589946, -8.352344429605038], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 41.22467234589946,
				changeLongitude: -8.352344429605038,
			});
		} else if (state.boroughValue === "Bragança") {
			state.mapInstance.setView([41.509395022267455, -6.859318238455991], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 41.509395022267455,
				changeLongitude: -6.859318238455991,
			});
		} else if (state.boroughValue === "Braga") {
			state.mapInstance.setView([41.55296630546482, -8.309439786502109], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 41.55296630546482,
				changeLongitude: -8.309439786502109,
			});
		} else if (state.boroughValue === "Viana do Castelo") {
			state.mapInstance.setView([41.87791619720583, -8.506958438730788], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 41.87791619720583,
				changeLongitude: -8.506958438730788,
			});
		} else if (state.boroughValue === "Vila Real") {
			state.mapInstance.setView([41.554967638650616, -7.6316850568804], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 51.591214467057085,
				changeLongitude: -0.10319530898095737,
			});
		} else if (state.boroughValue === "Viseu") {
			state.mapInstance.setView([40.79887053135642, -7.8709038829775695], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 40.79887053135642,
				changeLongitude: -7.8709038829775695,
			});
		} else if (state.boroughValue === "Santarém") {
			state.mapInstance.setView([39.29359645660754, -8.477462578207927], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 39.29359645660754,
				changeLongitude: -8.477462578207927,
			});
		} else if (state.boroughValue === "Portalegre") {
			state.mapInstance.setView([39.19006181938354, -7.620444778782097], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 39.19006181938354,
				changeLongitude: -7.620444778782097,
			});
		} else if (state.boroughValue === "Lisboa") {
			state.mapInstance.setView([39.000319135610354, -9.16572852090912], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 39.000319135610354,
				changeLongitude: -9.16572852090912,
			});
		} else if (state.boroughValue === "Leiria") {
			state.mapInstance.setView([39.717773502707395, -8.774269769535048], 9);
			dispatch({
				type: "changeMarkerPosition",
				changeLatitude: 39.717773502707395,
				changeLongitude: -8.774269769535048,
			});
		};
	}, [state.boroughValue]);

	// Borough display function

	function BoroughDisplay() {
		if (state.boroughValue === "Agueda") {
			return <Polygon positions={Agueda} />;
		} else if (state.boroughValue === "Aveiro") {
			return <Polygon positions={Aveiro} />;
		} else if (state.boroughValue === "Espinho") {
			return <Polygon positions={Espinho} />;
		} else if (state.boroughValue === "Vale de Cambra") {
			return <Polygon positions={Vale_de_Cambra} />;
		} else if (state.boroughValue === "Anadia") {
			return <Polygon positions={Anadia} />;
		} else if (state.boroughValue === "Ílhavo") {
			return <Polygon positions={Ílhavo} />;
		} else if (state.boroughValue === "Castelo de Paiva") {
			return <Polygon positions={Castelo_de_Paiva} />;
		} else if (state.boroughValue === "Oliveira de Azeméis") {
			return <Polygon positions={Oliveira_de_Azeméis} />;
		} else if (state.boroughValue === "Murtosa") {
			return <Polygon positions={Murtosa} />;
		} else if (state.boroughValue === "Albergaria a Velha") {
			return <Polygon positions={Albergaria_a_Velha} />;
		} else if (state.boroughValue === "Estarreja") {
			return <Polygon positions={Estarreja} />;
		} else if (state.boroughValue === "Ovar") {
			return <Polygon positions={Ovar} />;
		} else if (state.boroughValue === "Mealhada") {
			return <Polygon positions={Mealhada} />;
		} else if (state.boroughValue === "Santa Maria da Feira") {
			return <Polygon positions={Santa_Maria_da_Feira} />;
		} else if (state.boroughValue === "Coimbra") {
			return <Polygon positions={Coimbra} />;	
		} else if (state.boroughValue === "Arouca") {
			return <Polygon positions={Arouca} />;
		} else if (state.boroughValue === "Oliveira do Bairro") {
			return <Polygon positions={Oliveira_do_Bairro} />;
		} else if (state.boroughValue === "Vagos") {
			return <Polygon positions={Vagos} />;
		} else if (state.boroughValue === "Sever do Vouga") {
			return <Polygon positions={Sever_do_Vouga} />;
		} else if (state.boroughValue === "São João da Madeira") {
			return <Polygon positions={São_João_da_Madeira} />;
		} else if (state.boroughValue === "Castelo Branco") {
			return <Polygon positions={Castelo_Branco} />;
		} else if (state.boroughValue === "Guarda") {
			return <Polygon positions={Guarda} />;
		} else if (state.boroughValue === "Porto") {
			return <Polygon positions={Porto} />;
		} else if (state.boroughValue === "Bragança") {
			return <Polygon positions={Bragança} />;
		} else if (state.boroughValue === "Braga") {
			return <Polygon positions={Braga} />;
		} else if (state.boroughValue === "Viana do Castelo") {
			return <Polygon positions={Viana_do_Castelo} />;
		} else if (state.boroughValue === "Vila Real") {
			return <Polygon positions={Vila_Real} />;
		} else if (state.boroughValue === "Viseu") {
			return <Polygon positions={Viseu} />;
		} else if (state.boroughValue === "Santarém") {
			return <Polygon positions={Santarém} />;
		} else if (state.boroughValue === "Portalegre") {
			return <Polygon positions={Portalegre} />;
		} else if (state.boroughValue === "Lisboa") {
			return <Polygon positions={Lisboa} />;
		} else if (state.boroughValue === "Leiria") {
			return <Polygon positions={Leiria} />;
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

	// imagens
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
					className="custom-submit-btn"
					disabled={state.disabledBtn}
				>
					Submeter
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
				<div className="custom-spacer">
					<Button
						variant="outlined"
						fullWidth
						className="custom-submit-btn custom-warning-btn"
						onClick={() => navigate("/profile")}
					>
						Complete o seu perfil para adicionar um Estágio!
					</Button>
				</div>
			);
		} else if (!GlobalState.userIsLogged) {
			return (
				<div className="custom-spacer">
					<Button
						variant="outlined"
						fullWidth
						onClick={() => navigate("/login")}
						className="custom-submit-btn custom-warning-btn"
					>
						Crie a sua conta primeiro!
					</Button>
				</div>
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
			<div className="custom-body"
			>
				<form onSubmit={FormSubmit}>
					<Grid item container justifyContent="center">
						<Typography variant="h4" className="custom-theme-title">Adicionar Proposta de Estágio	</Typography>
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

					<Grid item container justifyContent="left" style={{ marginTop: "3rem" }}>
						<Typography variant="h5" className="custom-theme-title" >Linguagens de Programação</Typography>
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

					<Grid item container justifyContent="left" style={{ marginTop: "3rem" }}>
						<Typography className="custom-theme-title" variant="h5">Front-End Frameworks</Typography>
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


					<Grid item container justifyContent="left" style={{ marginTop: "3rem" }}>
						<Typography className="custom-theme-title" variant="h5">Back-End Frameworks</Typography>
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

					<Grid item container justifyContent="left" style={{ marginTop: "3rem" }}>
						<Typography className="custom-theme-title" variant="h5">Localização</Typography>
					</Grid>

					<Grid item container justifyContent="space-between">
						<Grid item xs={5} style={{ marginTop: "1rem" }}>
							<TextField
								id="area"
								label="Distrito*"
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
								label="Concelho*"
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
								{state.areaValue === "Aveiro"
									? aveiroOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
									))
									: ""}

								{state.areaValue === "Outros Distritos"
									? outrosDistritosOptions.map((option) => (
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
								O seu estagio está localizado nas seguintes coordenadas: {state.latitudeValue},{" "}
								{state.longitudeValue}
							</Alert>
						) : (
							<Alert severity="warning">
								Localize o seu estagio no mapa ao arrastar o marcador, antes de submeter o formulario.
							</Alert>
						)}
					</Grid>
					<Grid item container style={{ height: "35rem", marginTop: "1rem" }}>
						<MapContainer
							center={[40.574436706354, -8.44588251531503]}
							zoom={14}
							scrollWheelZoom={true}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
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
						className="custom-submit-btn custom-normal-btn"
						style={{ marginTop: "2rem", marginLeft: "auto", marginRight: "auto" }}
					>
						<Button
							variant="contained"
							component="label"
							fullWidth
							className="custom-submit-btn custom-normal-btn"
						>
							Carregar fotos (máximo 5)
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
			<div className="custom-body custom-spacer">
				<Button
					variant="outlined"
					fullWidth
					className="custom-submit-btn custom-warning-btn"
					onClick={() => navigate("/profile")}
				>
					Complete o seu perfil para adicionar um Estágio!
				</Button>
			</div>
		);
	} else if (!GlobalState.userIsLogged) {
		return (
			<div className="custom-body custom-spacer">
				<Button
					variant="outlined"
					fullWidth
					onClick={() => navigate("/login")}
					className="custom-submit-btn custom-warning-btn"
				>
					Crie a sua conta primeiro!
				</Button>
			</div>
		);
	}
}

export default AddProperty;
