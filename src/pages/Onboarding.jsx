import { MenuItem, TextField, CircularProgress } from "@mui/material";
import { useState } from "react";
import logo from '../assets/Logo.png';
import { BusinessConfig, saveBusinessConfig } from "../firebase/FirestoreFunctions";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {

    const [businessName, setBusinessName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [industry, setIndustry] = useState("")
    const [webUrl, setWebUrl] = useState("")
    const [businessType, setBusinessType] = useState("")

    const [status, setStatus] = useState("DEFAULT")
    const navigate = useNavigate()

    const testUid = "dfkjaaeutwiouakjvsanvalktoiw"


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

    const handleInputChange = (event) => {
        const { name, value } = event.target

        switch (name) {
            case "businessName":
                setBusinessName(value)
                break
            case "address":
                setAddress(value)
                break
            case "phone":
                setPhone(value)
                break
            case "industry":
                setIndustry(value)
                break
            case "webUrl":
                setWebUrl(value)
                break
            default:
                break
        }
    }

    const handleBusinessTypeChange = (event) => {
        setBusinessType(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setStatus("LOADING")
        const businessConfig = new BusinessConfig(businessName, address, businessType, phone, industry, webUrl)
        await saveBusinessConfig(testUid, businessConfig)
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

            <form onSubmit={handleFormSubmit} className="p-10 flex flex-col gap-5 w-2/5 rounded-[20px] bg-gradient-to-b from-[rgba(240,240,240,0.10)] to-[rgba(242,242,242,0.40)] shadow-[0px_10px_20px_0px_rgba(63,140,255,0.15)] backdrop-blur-[4px]">
                <div> {/*text fields have to be surrounded by div otherwise there is a UI bug */}
                    <TextField onChange={handleInputChange} name="businessName" required size="small" fullWidth label="Business name" variant="outlined" />
                </div>

                <div>
                    <TextField onChange={handleInputChange} name="address" required size="small" fullWidth label="Address line" variant="outlined" />
                </div>

                <div className="flex gap-5">
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
                        <TextField onChange={handleInputChange} name="phone" required size="small" fullWidth label="Phone number" variant="outlined" />
                    </div>
                </div>

                <div>
                    <TextField onChange={handleInputChange} name="industry" required size="small" fullWidth label="Industry" variant="outlined" />
                </div>

                <div>
                    <TextField onChange={handleInputChange} name="webUrl" required size="small" fullWidth label="Web url" variant="outlined" />
                </div>

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