import {useEffect, useRef} from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import backgroundImg from "../assets/template_bg_img.png";
import backgroundImg2 from "../assets/temp.png";
import logoImg from "../assets/template_logo.png";
import productImg from "../assets/ProductImageTest.png";
import { CircularProgress } from "@mui/material";
import { businessConfig } from "../pages/Creator";
import DownloadIcon from "@mui/icons-material/Download";
import { toPng } from "html-to-image";

const FlyerEditor = ({
  setMediaMode,
  mediaModes,
  mediaMode,
  status,
  campaignDetails,
  isMobile,
  switchToVertical,
}) => {
  useEffect(() => {
    console.log("Updated campaign details in FlyerEditor:", campaignDetails);
  }, [campaignDetails]);

  const handleMediaChange = (event, newAlignment) => {
    setMediaMode(newAlignment);
  };

  const templateRef = useRef(null);

  const downloadImage = async () => {
      if (!templateRef.current) { // flyer hasn't been created so return
        return
      } 
      
      toPng(templateRef.current, { height: 1150 })
        .then((dataUrl) => {
          const link = document.createElement("a")
          link.download = mediaMode == "FLYER" ? "flyer.png" : "social-post.png"
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.error("Failed to generate image:", err)
        })
  };

  return (
    <div
      className={`relative flex-grow ${
        switchToVertical === false && isMobile === false
          ? "h-full w-2/3"
          : "flex-grow-5 p-10"
      } flex ${
        switchToVertical === false ? "py-10" : ""
      } overflow-scroll bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px] pt-16`} // DO NOT USE justify-center SINCE IT WILL CLIP THE IMAGE ON THE LEFT SIDE
    >
      <button
        onClick={downloadImage}
        className="absolute top-1 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700"
      >
        <DownloadIcon /> {/* ✅ Small download icon */}
      </button>

      <div 
        className="absolute top-0 w-1/2 flex items-center justify-center z-50 pointer-events-none bg-white"
        style={{ left: "50%", transform: "translateX(-50%)" }} // centers the toggle 
      >
        <ToggleButtonGroup
          color="primary"
          value={mediaMode}
          exclusive
          onChange={handleMediaChange}
          fullWidth
          className="pointer-events-auto"
        >
          {mediaModes.map((mode) => (
            <ToggleButton key={mode} value={mode}>
              {mode}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <div className="flex-grow relative flex justify-center">
        {status === "LOADING" && (
          <CircularProgress
            className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white" 
            size={32}
            thickness={5}
          />
        )}
      </div>
        {status === "DEFAULT" &&
          campaignDetails !== null && ( // show flyer if not loading and campaignDetails are ready
            <>
              {mediaMode === "FLYER" ? (
                <Template1
                  templateRef={templateRef}
                  isMobile={isMobile}
                  callToAction={campaignDetails.call_to_action}
                  switchToVertical={switchToVertical}
                  campaignTitle={campaignDetails.campaign_title}
                  background={backgroundImg}
                  logo={logoImg}
                  discount={campaignDetails.discount}
                  campaignDetail={campaignDetails.campaign_detail}
                  campaignPeriod={campaignDetails.campaign_period}
                  productImage={productImg}
                  website={businessConfig.business_details.web_url}
                  phoneNumber={businessConfig.business_details.phone}
                  address={businessConfig.business_details.address}
                  fontStyleProp=""
                />
              ) : (
                <Template2
                  templateRef={templateRef}
                  isMobile={isMobile}
                  callToAction={campaignDetails.call_to_action}
                  switchToVertical={switchToVertical}
                  campaignTitle={campaignDetails.campaign_title}
                  background={backgroundImg2}
                  logo={logoImg}
                  discount={campaignDetails.discount}
                  campaignDetail={campaignDetails.campaign_detail}
                  campaignPeriod={campaignDetails.campaign_period}
                  productImage={productImg}
                  website={businessConfig.business_details.web_url}
                  phoneNumber={businessConfig.business_details.phone}
                  address={businessConfig.business_details.address}
                  fontStyleProp=""
                />
              )}
            </>
          )}
       
      </div>

  );
};

export default FlyerEditor;
