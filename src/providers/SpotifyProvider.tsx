import {
	useContext,
	createContext,
	useReducer,
	Dispatch,
	useEffect,
	useState,
} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import {
	ISpotifyTokenResponse,
	setLocalData,
	getLocalData,
	removeLocalData,
} from "lib/spotify";
import Loading from "components/atoms/Loading";

interface ISpotifyState {
	spotify: SpotifyWebApi.SpotifyWebApiJs;
	isLogged: boolean;
}

const initialState: ISpotifyState = {
	spotify: new SpotifyWebApi(),
	isLogged: false,
};

type TAction =
	| {
			type: "LOG_IN";
			payload: ISpotifyTokenResponse;
	  }
	| {
			type: "LOG_OUT";
	  };

const reducer = (state: ISpotifyState, action: TAction): ISpotifyState => {
	const { spotify } = state;
	switch (action.type) {
		case "LOG_IN": {
			const { access_token } = action.payload;

			spotify.setAccessToken(access_token);
			setLocalData(action.payload);

			return { ...state, isLogged: true };
		}
		case "LOG_OUT": {
			removeLocalData();

			return { ...state, isLogged: false };
		}
		default:
			throw new Error("Invalid spotify action");
	}
};

interface ISpotifyContext {
	state: ISpotifyState;
	dispatch: Dispatch<TAction>;
}

const initialContext: ISpotifyContext = {
	state: null,
	dispatch: null,
};

const SpotifyContext = createContext(initialContext);

const useSpotify = () => useContext(SpotifyContext);

const SpotifyProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const persistanceAuth = () => {
			const data = getLocalData();
			if (data.access_token && data.refresh_token)
				dispatch({ type: "LOG_IN", payload: data });
		};

		if (!state.isLogged) {
			persistanceAuth();
		}
		setLoading(false);
	}, [state.isLogged]);

	return (
		!loading && (
			<SpotifyContext.Provider value={{ state, dispatch }}>
				{children}
			</SpotifyContext.Provider>
		)
	);
};

export { useSpotify, SpotifyProvider };
