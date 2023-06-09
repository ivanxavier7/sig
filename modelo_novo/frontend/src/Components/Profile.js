import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// Components
import ProfileUpdate from "./ProfileUpdate";

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
} from "@mui/material";

function Profile() {
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

	const initialState = {
		userProfile: {
			agencyName: "",
			phoneNumber: "",
			profilePic: "",
			bio: "",
			sellerId: "",
			sellerListings: [],
		},
		dataIsLoading: true,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchUserProfileInfo":
				draft.userProfile.agencyName = action.profileObject.agency_name;
				draft.userProfile.phoneNumber = action.profileObject.phone_number;
				draft.userProfile.profilePic = action.profileObject.profile_picture;
				draft.userProfile.bio = action.profileObject.bio;
				draft.userProfile.sellerListings = action.profileObject.seller_listings;
				draft.userProfile.sellerId = action.profileObject.seller;
				break;

			case "loadingDone":
				draft.dataIsLoading = false;
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	// request to get profile info
	useEffect(() => {
		async function GetProfileInfo() {
			try {
				const response = await Axios.get(
					`http://www.localhost:8000/api/profiles/${GlobalState.userId}/`
				);

				dispatch({
					type: "catchUserProfileInfo",
					profileObject: response.data,
				});
				dispatch({ type: "loadingDone" });
			} catch (e) {}
		}
		GetProfileInfo();
	}, []);
/*
	function PropertiesDisplay() {
		if (state.userProfile.sellerListings.length === 0) {
			return (
				<Button
					onClick={() => navigate(`/empresas/${state.userProfile.sellerId}`)}
					
					size="small"
				>
					Zero Estagios
				</Button>
			);
		} else if (state.userProfile.sellerListings.length === 1) {
			return (
				<Button
					onClick={() => navigate(`/empresas/${state.userProfile.sellerId}`)}
					size="small"
				>
					Um Estagio
				</Button>
			);
		} else {
			return (
				<Button
					onClick={() => navigate(`/empresas/${state.userProfile.sellerId}`)}
					size="small"
				>
					{state.userProfile.sellerListings.length} Estagios
				</Button>
			);
		}
	}
*/
	function WelcomeDisplay() {
		if (
			state.userProfile.agencyName === null ||
			state.userProfile.agencyName === "" ||
			state.userProfile.phoneNumber === null ||
			state.userProfile.phoneNumber === ""
		) {
			return (
				<Typography
					variant="h5"
					className="welcome-text"
				>
					Bem Vindo{" "}
					<span className="highlight">
						{GlobalState.userUsername}
					</span>{" "}
					, por favor submete o form para atualizar o perfil.
				</Typography>
			);
		} else {
			return (
				<Grid
					container
					className="profile-container"
					sx={{ width: '50%'}}
				>
					<Grid item xs={4}>
						<img
							className="image"
							src={
								state.userProfile.profilePic !== null
									? state.userProfile.profilePic
									: defaultProfilePicture
							}
						/>
						<Typography
								variant="h5"
								className="welcome-text"
							>
								Bem Vindo{" "}
								<span className="highlight">
									{GlobalState.userUsername}
								</span>
							</Typography>
					</Grid>
					
				</Grid>
			);
		}
	}

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
		<>
			<div>{WelcomeDisplay()}</div>

			<ProfileUpdate userProfile={state.userProfile} />
		</>
	);
}

export default Profile;
