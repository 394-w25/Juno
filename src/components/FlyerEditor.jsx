import { useEffect, useRef, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import backgroundImg from "../assets/template_bg_img.png";
import backgroundImg3 from "../assets/template-background-4.png";
import Template3 from "./templates/Template3";
import backgroundImg2 from "../assets/temp.png";
import { CircularProgress } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { toPng } from "html-to-image";
import { CampaignDetail } from "../gemini/GeminiFunctions";
import { useAuthContext } from "./AuthContext";

/**
 * @typedef {Object} FlyerEditorProps
 * @property {React.Dispatch<React.SetStateAction<string>>} setMediaMode
 * @property {[string]} mediaModes
 * @property {string} mediaMode
 * @property {string} status
 * @property {CampaignDetail} campaignDetails
 * @property {boolean} isMobile
 * @property {boolean} switchToVertical
 */

/** @param {FlyerEditorProps} props */
const FlyerEditor = ({
  setMediaMode,
  mediaModes,
  mediaMode,
  status,
  campaignDetails,
  isMobile,
  switchToVertical,
  uploadedImage
}) => {

  const handleMediaChange = (event, newAlignment) => {
    setMediaMode(newAlignment);
  };

  const [scale, setScale] = useState(1);
  const templateRef = useRef(null);
  const { businessConfig } = useAuthContext();

  useEffect(() => {
    const updateScale = () => {
      const baseHeight = 1400;
      const newScale = Math.min(1, window.innerHeight / baseHeight);
      setScale(newScale);
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  const downloadImage = async () => {
    if (!templateRef.current) {
      // flyer hasn't been created so return
      return;
    }

    toPng(templateRef.current, { height: 1056 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        if (mediaMode === "FLYER") {
          link.download = "flyer.png";
        } else if (mediaMode === "FLYER2") {
          link.download = "flyer2.png";
        } else {
          link.download = "social-post.png";
        }
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to generate image:", err);
      });
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
        className="fixed top-21 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700"
      >
        <DownloadIcon />
      </button>

      <div 
        className="relative flex flex-col items-center w-full" 
      >
        <div 
          className="fixed top-20 w-1/2 flex items-center justify-center z-50 bg-white"
        >
        <BottomNavigation
          value={mediaMode}
          onChange={handleMediaChange}
          showLabels
          className="absolute top-0 w-1/2 flex items-center justify-center z-50 bg-white pointer-events-auto"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          {mediaModes.map((mode) => (
            <BottomNavigationAction
              key={mode}
              label={mode}
              value={mode}
              style={{
                height: "40px",
                minWidth: "80px",
                fontSize: 100,
                marginRight: "-2px",
                border: "1px solid lightgray",
              }}
            >
              {mode}
            </BottomNavigationAction>
          ))}
        </BottomNavigation>
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

        <div 
          className="absolute top-[7rem] flex justify-center items-center 
                    w-[90vw] md:w-[60vw] h-auto max-h-[80vh] 
                    transition-transform duration-60"
          style={{ transformOrigin: "top center", transform: `scale(${scale})` }}
        >
      {status === "DEFAULT" && campaignDetails && (
        <>
          {mediaMode === "FLYER" && (
            <Template1
              templateRef={templateRef}
              isMobile={isMobile}
              callToAction={campaignDetails.call_to_action}
              switchToVertical={switchToVertical}
              campaignTitle={campaignDetails.campaign_title}
              background={backgroundImg}
              logo={null}
              discount={campaignDetails.discount}
              campaignDetail={campaignDetails.campaign_detail}
              campaignPeriod={{
                start_date: campaignDetails.start_date,
                end_date: campaignDetails.end_date,
              }}
              productImage={uploadedImage}
              website={businessConfig.web_url}
              phoneNumber={businessConfig.phone}
              address={businessConfig.address}
              fontStyleProp=""
            />
          )}

          {mediaMode === "FLYER2" && (
            <Template3
              templateRef={templateRef}
              isMobile={isMobile}
              callToAction={campaignDetails.call_to_action}
              switchToVertical={switchToVertical}
              campaignTitle={campaignDetails.campaign_title}
              background={backgroundImg3}
              logo={null}
              discount={campaignDetails.discount}
              campaignDetail={campaignDetails.campaign_detail}
              campaignPeriod={{
                start_date: campaignDetails.start_date,
                end_date: campaignDetails.end_date,
              }}
              productImage={uploadedImage}
              website={businessConfig.web_url}
              phoneNumber={businessConfig.phone}
              address={businessConfig.address}
              fontStyleProp=""
            />
          )}

          {mediaMode === "SOCIAL POSTS" && (
            <Template2
              templateRef={templateRef}
              isMobile={isMobile}
              callToAction={campaignDetails.call_to_action}
              switchToVertical={switchToVertical}
              campaignTitle={campaignDetails.campaign_title}
              background={backgroundImg2}
              logo={null}
              discount={campaignDetails.discount}
              campaignDetail={campaignDetails.campaign_detail}
              campaignPeriod={{
                start_date: campaignDetails.start_date,
                end_date: campaignDetails.end_date,
              }}
              productImage={uploadedImage}
              website={businessConfig.web_url}
              phoneNumber={businessConfig.phone}
              address={businessConfig.address}
              fontStyleProp=""
            />
          )}
        </>
      )}
        </div>
        </div>
        </div>
  );
};

export default FlyerEditor;
