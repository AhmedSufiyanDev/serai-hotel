let isLocal = false;
let isStaging = true;
let cmsUrl = "";
let backendUrl = "";
let frontendUrl = "";
let stripeUrl = "";
let stripePubKey = "";


if (isLocal) {
  cmsUrl = `http://localhost:3001`;
  backendUrl = `http://localhost:8000`;
  frontendUrl = `http://localhost:3000`;
  stripeUrl = `http://localhost:8000/api/v1/create-payment-intent`;
  stripePubKey = "pk_test_iHoTJQXkhsogRq5jfJs1Qj1f";
} else if (isStaging) {
  cmsUrl = `https://serai-cms.rockvillegroup.com`;
  backendUrl = `https://serai-cms.rockvillegroup.com`;
  frontendUrl = `https://serai.rockvillegroup.com`;
  stripeUrl = `https://serai-cms.rockvillegroup.com/api/v1/create-payment-intent`;
  stripePubKey = "pk_test_iHoTJQXkhsogRq5jfJs1Qj1f";
} else {
  cmsUrl = `https://cms.serai.com.pk`;
  backendUrl = `https://cms.serai.com.pk`;
  frontendUrl = `https://serai.com.pk`;
  stripeUrl = `https://cms.serai.com.pk/api/v1/create-payment-intent`;
  stripePubKey = "pk_live_szJzHuNXphofgcd86CyqIqrC";
}

export const currency = "EUR";
export const STRIPE_PUB_KEY = stripePubKey;
export const STRIPE_PAYMENT = stripeUrl;
export const TRACKING_ID = "G-3DB30LSXC3";
export const PIXEL_ID = "326472743276542";
export const CONTACT_NO = "923000553778";
export const CONTACT_NO2 = "923000553778";

export const CMS_DOMAIN_PREFIX = cmsUrl;
export const APP_DOMAIN_PREFIX = backendUrl;
export const APP_FRONT_PREFIX = frontendUrl;

export const API_URL = `${APP_DOMAIN_PREFIX}/api/v1`;
export const FILE_BASE_URL = "http=//localhost=9000/";

export const LABELS = {
  GO_BACK: "← Back",
  LOGOUT: "↶ Logout",
  LOGIN: "Login",
  SIGNUP: "Sign Up",
  REGISTER: "Create User",
  EMAIL: "Email Address",
  NAME: "Username",
  FULL_NAME: "Full Name",
  PASSWORD: "Password",
  CONFIRM_PASSWORD: "Confirm Password",
  INVALID_MOBILE: "Invalid mobile number",
};
export const PASSWORD = {
  passwordLength: 6,
  passwordLengthError: "password is to short",
};
export const REGISTER = {
  SUCCESS_HEADER: "Success",
  SUCCESS_MESSAGE: "User Created Successfully!",
  FAILURE_HEADER: "Failure",
  FAILURE_MESSAGE:
    "Cannot Create User! User may already have been created with the given email!",
};
export const REGEXP_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2;3})+$/;
export const C_OTC_STORAGE = "c_d_storage";

export const Location = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "option5", label: "Option 5" },
];

