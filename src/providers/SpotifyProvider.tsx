import {
  useContext,
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useState,
} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { ISpotifyTokenResponse, setLocalData, getLocalData } from "lib/spotify";

interface ISpotifyState {
  spotify: SpotifyWebApi.SpotifyWebApiJs;
  isLogged: boolean;
}

const initialState: ISpotifyState = {
  spotify: new SpotifyWebApi(),
  isLogged: false,
};

type TAction = {
  type: "SET_ACCESS_TOKEN";
  payload: ISpotifyTokenResponse;
};

const reducer = (state: ISpotifyState, action: TAction): ISpotifyState => {
  const { spotify } = state;
  switch (action.type) {
    case "SET_ACCESS_TOKEN": {
      const { access_token } = action.payload;

      spotify.setAccessToken(access_token);
      setLocalData(action.payload);

      return { ...state, isLogged: true };
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
      if (data.access_token && data.refresh_token) {
        dispatch({ type: "SET_ACCESS_TOKEN", payload: data });
      }
    };

    if (!state.isLogged) {
      persistanceAuth();
    }
      setLoading(false);
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <SpotifyContext.Provider value={{ state, dispatch }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export { useSpotify, SpotifyProvider };
