import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
// MUI imports
// import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import Listings from "./Components/Listings";
import Header from "./Components/Header";
import Register from "./Components/Register";
import AdicionarEstagio from "./Components/AdicionarEstagio";
import Profile from "./Components/Profile";
import Empresas from "./Components/Empresas";
import AgencyDetail from "./Components/AgencyDetail";
import ListingDetail from "./Components/ListingDetail";
import AccountCreated from "./Components/AccountCreated";
import Activation from "./Components/Activation";
import Footer from "./Components/Footer";
// Contexts
import DispatchContext from "./Contexts/DispatchContext";
import StateContext from "./Contexts/StateContext";

function App() {
	const initialState = {
		userUsername: localStorage.getItem("theUserUsername"),
		userEmail: localStorage.getItem("theUserEmail"),
		userId: localStorage.getItem("theUserId"),
		userToken: localStorage.getItem("theUserToken"),
		userIsLogged: localStorage.getItem("theUserUsername") ? true : false,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchToken":
				draft.userToken = action.tokenValue;
				break;
			case "userSignsIn":
				draft.userUsername = action.usernameInfo;
				draft.userEmail = action.emailInfo;
				draft.userId = action.IdInfo;
				draft.userIsLogged = true;
				break;

			case "logout":
				draft.userIsLogged = false;
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	useEffect(() => {
		if (state.userIsLogged) {
			localStorage.setItem("theUserUsername", state.userUsername);
			localStorage.setItem("theUserEmail", state.userEmail);
			localStorage.setItem("theUserId", state.userId);
			localStorage.setItem("theUserToken", state.userToken);
		} else {
			localStorage.removeItem("theUserUsername");
			localStorage.removeItem("theUserEmail");
			localStorage.removeItem("theUserId");
			localStorage.removeItem("theUserToken");
		}
	}, [state.userIsLogged]);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{/* <StyledEngineProvider injectFirst> */}
				<BrowserRouter>
					<CssBaseline />
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/activate/:uid/:token" element={<Activation />} />
						<Route path="/login" element={<Login />} />
						<Route path="/created" element={<AccountCreated />} />
						<Route path="/register" element={<Register />} />
						<Route path="/adicionarestagio" element={<AdicionarEstagio />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/empresas" element={<Empresas />} />
						<Route path="/empresas/:id" element={<AgencyDetail />} />
						<Route path="/listings/:id" element={<ListingDetail />} />
						<Route path="/listings" element={<Listings />} />
					</Routes>
					<Footer />
				</BrowserRouter>
				{/* </StyledEngineProvider> */}
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

export default App;
