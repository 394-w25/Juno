import { MenuItem, TextField, CircularProgress, useMediaQuery } from "@mui/material";
import { useState } from "react";
import logo from '../assets/Logo.png';
import { BusinessConfig, saveBusinessConfig } from "../firebase/FirestoreFunctions";
import { useNavigate } from "react-router-dom";
import OnboardingTextField from "../components/OnboardingTextField";
import { useAuthContext } from "../components/AuthContext";

export default function Onboarding() {

    const isMobile = useMediaQuery("(max-width: 600px)")

    const { user } = useAuthContext()

    const [businessName, setBusinessName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [industry, setIndustry] = useState("")
    const [webUrl, setWebUrl] = useState("")
    const [businessType, setBusinessType] = useState("")
    const [errorMsgs, setErrorMsgs] = useState({ // error messages for each TextField
        "businessName": null,
        "address": null,
        "phone": null,
        "industry": null,
        "webUrl": null,
    })

    const [status, setStatus] = useState("DEFAULT")
    const navigate = useNavigate()

    const businessTypes = [
        "Restaurant",
        "Retail",
        "E-commerce",
        "Manufacturing",
        "Healthcare",
        "Technology",
        "Real Estate",
        "Hospitality",
        "Consulting",
        "Marketing",
        "Legal Services",
        "Agriculture",
        "Nonprofit",
    ]

    const phoneRegex = /^(?:\+1\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const addressRegex = /^\d+\s[A-Za-z0-9\s.,#-]+(?:\s(Apt|Apartment|Unit|Suite|#)\s?\w*)?,\s[A-Za-z\s]+,\s(?:[A-Za-z]{2}|[A-Za-z\s]+),\s\d{5}(-\d{4})?,\s[A-Za-z\s]+$/;

    const validateFields = () => {
        let valid = true
        const newErrorMsgs = {...errorMsgs}

        if (!phoneRegex.test(phone)) { // checks if valid phone number
            newErrorMsgs.phone = "Invalid phone number"
            valid = false
        }

        if (!addressRegex.test(address)) { // checks if valid address
            newErrorMsgs.address = "Invalid address"
            valid = false
        }

        setErrorMsgs(newErrorMsgs)
        return valid
    }

    const handleBusinessTypeChange = (event) => {
        setBusinessType(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setStatus("LOADING")

        if (!validateFields()) {
            setStatus("DEFAULT")
            return
        }

        const businessConfig = new BusinessConfig(businessName, address, businessType, phone, industry, webUrl)
        await saveBusinessConfig(user.uid, businessConfig)
        setStatus("DEFAULT")
        navigate("/")
    }

    return (
        <div className="relative flex flex-col justify-center items-center gap-10 h-svh">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px] opacity-75"></div>

            <img src={logo} alt="Logo" className="h-12 absolute top-10 left-10 bg-white" />

            <h1 className="font-bold text-sm py-2 px-4 bg-white text-[#3F8CFF] border-[1px] border-[#3F8CFF] rounded-[20px] bg-gradient-to-b from-[rgba(240,240,240,0.10)] to-[rgba(242,242,242,0.40)] shadow-[0px_10px_20px_0px_rgba(63,140,255,0.15)] backdrop-blur-[4px]">
                BASIC BUSINESS INFO
            </h1>

            <form onSubmit={handleFormSubmit} className="p-10 flex flex-col gap-5 w-4/5 md:w-3/5 lg:w-2/5 rounded-[20px] bg-gradient-to-b from-[rgba(240,240,240,0.10)] to-[rgba(242,242,242,0.40)] shadow-[0px_10px_20px_0px_rgba(63,140,255,0.15)] backdrop-blur-[4px]">
                <OnboardingTextField errorMsg={errorMsgs.businessName} label="Business Name" setValue={setBusinessName} />

                <OnboardingTextField placeholder={"123 Main St., Los Angeles, CA, 90210, USA"} errorMsg={errorMsgs.address} label="Address Line" setValue={setAddress} />

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
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="w-full">
                        <OnboardingTextField errorMsg={errorMsgs.phone} label="Phone" setValue={setPhone} />
                    </div>
                </div>

                <OnboardingTextField errorMsg={errorMsgs.industry} label="Industry" setValue={setIndustry} />

                <OnboardingTextField errorMsg={errorMsgs.webUrl} label="Web URL" setValue={setWebUrl} />

                <button disabled={status === "LOADING"} type="submit" className={`py-3 text-sm font-bold bg-[#3F8CFF] text-white rounded-md ${status === "DEFAULT" ? "hover:opacity-50" : ""}`}>
                    {status === "LOADING" ? 
                        <CircularProgress
                            className="mt-1"
                            color="white"
                            size={16}
                            thickness={5}
                        />
                    :
                        "CONTINUE" 
                    }
                </button>
            </form>
        </div>
    )
}