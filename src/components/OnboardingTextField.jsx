import { TextField } from "@mui/material";

/**
 * component for a textfield in the onboarding page
*/
export default function OnboardingTextField({ required, placeholder, errorMsg, label, setValue }) {

    const handleInputChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <div> {/*text fields have to be surrounded by div otherwise there is a UI bug */}
            <TextField placeholder={placeholder !== null ? placeholder : ""} error={errorMsg !== null} helperText={errorMsg === null ? "" : errorMsg} onChange={handleInputChange} required={required} size="small" fullWidth label={label} variant="outlined" />
        </div>
    )
}