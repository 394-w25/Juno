import {useEffect, useRef} from "react";
import html2canvas from "html2canvas";
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
import logoImg from "../assets/template_logo.png";
import productImg from "../assets/ProductImageTest.png";
import { CircularProgress } from "@mui/material";
import { businessConfig } from "../pages/Creator";
import DownloadIcon from "@mui/icons-material/Download";

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
    console.log(templateRef)
      if (!templateRef.current) return;

      try {
          await document.fonts.ready;
          const canvas = await html2canvas(templateRef.current, { scale: 3, useCORS: true });
          const image = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = image;
          link.download = "flyer.png";
          link.click();
      } catch (error) {
          console.error("Failed to generate image:", error);
      }
  };

  return (
    <div
      className={`relative  flex-grow ${
        switchToVertical === false && isMobile === false
          ? "h-full w-2/3"
          : "flex-grow-5 p-10"
      } flex ${
        switchToVertical === false ? "py-10 justify-center" : ""
      } overflow-auto bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px] pt-16`}
    >
      <button
        onClick={downloadImage}
        className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700"
      >
        <DownloadIcon /> {/* ✅ Small download icon */}
      </button>

      {/* div below creates the grid of circles using a background image */}
      {/* <div className={`absolute ${showFlyer === "loading" ? `opacity-30` : "opacity-75"} z-0 inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px]`}></div> */}
      <div className="absolute top-0 w-1/2 flex items-center justify-center z-50 pointer-events-none bg-white">
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
              )}
            </>
          )}
       
      </div>

  );
};

export default FlyerEditor;
