import {
  MenuItem,
  TextField,
  CircularProgress,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useRef, useState } from "react";
import logo from "../assets/Logo.png";
import {
  BusinessConfig,
  saveBusinessConfig,
} from "../firebase/FirestoreFunctions";
import OnboardingTextField from "../components/OnboardingTextField";
import { useAuthContext } from "../components/AuthContext";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLocalBusinessConfig } from "../firebase/AuthFunctions";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_LIBRARIES = ["places"];

export default function Onboarding() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { user, setBusinessConfig } = useAuthContext();

  const autocompleteRef = useRef(null);

  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [errorMsgs, setErrorMsgs] = useState({
    // error messages for each TextField
    businessName: null,
    address: null,
    phone: null,
    industry: null,
    webUrl: null,
  });

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [status, setStatus] = useState("DEFAULT");
  const { isGuest } = useAuthContext()
  const navigate = useNavigate();

  const businessTypes = [
    "Convenience/Grocery Store",
    "Flower Store",
    "Gift Shop",
    "Jewelry Store",
    "Book Store",
    "Butcher Shop",
    "Auto Parts Store",
    "Bicycle Store",
    "Clothing Store",
    "Electronics Store",
    "Food/Bakery Store",
    "Furniture Store",
    "Hardware Store",
    "Home Goods Store",
    "Liquor Store",
    "Pet Store",
    "Shoe Store",
    "Sporting Goods Store"
  ];

  const phoneRegex = /^(?:\+1\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              "https://maps.googleapis.com/maps/api/geocode/json",
              {
                params: {
                  latlng: `${latitude},${longitude}`,
                  key: GOOGLE_MAPS_API_KEY,
                },
              }
            );
            const newAddress =
              response.data.results[0]?.formatted_address ||
              "Location not found";
            setAddress(newAddress);
          } catch (error) {
            console.error("Error fetching address from location:", error);
          } finally {
            setIsFetchingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsFetchingLocation(false);
        }
      );
    } else {
      console.error("Geolocation not supported by browser.");
    }
  };

  const validateFields = () => {
    let valid = true;
    const newErrorMsgs = { ...errorMsgs };

    if (phone.trim().length > 0 && !phoneRegex.test(phone)) {
      // checks if valid phone number
      newErrorMsgs.phone = "Invalid phone number";
      valid = false;
    }

    setErrorMsgs(newErrorMsgs);
    return valid;
  };

  const handleBusinessTypeChange = (event) => {
    setBusinessType(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setStatus("LOADING");

    if (!validateFields()) {
      setStatus("DEFAULT");
      return;
    }

    const businessConfig = new BusinessConfig(
      businessName,
      address,
      businessType,
      phone,
      industry,
      webUrl
    );

    if (isGuest) {
      setLocalBusinessConfig(businessConfig)
    }
    else {
      await saveBusinessConfig(user.uid, businessConfig);
    }

    setBusinessConfig(businessConfig);
    setStatus("DEFAULT");
    navigate("/operator?onboarding=true");
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
    >
      <div className="relative flex flex-col justify-center items-center gap-10 h-svh">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px] opacity-75"></div>

        <img
          src={logo}
          alt="Logo"
          className="h-12 absolute top-10 left-10 bg-white"
        />

        <h1 className="font-bold text-sm py-2 px-4 bg-white text-[#3F8CFF] border-[1px] border-[#3F8CFF] rounded-[20px] bg-gradient-to-b from-[rgba(240,240,240,0.10)] to-[rgba(242,242,242,0.40)] shadow-[0px_10px_20px_0px_rgba(63,140,255,0.15)] backdrop-blur-[4px]">
          BASIC BUSINESS INFO
        </h1>

        <form
          onSubmit={handleFormSubmit}
          className="p-10 flex flex-col gap-5 w-4/5 md:w-3/5 lg:w-2/5 rounded-[20px] bg-gradient-to-b from-[rgba(240,240,240,0.10)] to-[rgba(242,242,242,0.40)] shadow-[0px_10px_20px_0px_rgba(63,140,255,0.15)] backdrop-blur-[4px]"
        >
          <OnboardingTextField
            required={true}
            errorMsg={errorMsgs.businessName}
            label="Business Name"
            setValue={setBusinessName}
          />

          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={() => {
              if (autocompleteRef.current) {
                const place = autocompleteRef.current.getPlace();
                if (place.formatted_address) {
                  setAddress(place.formatted_address);
                }
              }
            }}
          >
            <TextField
              fullWidth
              value={address}
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
              size="small"
            />
          </Autocomplete>

          <Button
            variant="outlined"
            color="primary"
            onClick={getCurrentLocation}
            fullWidth
            disabled={isFetchingLocation}
          >
            {isFetchingLocation ? "Fetching location..." : "Use My Location"}
          </Button>

          <div className={`flex ${isMobile ? "flex-col" : ""} gap-5`}>
            <div className="w-full">
              <TextField
                fullWidth
                select
                value={businessType}
                label="Business type"
                onChange={handleBusinessTypeChange}
                required
                size="small"
              >
                {businessTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="w-full">
              <OnboardingTextField
                required={false}
                errorMsg={errorMsgs.phone}
                label="Phone"
                setValue={setPhone}
              />
            </div>
          </div>

          <OnboardingTextField
            required={false}
            errorMsg={errorMsgs.industry}
            label="Industry"
            setValue={setIndustry}
          />

          <OnboardingTextField
            required={false}
            errorMsg={errorMsgs.webUrl}
            label="Web URL"
            setValue={setWebUrl}
          />

          <button
            disabled={status === "LOADING"}
            type="submit"
            className={`py-3 text-sm font-bold bg-[#3F8CFF] text-white rounded-md ${
              status === "DEFAULT" ? "hover:opacity-50" : ""
            }`}
          >
            {status === "LOADING" ? (
              <CircularProgress
                className="mt-1"
                color="white"
                size={16}
                thickness={5}
              />
            ) : (
              "CONTINUE"
            )}
          </button>
        </form>
      </div>
    </LoadScript>
  );
}
