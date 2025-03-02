import { MenuItem, Select, TextField, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

export default function Onboarding() {

    const [businessType, setBusinessType] = useState("")

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

    const handleBusinessTypeChange = (event) => {
        setBusinessType(event.target.value)
    }

    return (
        <div className="relative flex flex-col justify-center items-center h-svh">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px] opacity-75"></div>

            <div className="p-10 flex flex-col gap-5 w-2/5 rounded-[20px] bg-gradient-to-b from-[rgba(240,240,240,0.10)] to-[rgba(242,242,242,0.40)] shadow-[0px_10px_20px_0px_rgba(63,140,255,0.15)] backdrop-blur-[4px]"> 
                <div> {/*text fields have to be surrounded by div otherwise there is a UI bug */}
                    <TextField required size="small" fullWidth label="Business name" variant="outlined" />
                </div>

                <div>
                    <TextField required size="small" fullWidth label="Address line" variant="outlined" />
                </div>

                <div className="flex gap-5">
                    <div className="w-full">
                        <FormControl fullWidth>
                            <InputLabel required id="demo-simple-select-label">Business type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={businessType}
                                label="Business type"
                                onChange={handleBusinessTypeChange}
                                required
                                size="small"
                            >
                                {businessTypes.map((type) => (
                                    <MenuItem value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="w-full">
                        <TextField required size="small" fullWidth label="Phone number" variant="outlined" />
                    </div>
                </div>

                <div>
                    <TextField required size="small" fullWidth label="Industry" variant="outlined" />
                </div>

                <div>
                    <TextField required size="small" fullWidth label="Web url" variant="outlined" />
                </div>
            </div>
        </div>
    )
}