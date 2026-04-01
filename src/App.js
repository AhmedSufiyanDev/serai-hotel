

import Routes from "./routes/routes";
import {Provider} from 'react-redux';
import PersistedStore from "./store";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import './App.css'
import './helper.css'
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
import { TRACKING_ID } from './environment/index.js';
import { PIXEL_ID } from './environment/index.js';
ReactGA.initialize(TRACKING_ID);
ReactPixel.init(PIXEL_ID);
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif'
    // fontFamily: 'Flexo'
  },});
const store = PersistedStore.getDefaultStore().store;

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes/>
      </Provider>
    </ThemeProvider>
)}

export default App;

// https://www.codementor.io/blog/react-optimization-5wiwjnf9hj#.YbD42UeP0l4.linkedin
