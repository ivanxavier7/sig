import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";
import stadiumIconPng from "./Assets/Mapicons/stadium.png";
import hospitalIconPng from "./Assets/Mapicons/hospital.png";
import universityIconPng from "./Assets/Mapicons/university.png";

// Components
import ListingUpdate from "./ListingUpdate";

// React Leaflet
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	Polygon,
} from "react-leaflet";
import { Icon } from "leaflet";

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
	IconButton,
	CardActions,
	Breadcrumbs,
	Link,
	Dialog,
	Snackbar,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import RoomIcon from "@mui/icons-material/Room";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function ListingDetail() {
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

	const params = useParams();

	const stadiumIcon = new Icon({
		iconUrl: stadiumIconPng,
		iconSize: [40, 40],
	});

	const hospitalIcon = new Icon({
		iconUrl: hospitalIconPng,
		iconSize: [40, 40],
	});

	const universityIcon = new Icon({
		iconUrl: universityIconPng,
		iconSize: [40, 40],
	});

	const initialState = {
		dataIsLoading: true,
		listingInfo: "",
		sellerProfileInfo: "",
		openSnack: false,
		disabledBtn: false,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchListingInfo":
				draft.listingInfo = action.listingObject;
				break;

			case "loadingDone":
				draft.dataIsLoading = false;
				break;

			case "catchSellerProfileInfo":
				draft.sellerProfileInfo = action.profileObject;
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

	// request to get listing info
	useEffect(() => {
		async function GetListingInfo() {
			try {
				const response = await Axios.get(
					`http://www.localhost:8000/api/listings/${params.id}/`
				);

				dispatch({
					type: "catchListingInfo",
					listingObject: response.data,
				});
			} catch (e) {}
		}
		GetListingInfo();
	}, []);

	// request to get profile info
	useEffect(() => {
		if (state.listingInfo) {
			async function GetProfileInfo() {
				try {
					const response = await Axios.get(
						`http://www.localhost:8000/api/profiles/${state.listingInfo.seller}/`
					);

					dispatch({
						type: "catchSellerProfileInfo",
						profileObject: response.data,
					});
					dispatch({ type: "loadingDone" });
				} catch (e) {}
			}
			GetProfileInfo();
		}
	}, [state.listingInfo]);

	const listingPictures = [
		state.listingInfo.picture1,
		state.listingInfo.picture2,
		state.listingInfo.picture3,
		state.listingInfo.picture4,
		state.listingInfo.picture5,
	].filter((picture) => picture !== null);

	const [currentPicture, setCurrentPicture] = useState(0);

	function NextPicture() {
		if (currentPicture === listingPictures.length - 1) {
			return setCurrentPicture(0);
		} else {
			return setCurrentPicture(currentPicture + 1);
		}
	}

	function PreviousPicture() {
		if (currentPicture === 0) {
			return setCurrentPicture(listingPictures.length - 1);
		} else {
			return setCurrentPicture(currentPicture - 1);
		}
	}

	const date = new Date(state.listingInfo.date_posted);
	const formattedDate = `${
		date.getMonth() + 1
	}/${date.getDate()}/${date.getFullYear()}`;

	async function DeleteHandler() {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this listing?"
		);
		if (confirmDelete) {
			try {
				const response = await Axios.delete(
					`http://localhost:8000/api/listings/${params.id}/delete/`
				);

				dispatch({ type: "openTheSnack" });
				dispatch({ type: "disableTheButton" });
			} catch (e) {
				dispatch({ type: "allowTheButton" });
			}
		}
	}

	useEffect(() => {
		if (state.openSnack) {
			setTimeout(() => {
				navigate("/listings");
			}, 1500);
		}
	}, [state.openSnack]);

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (state.dataIsLoading === true) {
		return (
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ height: "100vh" }}
			>
				<CircularProgress />
			</Grid>
		);
	}
	return (
		<div>
			<Grid item style={{ marginLeft: "1rem", marginTop: "1rem" }}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link
						underline="hover"
						color="inherit"
						onClick={() => navigate("/listings")}
						style={{ cursor: "pointer" }}
					>
						Estágios
					</Link>

					<Typography className="primary-theme-color">
						{state.listingInfo.title}
					</Typography>
				</Breadcrumbs>
			</Grid>

			{/* Image slider */}
			{listingPictures.length > 0 ? (
				<div className="internship-image-container"> 
				<Grid
					item
					container
					justifyContent="center"
					style={{ position: "relative", marginTop: "1rem"}}
				>
					<div className="internship-image-with-btns-container">
						{listingPictures.map((picture, index) => {
							return (
								<div key={index}>
									{index === currentPicture ? (
										<img className="internship-details-image" src={picture}/>
									) : (
										""
									)}
								</div>
							)
						})}
						<ArrowCircleLeftIcon
							onClick={PreviousPicture}
							className="internship-details-image-btn"
							style={{
								position: "sticky",
								left: "27.5%",
								bottom: "57%",
							}}
						/>
						<ArrowCircleRightIcon
							onClick={NextPicture}
							className="internship-details-image-btn"
							style={{
								position: "sticky",
								marginLeft: "89%",
								bottom: "57%",
								// "&:hover": {
								// 	backgroundColor: "green",
								// },
							}}
						/>
					</div>
				</Grid>
				</div>
			) : (
				""
			)}

			{/* More information */}

			<Grid
				item
				container
				className="custom-details-body"
			>
				<Grid className="teste" item container xs={2} direction="column" spacing={1}>
					<Grid item>
						<Typography className="custom-theme-title" variant="h5">{state.listingInfo.title}</Typography>
					</Grid>
					<Grid className="teste" item container xs={4} direction="line">
					<Grid item>
						<RoomIcon />{" "}
					</Grid>
					<Grid item direction="line" >
						<Typography varaiant="h6">{state.listingInfo.borough}</Typography>
					</Grid>
					<Grid item>
						<Typography varaiant="subtitle1">, {formattedDate}</Typography>
					</Grid>
				</Grid>
				</Grid>
				<Grid item container xs={3} direction="column"> 
					<Grid item>
						<Grid item container xs={4}>
							<Typography
								variant="caption"
							>Tipo de Estágio
							</Typography>
						</Grid>
						<Grid item container xs={2}>
							<Typography
								variant="h6"
							>
								{state.listingInfo.listing_type}
							</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Grid item container xs={4}>
							<Typography
								variant="caption"
							>Número de Vagas
							</Typography>
						</Grid>
						<Grid item container xs={2}>
							<Typography
								variant="h6"
							>
							{state.listingInfo.vacancies
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container xs={3} direction="column">
					<Grid item>
						<Grid item container xs={4}>
							<Typography
								variant="caption"
							>
								Curso
							</Typography>
						</Grid>
						<Grid item container xs={4} className="internship-details-spacer">
							<Typography
								variant="h6"
							>
								{state.listingInfo.internship_bachelor === "CTeSP" ? state.listingInfo.internship_courses_ctesp
									: state.listingInfo.internship_bachelor === "Licenciatura" ? state.listingInfo.internship_courses_licenciatura
									: state.listingInfo.internship_bachelor === "Mestrado" ? state.listingInfo.internship_courses_mestrado
									: state.listingInfo.internship_bachelor === "Cursos de Especialização" ? state.listingInfo.internship_courses_ce
									: " "
								}
							</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Grid item container xs={5}>
							<Typography
								variant="caption"
							>Grau Académico
							</Typography>
						</Grid>
						<Grid item container xs={2}>
							<Typography
								variant="h6"
							>
								{state.listingInfo.internship_bachelor}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container xs={4} direction="column">
					<Grid item>
							<Grid item container xs={5}>
								<Typography
									variant="caption"
								>Total de horas
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography variant="h6">
									{state.listingInfo.total_hours}
								</Typography>
							</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				item
				container
				justifyContent="flex-start"
				className="custom-details-body"
			>
				<Grid item container xs={12} direction="column">
					<Grid item>
							<Grid item container xs={12}>
								<Typography className="custom-theme-title" variant="h5">Linguagens de Programação</Typography>
							</Grid>

							{state.listingInfo.programming_lang_python ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Python</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_python ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Java</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_c_1 ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">C e C++</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_c_2 ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">C#</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_javascript ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">JavaScript</Typography>
								</Grid>
							) : (
								""
							)}

							
							{state.listingInfo.programming_lang_sql ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">SQL</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_php ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">PHP</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_go ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Go</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_kotlin ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Kotlin</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_matlab ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">MATLAB</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_swift ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Swift</Typography>
								</Grid>
							) : (
								""
							)}

			{				state.listingInfo.programming_lang_rust ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Rust</Typography>
								</Grid>
							) : (
								""
							)}

			{				state.listingInfo.programming_lang_ruby ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Ruby</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_dart ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Dart</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_lang_scala ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Scala</Typography>
								</Grid>
							) : (
								""
							)}
					</Grid>
					<Grid item>
							<Grid item container xs={12}>
							<Grid item>
								<Typography className="custom-theme-title internship-details-title-spacer" variant="h5">Front-End FrameWorks</Typography>
							</Grid>
							</Grid>
							{state.listingInfo.programming_fw_frontend_angular ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Angular</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_fw_frontend_jquery ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">jQuery</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_fw_frontend_react ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">React</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_fw_frontend_ruby ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Ruby on Rails</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_fw_frontend_vuejs ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Vue.js</Typography>
								</Grid>
							) : (
								""
							)}
					</Grid>
					<Grid item>
							<Grid item container xs={12}>
								<Typography className="custom-theme-title internship-details-title-spacer" variant="h5">Back-End FrameWorks</Typography>
							</Grid>
							{state.listingInfo.programming_fw_backend_aspnet ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">ASP.Net</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_fw_backend_django ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Django</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_fw_backend_express ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Express</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_fw_backend_laravel ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Laravel</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_fw_backend_nodejs ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Node.js</Typography>
								</Grid>
							) : (
								""
							)}

							{state.listingInfo.programming_fw_backend_spring ? (
								<Grid item xs={2} style={{ display: "flex" }}>
									<CheckBoxIcon style={{ color: "green", fontSize: "2rem" }} />{" "}
									<Typography variant="h6">Spring</Typography>
								</Grid>
							) : (
								""
							)}
					</Grid>
				</Grid>
			</Grid>

			{/* Description */}
			{state.listingInfo.description ? (
				<Grid
					item
					className="custom-details-body"
				>
					<Typography className="custom-theme-title" variant="h5">Descrição</Typography>
					<Typography variant="h6">{state.listingInfo.description}</Typography>
				</Grid>
			) : (
				""
			)}

			{/* Company Info */}
			<Grid
				container
				className="custom-details-body"
			>
				<Grid item container xs={8} direction="column">
					<Grid item>
							<Grid item container xs={5}>
								<Typography
									variant="caption"
								>Dados da Empresa
								</Typography>
							</Grid>
							<Grid item>
								<Typography
									variant="h5"
									style={{marginBottom: "1rem" }}
								>
									<span style={{ color: "green", fontWeight: "bolder" }}>
										{state.sellerProfileInfo.agency_name}
									</span>
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<img
									className="mini-profile-picture"
									style={{ height: "10rem", width: "15rem", cursor: "pointer" }}
									src={
										state.sellerProfileInfo.profile_picture !== null
											? state.sellerProfileInfo.profile_picture
											: defaultProfilePicture
									}
									onClick={() =>
										navigate(`/empresas/${state.sellerProfileInfo.seller}`)
									}
								/>
							</Grid>
							<Grid item>
								<Typography
									variant="h5"
									style={{marginTop: "1rem" }}
								>
									<IconButton>
										<LocalPhoneIcon style={{ marginRight: "8px" }}/>{state.sellerProfileInfo.phone_number}
									</IconButton>
								</Typography>
							</Grid>
					</Grid>
				</Grid>
				
				{GlobalState.userId == state.listingInfo.seller ? (
				<Grid item container xs={4} direction="column">
					<Grid item>
							<Grid item container xs={5}>
								<Typography
									variant="caption"
								>Editar Estágio
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Button
									variant="contained"
									color="primary"
									onClick={handleClickOpen}
									className="custom-submit-btn"
								>
									Alterar
								</Button>
							</Grid>
							<Grid item xs={2}>
								<Button
									variant="contained"
									color="error"
									onClick={DeleteHandler}
									disabled={state.disabledBtn}
									className="cancel-btn"
								>
									Apagar
								</Button>
							</Grid>
							<Dialog open={open} onClose={handleClose} fullScreen>
								<ListingUpdate
									listingData={state.listingInfo}
									closeDialog={handleClose}
								/>
							</Dialog>
					</Grid>
				</Grid>
				) : (
					""
				)}
			</Grid>

			{/* Map */}
			<Grid
				item
				container
				className="internship-details-map-container"
				style={{ marginTop: "1rem" }}
				spacing={1}
				justifyContent="space-between"
			>
				<Grid item xs={14}>
					<MapContainer
						center={[state.listingInfo.latitude, state.listingInfo.longitude]}
						zoom={14}
						scrollWheelZoom={true}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
						/>
						<Marker
							position={[
								state.listingInfo.latitude,
								state.listingInfo.longitude,
							]}
						>
							<Popup>{state.listingInfo.title}</Popup>
						</Marker>
					</MapContainer>
				</Grid>
			</Grid>
			<Snackbar
				open={state.openSnack}
				message="Removeu o estágio com sucesso!"
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
			/>
		</div>
	);
}

export default ListingDetail;

//falta fazer no backend