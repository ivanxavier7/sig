import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";
// React leaflet
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polyline,
	Polygon,
	useMap,
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
	IconButton,
	CardActions,
} from "@mui/material";

import RoomIcon from "@mui/icons-material/Room";

// Map icons
import curricularIconPng from "./Assets/Mapicons/curricular.png";
import profissionalIconPng from "./Assets/Mapicons/profissional.png";
import voluntarioIconPng from "./Assets/Mapicons/voluntario.png";
// Assets
import img1 from "./Assets/img1.jpg";
import myListings from "./Assets/Data/Dummydata";

function Listings() {
	const navigate = useNavigate();
	const curricularIcon = new Icon({
		iconUrl: curricularIconPng,
		iconSize: [40, 40],
	});

	const profissionalIcon = new Icon({
		iconUrl: profissionalIconPng,
		iconSize: [40, 40],
	});

	const voluntarioIcon = new Icon({
		iconUrl: voluntarioIconPng,
		iconSize: [40, 40],
	});

	const [latitude, setLatitude] = useState(51.48740865233002);
	const [longitude, setLongitude] = useState(-0.12667052265135625);

	const initialState = {
		mapInstance: null,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "getMap":
				draft.mapInstance = action.mapData;
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	function TheMapComponent() {
		const map = useMap();
		dispatch({ type: "getMap", mapData: map });
		return null;
	}

	function GoEast() {
		setLatitude(51.46567014039476);
		setLongitude(0.2596173538795676);
	}

	function GoCenter() {
		setLatitude(51.48740865233002);
		setLongitude(-0.12667052265135625);
	}

	const polyOne = [
		[51.505, -0.09],
		[51.51, -0.1],
		[51.51, -0.12],
	];

	const [allListings, setAllListings] = useState([]);
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(() => {
		const source = Axios.CancelToken.source();
		async function GetAllListings() {
			try {
				const response = await Axios.get(
					"http://localhost:8000/api/listings/",
					{ cancelToken: source.token }
				);

				setAllListings(response.data);
				setDataIsLoading(false);
			} catch (error) {}
		}
		GetAllListings();
		return () => {
			source.cancel();
		};
	}, []);

	if (dataIsLoading === true) {
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
		<Grid container>
			<Grid item xs={4}>
				{allListings.map((listing) => {
					return (
						<Card
							key={listing.id}
							style={{
								margin: "0.5rem",
								border: "1px solid black",
								position: "relative",
							}}
						>
							<CardHeader
								action={
									<IconButton
										aria-label="settings"
										onClick={() =>
											state.mapInstance.flyTo(
												[listing.latitude, listing.longitude],
												16
											)
										}
									>
										<RoomIcon />
									</IconButton>
								}
								title={listing.title}
							/>
							<CardMedia
								className="imagem-card-estagio"
								component="img"
								image={listing.picture1}
								alt={listing.title}
								onClick={() => navigate(`/listings/${listing.id}`)}
							/>
							<CardContent>
								<Typography variant="body2">
									{listing.description.substring(0, 200)}...
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<IconButton aria-label="add to favorites">
									{listing.seller_agency_name}
								</IconButton>
							</CardActions>
						</Card>
					);
				})}
			</Grid>
			<Grid item xs={8} style={{ marginTop: "0.5rem" }}>
				<AppBar position="sticky">
					<div style={{ height: "100vh" }}>
						<MapContainer
							center={[51.505, -0.09]}
							zoom={12}
							scrollWheelZoom={true}
						>
							 <TileLayer
              					  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              					  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              					/>
							<TheMapComponent />

							{allListings.map((listing) => {
								function IconDisplay() {
									if (listing.listing_type === "Curricular") {
										return curricularIcon;
									} else if (listing.listing_type === "Profissional") {
										return profissionalIcon;
									} else if (listing.listing_type === "Voluntário") {
										return voluntarioIcon;
									}
								}
								return (
									<Marker
										key={listing.id}
										icon={IconDisplay()}
										position={[listing.latitude, listing.longitude]}
									>
										<Popup>
											<Typography variant="h5">{listing.title}</Typography>
											<img
												src={listing.picture1}
												style={{
													height: "14rem",
													width: "18rem",
													cursor: "pointer",
												}}
												onClick={() => navigate(`/listings/${listing.id}`)}
											/>
											<Typography variant="body1">
												{listing.description.substring(0, 150)}...
											</Typography>
											<Button
												variant="contained"
												fullWidth
												onClick={() => navigate(`/listings/${listing.id}`)}
											>
												Details
											</Button>
										</Popup>
									</Marker>
								);
							})}

							{/* <Marker icon={officeIcon} position={[latitude, longitude]}>
								<Popup>
									<Typography variant="h5">A title</Typography>
									<img src={img1} style={{ height: "14rem", width: "18rem" }} />
									<Typography variant="body1">
										This is some text below the title
									</Typography>
									<Button variant="contained" fullWidth>
										A Link
									</Button>
								</Popup>
							</Marker> */}
						</MapContainer>
					</div>
				</AppBar>
			</Grid>
		</Grid>
	);
}

export default Listings;