export const country = [
  {
    text: "Afghanistan",
    countryCodes: ["93"],
    value: "AF",
    isoCode3: "AFG",
  },
  {
    text: "Albania",
    countryCodes: ["355"],
    value: "AL",
    isoCode3: "ALB",
  },
  {
    text: "Algeria",
    countryCodes: ["213"],
    value: "DZ",
    isoCode3: "DZA",
  },
  {
    text: "American Samoa",
    countryCodes: ["1-684"],
    value: "AS",
    isoCode3: "ASM",
  },
  {
    text: "Andorra",
    countryCodes: ["376"],
    value: "AD",
    isoCode3: "AND",
  },
  {
    text: "Angola",
    countryCodes: ["244"],
    value: "AO",
    isoCode3: "AGO",
  },
  {
    text: "Anguilla",
    countryCodes: ["1-264"],
    value: "AI",
    isoCode3: "AIA",
  },
  {
    text: "Antarctica",
    countryCodes: ["672"],
    value: "AQ",
    isoCode3: "ATA",
  },
  {
    text: "Antigua and Barbuda",
    countryCodes: ["1-268"],
    value: "AG",
    isoCode3: "ATG",
  },
  {
    text: "Argentina",
    countryCodes: ["54"],
    value: "AR",
    isoCode3: "ARG",
  },
  {
    text: "Armenia",
    countryCodes: ["374"],
    value: "AM",
    isoCode3: "ARM",
  },
  {
    text: "Aruba",
    countryCodes: ["297"],
    value: "AW",
    isoCode3: "ABW",
  },
  {
    text: "Australia",
    countryCodes: ["61"],
    value: "AU",
    isoCode3: "AUS",
  },
  {
    text: "Austria",
    countryCodes: ["43"],
    value: "AT",
    isoCode3: "AUT",
  },
  {
    text: "Azerbaijan",
    countryCodes: ["994"],
    value: "AZ",
    isoCode3: "AZE",
  },
  {
    text: "Bahamas",
    countryCodes: ["1-242"],
    value: "BS",
    isoCode3: "BHS",
  },
  {
    text: "Bahrain",
    countryCodes: ["973"],
    value: "BH",
    isoCode3: "BHR",
  },
  {
    text: "Bangladesh",
    countryCodes: ["880"],
    value: "BD",
    isoCode3: "BGD",
  },
  {
    text: "Barbados",
    countryCodes: ["1-246"],
    value: "BB",
    isoCode3: "BRB",
  },
  {
    text: "Belarus",
    countryCodes: ["375"],
    value: "BY",
    isoCode3: "BLR",
  },
  {
    text: "Belgium",
    countryCodes: ["32"],
    value: "BE",
    isoCode3: "BEL",
  },
  {
    text: "Belize",
    countryCodes: ["501"],
    value: "BZ",
    isoCode3: "BLZ",
  },
  {
    text: "Benin",
    countryCodes: ["229"],
    value: "BJ",
    isoCode3: "BEN",
  },
  {
    text: "Bermuda",
    countryCodes: ["1-441"],
    value: "BM",
    isoCode3: "BMU",
  },
  {
    text: "Bhutan",
    countryCodes: ["975"],
    value: "BT",
    isoCode3: "BTN",
  },
  {
    text: "Bolivia",
    countryCodes: ["591"],
    value: "BO",
    isoCode3: "BOL",
  },
  {
    text: "Bosnia and Herzegovina",
    countryCodes: ["387"],
    value: "BA",
    isoCode3: "BIH",
  },
  {
    text: "Botswana",
    countryCodes: ["267"],
    value: "BW",
    isoCode3: "BWA",
  },
  {
    text: "Brazil",
    countryCodes: ["55"],
    value: "BR",
    isoCode3: "BRA",
  },
  {
    text: "British Indian Ocean Territory",
    countryCodes: ["246"],
    value: "IO",
    isoCode3: "IOT",
  },
  {
    text: "British Virgin Islands",
    countryCodes: ["1-284"],
    value: "VG",
    isoCode3: "VGB",
  },
  {
    text: "Brunei",
    countryCodes: ["673"],
    value: "BN",
    isoCode3: "BRN",
  },
  {
    text: "Bulgaria",
    countryCodes: ["359"],
    value: "BG",
    isoCode3: "BGR",
  },
  {
    text: "Burkina Faso",
    countryCodes: ["226"],
    value: "BF",
    isoCode3: "BFA",
  },
  {
    text: "Burundi",
    countryCodes: ["257"],
    value: "BI",
    isoCode3: "BDI",
  },
  {
    text: "Cambodia",
    countryCodes: ["855"],
    value: "KH",
    isoCode3: "KHM",
  },
  {
    text: "Cameroon",
    countryCodes: ["237"],
    value: "CM",
    isoCode3: "CMR",
  },
  {
    text: "Canada",
    countryCodes: ["1"],
    value: "CA",
    isoCode3: "CAN",
  },
  {
    text: "Cape Verde",
    countryCodes: ["238"],
    value: "CV",
    isoCode3: "CPV",
  },
  {
    text: "Cayman Islands",
    countryCodes: ["1-345"],
    value: "KY",
    isoCode3: "CYM",
  },
  {
    text: "Central African Republic",
    countryCodes: ["236"],
    value: "CF",
    isoCode3: "CAF",
  },
  {
    text: "Chad",
    countryCodes: ["235"],
    value: "TD",
    isoCode3: "TCD",
  },
  {
    text: "Chile",
    countryCodes: ["56"],
    value: "CL",
    isoCode3: "CHL",
  },
  {
    text: "China",
    countryCodes: ["86"],
    value: "CN",
    isoCode3: "CHN",
  },
  {
    text: "Christmas Island",
    countryCodes: ["61"],
    value: "CX",
    isoCode3: "CXR",
  },
  {
    text: "Cocos Islands",
    countryCodes: ["61"],
    value: "CC",
    isoCode3: "CCK",
  },
  {
    text: "Colombia",
    countryCodes: ["57"],
    value: "CO",
    isoCode3: "COL",
  },
  {
    text: "Comoros",
    countryCodes: ["269"],
    value: "KM",
    isoCode3: "COM",
  },
  {
    text: "Cook Islands",
    countryCodes: ["682"],
    value: "CK",
    isoCode3: "COK",
  },
  {
    text: "Costa Rica",
    countryCodes: ["506"],
    value: "CR",
    isoCode3: "CRI",
  },
  {
    text: "Croatia",
    countryCodes: ["385"],
    value: "HR",
    isoCode3: "HRV",
  },
  {
    text: "Cuba",
    countryCodes: ["53"],
    value: "CU",
    isoCode3: "CUB",
  },
  {
    text: "Curacao",
    countryCodes: ["599"],
    value: "CW",
    isoCode3: "CUW",
  },
  {
    text: "Cyprus",
    countryCodes: ["357"],
    value: "CY",
    isoCode3: "CYP",
  },
  {
    text: "Czech Republic",
    countryCodes: ["420"],
    value: "CZ",
    isoCode3: "CZE",
  },
  {
    text: "Democratic Republic of the Congo",
    countryCodes: ["243"],
    value: "CD",
    isoCode3: "COD",
  },
  {
    text: "Denmark",
    countryCodes: ["45"],
    value: "DK",
    isoCode3: "DNK",
  },
  {
    text: "Djibouti",
    countryCodes: ["253"],
    value: "DJ",
    isoCode3: "DJI",
  },
  {
    text: "Dominica",
    countryCodes: ["1-767"],
    value: "DM",
    isoCode3: "DMA",
  },
  {
    text: "Dominican Republic",
    countryCodes: ["1-809", "1-829", "1-849"],
    value: "DO",
    isoCode3: "DOM",
  },
  {
    text: "East Timor",
    countryCodes: ["670"],
    value: "TL",
    isoCode3: "TLS",
  },
  {
    text: "Ecuador",
    countryCodes: ["593"],
    value: "EC",
    isoCode3: "ECU",
  },
  {
    text: "Egypt",
    countryCodes: ["20"],
    value: "EG",
    isoCode3: "EGY",
  },
  {
    text: "El Salvador",
    countryCodes: ["503"],
    value: "SV",
    isoCode3: "SLV",
  },
  {
    text: "Equatorial Guinea",
    countryCodes: ["240"],
    value: "GQ",
    isoCode3: "GNQ",
  },
  {
    text: "Eritrea",
    countryCodes: ["291"],
    value: "ER",
    isoCode3: "ERI",
  },
  {
    text: "Estonia",
    countryCodes: ["372"],
    value: "EE",
    isoCode3: "EST",
  },
  {
    text: "Ethiopia",
    countryCodes: ["251"],
    value: "ET",
    isoCode3: "ETH",
  },
  {
    text: "Falkland Islands",
    countryCodes: ["500"],
    value: "FK",
    isoCode3: "FLK",
  },
  {
    text: "Faroe Islands",
    countryCodes: ["298"],
    value: "FO",
    isoCode3: "FRO",
  },
  {
    text: "Fiji",
    countryCodes: ["679"],
    value: "FJ",
    isoCode3: "FJI",
  },
  {
    text: "Finland",
    countryCodes: ["358"],
    value: "FI",
    isoCode3: "FIN",
  },
  {
    text: "France",
    countryCodes: ["33"],
    value: "FR",
    isoCode3: "FRA",
  },
  {
    text: "French Polynesia",
    countryCodes: ["689"],
    value: "PF",
    isoCode3: "PYF",
  },
  {
    text: "Gabon",
    countryCodes: ["241"],
    value: "GA",
    isoCode3: "GAB",
  },
  {
    text: "Gambia",
    countryCodes: ["220"],
    value: "GM",
    isoCode3: "GMB",
  },
  {
    text: "Georgia",
    countryCodes: ["995"],
    value: "GE",
    isoCode3: "GEO",
  },
  {
    text: "Germany",
    countryCodes: ["49"],
    value: "DE",
    isoCode3: "DEU",
  },
  {
    text: "Ghana",
    countryCodes: ["233"],
    value: "GH",
    isoCode3: "GHA",
  },
  {
    text: "Gibraltar",
    countryCodes: ["350"],
    value: "GI",
    isoCode3: "GIB",
  },
  {
    text: "Greece",
    countryCodes: ["30"],
    value: "GR",
    isoCode3: "GRC",
  },
  {
    text: "Greenland",
    countryCodes: ["299"],
    value: "GL",
    isoCode3: "GRL",
  },
  {
    text: "Grenada",
    countryCodes: ["1-473"],
    value: "GD",
    isoCode3: "GRD",
  },
  {
    text: "Guam",
    countryCodes: ["1-671"],
    value: "GU",
    isoCode3: "GUM",
  },
  {
    text: "Guatemala",
    countryCodes: ["502"],
    value: "GT",
    isoCode3: "GTM",
  },
  {
    text: "Guernsey",
    countryCodes: ["44-1481"],
    value: "GG",
    isoCode3: "GGY",
  },
  {
    text: "Guinea",
    countryCodes: ["224"],
    value: "GN",
    isoCode3: "GIN",
  },
  {
    text: "Guinea-Bissau",
    countryCodes: ["245"],
    value: "GW",
    isoCode3: "GNB",
  },
  {
    text: "Guyana",
    countryCodes: ["592"],
    value: "GY",
    isoCode3: "GUY",
  },
  {
    text: "Haiti",
    countryCodes: ["509"],
    value: "HT",
    isoCode3: "HTI",
  },
  {
    text: "Honduras",
    countryCodes: ["504"],
    value: "HN",
    isoCode3: "HND",
  },
  {
    text: "Hong Kong",
    countryCodes: ["852"],
    value: "HK",
    isoCode3: "HKG",
  },
  {
    text: "Hungary",
    countryCodes: ["36"],
    value: "HU",
    isoCode3: "HUN",
  },
  {
    text: "Iceland",
    countryCodes: ["354"],
    value: "IS",
    isoCode3: "ISL",
  },
  {
    text: "India",
    countryCodes: ["91"],
    value: "IN",
    isoCode3: "IND",
  },
  {
    text: "Indonesia",
    countryCodes: ["62"],
    value: "ID",
    isoCode3: "IDN",
  },
  {
    text: "Iran",
    countryCodes: ["98"],
    value: "IR",
    isoCode3: "IRN",
  },
  {
    text: "Iraq",
    countryCodes: ["964"],
    value: "IQ",
    isoCode3: "IRQ",
  },
  {
    text: "Ireland",
    countryCodes: ["353"],
    value: "IE",
    isoCode3: "IRL",
  },
  {
    text: "Isle of Man",
    countryCodes: ["44-1624"],
    value: "IM",
    isoCode3: "IMN",
  },
  {
    text: "Israel",
    countryCodes: ["972"],
    value: "IL",
    isoCode3: "ISR",
  },
  {
    text: "Italy",
    countryCodes: ["39"],
    value: "IT",
    isoCode3: "ITA",
  },
  {
    text: "Ivory Coast",
    countryCodes: ["225"],
    value: "CI",
    isoCode3: "CIV",
  },
  {
    text: "Jamaica",
    countryCodes: ["1-876"],
    value: "JM",
    isoCode3: "JAM",
  },
  {
    text: "Japan",
    countryCodes: ["81"],
    value: "JP",
    isoCode3: "JPN",
  },
  {
    text: "Jersey",
    countryCodes: ["44-1534"],
    value: "JE",
    isoCode3: "JEY",
  },
  {
    text: "Jordan",
    countryCodes: ["962"],
    value: "JO",
    isoCode3: "JOR",
  },
  {
    text: "Kazakhstan",
    countryCodes: ["7"],
    value: "KZ",
    isoCode3: "KAZ",
  },
  {
    text: "Kenya",
    countryCodes: ["254"],
    value: "KE",
    isoCode3: "KEN",
  },
  {
    text: "Kiribati",
    countryCodes: ["686"],
    value: "KI",
    isoCode3: "KIR",
  },
  {
    text: "Kosovo",
    countryCodes: ["383"],
    value: "XK",
    isoCode3: "XKX",
  },
  {
    text: "Kuwait",
    countryCodes: ["965"],
    value: "KW",
    isoCode3: "KWT",
  },
  {
    text: "Kyrgyzstan",
    countryCodes: ["996"],
    value: "KG",
    isoCode3: "KGZ",
  },
  {
    text: "Laos",
    countryCodes: ["856"],
    value: "LA",
    isoCode3: "LAO",
  },
  {
    text: "Latvia",
    countryCodes: ["371"],
    value: "LV",
    isoCode3: "LVA",
  },
  {
    text: "Lebanon",
    countryCodes: ["961"],
    value: "LB",
    isoCode3: "LBN",
  },
  {
    text: "Lesotho",
    countryCodes: ["266"],
    value: "LS",
    isoCode3: "LSO",
  },
  {
    text: "Liberia",
    countryCodes: ["231"],
    value: "LR",
    isoCode3: "LBR",
  },
  {
    text: "Libya",
    countryCodes: ["218"],
    value: "LY",
    isoCode3: "LBY",
  },
  {
    text: "Liechtenstein",
    countryCodes: ["423"],
    value: "LI",
    isoCode3: "LIE",
  },
  {
    text: "Lithuania",
    countryCodes: ["370"],
    value: "LT",
    isoCode3: "LTU",
  },
  {
    text: "Luxembourg",
    countryCodes: ["352"],
    value: "LU",
    isoCode3: "LUX",
  },
  {
    text: "Macau",
    countryCodes: ["853"],
    value: "MO",
    isoCode3: "MAC",
  },
  {
    text: "Macedonia",
    countryCodes: ["389"],
    value: "MK",
    isoCode3: "MKD",
  },
  {
    text: "Madagascar",
    countryCodes: ["261"],
    value: "MG",
    isoCode3: "MDG",
  },
  {
    text: "Malawi",
    countryCodes: ["265"],
    value: "MW",
    isoCode3: "MWI",
  },
  {
    text: "Malaysia",
    countryCodes: ["60"],
    value: "MY",
    isoCode3: "MYS",
  },
  {
    text: "Maldives",
    countryCodes: ["960"],
    value: "MV",
    isoCode3: "MDV",
  },
  {
    text: "Mali",
    countryCodes: ["223"],
    value: "ML",
    isoCode3: "MLI",
  },
  {
    text: "Malta",
    countryCodes: ["356"],
    value: "MT",
    isoCode3: "MLT",
  },
  {
    text: "Marshall Islands",
    countryCodes: ["692"],
    value: "MH",
    isoCode3: "MHL",
  },
  {
    text: "Mauritania",
    countryCodes: ["222"],
    value: "MR",
    isoCode3: "MRT",
  },
  {
    text: "Mauritius",
    countryCodes: ["230"],
    value: "MU",
    isoCode3: "MUS",
  },
  {
    text: "Mayotte",
    countryCodes: ["262"],
    value: "YT",
    isoCode3: "MYT",
  },
  {
    text: "Mexico",
    countryCodes: ["52"],
    value: "MX",
    isoCode3: "MEX",
  },
  {
    text: "Micronesia",
    countryCodes: ["691"],
    value: "FM",
    isoCode3: "FSM",
  },
  {
    text: "Moldova",
    countryCodes: ["373"],
    value: "MD",
    isoCode3: "MDA",
  },
  {
    text: "Monaco",
    countryCodes: ["377"],
    value: "MC",
    isoCode3: "MCO",
  },
  {
    text: "Mongolia",
    countryCodes: ["976"],
    value: "MN",
    isoCode3: "MNG",
  },
  {
    text: "Montenegro",
    countryCodes: ["382"],
    value: "ME",
    isoCode3: "MNE",
  },
  {
    text: "Montserrat",
    countryCodes: ["1-664"],
    value: "MS",
    isoCode3: "MSR",
  },
  {
    text: "Morocco",
    countryCodes: ["212"],
    value: "MA",
    isoCode3: "MAR",
  },
  {
    text: "Mozambique",
    countryCodes: ["258"],
    value: "MZ",
    isoCode3: "MOZ",
  },
  {
    text: "Myanmar",
    countryCodes: ["95"],
    value: "MM",
    isoCode3: "MMR",
  },
  {
    text: "Namibia",
    countryCodes: ["264"],
    value: "NA",
    isoCode3: "NAM",
  },
  {
    text: "Nauru",
    countryCodes: ["674"],
    value: "NR",
    isoCode3: "NRU",
  },
  {
    text: "Nepal",
    countryCodes: ["977"],
    value: "NP",
    isoCode3: "NPL",
  },
  {
    text: "Netherlands",
    countryCodes: ["31"],
    value: "NL",
    isoCode3: "NLD",
  },
  {
    text: "Netherlands Antilles",
    countryCodes: ["599"],
    value: "AN",
    isoCode3: "ANT",
  },
  {
    text: "New Caledonia",
    countryCodes: ["687"],
    value: "NC",
    isoCode3: "NCL",
  },
  {
    text: "New Zealand",
    countryCodes: ["64"],
    value: "NZ",
    isoCode3: "NZL",
  },
  {
    text: "Nicaragua",
    countryCodes: ["505"],
    value: "NI",
    isoCode3: "NIC",
  },
  {
    text: "Niger",
    countryCodes: ["227"],
    value: "NE",
    isoCode3: "NER",
  },
  {
    text: "Nigeria",
    countryCodes: ["234"],
    value: "NG",
    isoCode3: "NGA",
  },
  {
    text: "Niue",
    countryCodes: ["683"],
    value: "NU",
    isoCode3: "NIU",
  },
  {
    text: "North Korea",
    countryCodes: ["850"],
    value: "KP",
    isoCode3: "PRK",
  },
  {
    text: "Northern Mariana Islands",
    countryCodes: ["1-670"],
    value: "MP",
    isoCode3: "MNP",
  },
  {
    text: "Norway",
    countryCodes: ["47"],
    value: "NO",
    isoCode3: "NOR",
  },
  {
    text: "Oman",
    countryCodes: ["968"],
    value: "OM",
    isoCode3: "OMN",
  },
  {
    text: "Pakistan",
    countryCodes: ["92"],
    value: "PK",
    isoCode3: "PAK",
  },
  {
    text: "Palau",
    countryCodes: ["680"],
    value: "PW",
    isoCode3: "PLW",
  },
  {
    text: "Palestine",
    countryCodes: ["970"],
    value: "PS",
    isoCode3: "PSE",
  },
  {
    text: "Panama",
    countryCodes: ["507"],
    value: "PA",
    isoCode3: "PAN",
  },
  {
    text: "Papua New Guinea",
    countryCodes: ["675"],
    value: "PG",
    isoCode3: "PNG",
  },
  {
    text: "Paraguay",
    countryCodes: ["595"],
    value: "PY",
    isoCode3: "PRY",
  },
  {
    text: "Peru",
    countryCodes: ["51"],
    value: "PE",
    isoCode3: "PER",
  },
  {
    text: "Philippines",
    countryCodes: ["63"],
    value: "PH",
    isoCode3: "PHL",
  },
  {
    text: "Pitcairn",
    countryCodes: ["64"],
    value: "PN",
    isoCode3: "PCN",
  },
  {
    text: "Poland",
    countryCodes: ["48"],
    value: "PL",
    isoCode3: "POL",
  },
  {
    text: "Portugal",
    countryCodes: ["351"],
    value: "PT",
    isoCode3: "PRT",
  },
  {
    text: "Puerto Rico",
    countryCodes: ["1-787", "1-939"],
    value: "PR",
    isoCode3: "PRI",
  },
  {
    text: "Qatar",
    countryCodes: ["974"],
    value: "QA",
    isoCode3: "QAT",
  },
  {
    text: "Republic of the Congo",
    countryCodes: ["242"],
    value: "CG",
    isoCode3: "COG",
  },
  {
    text: "Reunion",
    countryCodes: ["262"],
    value: "RE",
    isoCode3: "REU",
  },
  {
    text: "Romania",
    countryCodes: ["40"],
    value: "RO",
    isoCode3: "ROU",
  },
  {
    text: "Russia",
    countryCodes: ["7"],
    value: "RU",
    isoCode3: "RUS",
  },
  {
    text: "Rwanda",
    countryCodes: ["250"],
    value: "RW",
    isoCode3: "RWA",
  },
  {
    text: "Saint Barthelemy",
    countryCodes: ["590"],
    value: "BL",
    isoCode3: "BLM",
  },
  {
    text: "Saint Helena",
    countryCodes: ["290"],
    value: "SH",
    isoCode3: "SHN",
  },
  {
    text: "Saint Kitts and Nevis",
    countryCodes: ["1-869"],
    value: "KN",
    isoCode3: "KNA",
  },
  {
    text: "Saint Lucia",
    countryCodes: ["1-758"],
    value: "LC",
    isoCode3: "LCA",
  },
  {
    text: "Saint Martin",
    countryCodes: ["590"],
    value: "MF",
    isoCode3: "MAF",
  },
  {
    text: "Saint Pierre and Miquelon",
    countryCodes: ["508"],
    value: "PM",
    isoCode3: "SPM",
  },
  {
    text: "Saint Vincent and the Grenadines",
    countryCodes: ["1-784"],
    value: "VC",
    isoCode3: "VCT",
  },
  {
    text: "Samoa",
    countryCodes: ["685"],
    value: "WS",
    isoCode3: "WSM",
  },
  {
    text: "San Marino",
    countryCodes: ["378"],
    value: "SM",
    isoCode3: "SMR",
  },
  {
    text: "Sao Tome and Principe",
    countryCodes: ["239"],
    value: "ST",
    isoCode3: "STP",
  },
  {
    text: "Saudi Arabia",
    countryCodes: ["966"],
    value: "SA",
    isoCode3: "SAU",
  },
  {
    text: "Senegal",
    countryCodes: ["221"],
    value: "SN",
    isoCode3: "SEN",
  },
  {
    text: "Serbia",
    countryCodes: ["381"],
    value: "RS",
    isoCode3: "SRB",
  },
  {
    text: "Seychelles",
    countryCodes: ["248"],
    value: "SC",
    isoCode3: "SYC",
  },
  {
    text: "Sierra Leone",
    countryCodes: ["232"],
    value: "SL",
    isoCode3: "SLE",
  },
  {
    text: "Singapore",
    countryCodes: ["65"],
    value: "SG",
    isoCode3: "SGP",
  },
  {
    text: "Sint Maarten",
    countryCodes: ["1-721"],
    value: "SX",
    isoCode3: "SXM",
  },
  {
    text: "Slovakia",
    countryCodes: ["421"],
    value: "SK",
    isoCode3: "SVK",
  },
  {
    text: "Slovenia",
    countryCodes: ["386"],
    value: "SI",
    isoCode3: "SVN",
  },
  {
    text: "Solomon Islands",
    countryCodes: ["677"],
    value: "SB",
    isoCode3: "SLB",
  },
  {
    text: "Somalia",
    countryCodes: ["252"],
    value: "SO",
    isoCode3: "SOM",
  },
  {
    text: "South Africa",
    countryCodes: ["27"],
    value: "ZA",
    isoCode3: "ZAF",
  },
  {
    text: "South Korea",
    countryCodes: ["82"],
    value: "KR",
    isoCode3: "KOR",
  },
  {
    text: "South Sudan",
    countryCodes: ["211"],
    value: "SS",
    isoCode3: "SSD",
  },
  {
    text: "Spain",
    countryCodes: ["34"],
    value: "ES",
    isoCode3: "ESP",
  },
  {
    text: "Sri Lanka",
    countryCodes: ["94"],
    value: "LK",
    isoCode3: "LKA",
  },
  {
    text: "Sudan",
    countryCodes: ["249"],
    value: "SD",
    isoCode3: "SDN",
  },
  {
    text: "Suriname",
    countryCodes: ["597"],
    value: "SR",
    isoCode3: "SUR",
  },
  {
    text: "Svalbard and Jan Mayen",
    countryCodes: ["47"],
    value: "SJ",
    isoCode3: "SJM",
  },
  {
    text: "Swaziland",
    countryCodes: ["268"],
    value: "SZ",
    isoCode3: "SWZ",
  },
  {
    text: "Sweden",
    countryCodes: ["46"],
    value: "SE",
    isoCode3: "SWE",
  },
  {
    text: "Switzerland",
    countryCodes: ["41"],
    value: "CH",
    isoCode3: "CHE",
  },
  {
    text: "Syria",
    countryCodes: ["963"],
    value: "SY",
    isoCode3: "SYR",
  },
  {
    text: "Taiwan",
    countryCodes: ["886"],
    value: "TW",
    isoCode3: "TWN",
  },
  {
    text: "Tajikistan",
    countryCodes: ["992"],
    value: "TJ",
    isoCode3: "TJK",
  },
  {
    text: "Tanzania",
    countryCodes: ["255"],
    value: "TZ",
    isoCode3: "TZA",
  },
  {
    text: "Thailand",
    countryCodes: ["66"],
    value: "TH",
    isoCode3: "THA",
  },
  {
    text: "Togo",
    countryCodes: ["228"],
    value: "TG",
    isoCode3: "TGO",
  },
  {
    text: "Tokelau",
    countryCodes: ["690"],
    value: "TK",
    isoCode3: "TKL",
  },
  {
    text: "Tonga",
    countryCodes: ["676"],
    value: "TO",
    isoCode3: "TON",
  },
  {
    text: "Trinidad and Tobago",
    countryCodes: ["1-868"],
    value: "TT",
    isoCode3: "TTO",
  },
  {
    text: "Tunisia",
    countryCodes: ["216"],
    value: "TN",
    isoCode3: "TUN",
  },
  {
    text: "Turkey",
    countryCodes: ["90"],
    value: "TR",
    isoCode3: "TUR",
  },
  {
    text: "Turkmenistan",
    countryCodes: ["993"],
    value: "TM",
    isoCode3: "TKM",
  },
  {
    text: "Turks and Caicos Islands",
    countryCodes: ["1-649"],
    value: "TC",
    isoCode3: "TCA",
  },
  {
    text: "Tuvalu",
    countryCodes: ["688"],
    value: "TV",
    isoCode3: "TUV",
  },
  {
    text: "U.S. Virgin Islands",
    countryCodes: ["1-340"],
    value: "VI",
    isoCode3: "VIR",
  },
  {
    text: "Uganda",
    countryCodes: ["256"],
    value: "UG",
    isoCode3: "UGA",
  },
  {
    text: "Ukraine",
    countryCodes: ["380"],
    value: "UA",
    isoCode3: "UKR",
  },
  {
    text: "United Arab Emirates",
    countryCodes: ["971"],
    value: "AE",
    isoCode3: "ARE",
  },
  {
    text: "United Kingdom",
    countryCodes: ["44"],
    value: "GB",
    isoCode3: "GBR",
  },
  {
    text: "United States",
    countryCodes: ["1"],
    value: "US",
    isoCode3: "USA",
  },
  {
    text: "Uruguay",
    countryCodes: ["598"],
    value: "UY",
    isoCode3: "URY",
  },
  {
    text: "Uzbekistan",
    countryCodes: ["998"],
    value: "UZ",
    isoCode3: "UZB",
  },
  {
    text: "Vanuatu",
    countryCodes: ["678"],
    value: "VU",
    isoCode3: "VUT",
  },
  {
    text: "Vatican",
    countryCodes: ["379"],
    value: "VA",
    isoCode3: "VAT",
  },
  {
    text: "Venezuela",
    countryCodes: ["58"],
    value: "VE",
    isoCode3: "VEN",
  },
  {
    text: "Vietnam",
    countryCodes: ["84"],
    value: "VN",
    isoCode3: "VNM",
  },
  {
    text: "Wallis and Futuna",
    countryCodes: ["681"],
    value: "WF",
    isoCode3: "WLF",
  },
  {
    text: "Western Sahara",
    countryCodes: ["212"],
    value: "EH",
    isoCode3: "ESH",
  },
  {
    text: "Yemen",
    countryCodes: ["967"],
    value: "YE",
    isoCode3: "YEM",
  },
  {
    text: "Zambia",
    countryCodes: ["260"],
    value: "ZM",
    isoCode3: "ZMB",
  },
  {
    text: "Zimbabwe",
    countryCodes: ["263"],
    value: "ZW",
    isoCode3: "ZWE",
  },
];

export function getFormattedDate(date) {
  const date1 = new Date(date); // {object Date}
  const monthNames = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let year = date1.getFullYear();
  let month = monthNames[date1.getMonth()];
  let day = date1.getDate().toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
}

export const mobileNumberRegex =
  /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,}$/im;
