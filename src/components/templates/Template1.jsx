import brownRibbon from "../../assets/brown-ribbon.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import backgroundImg from "../../assets/template_bg_img.png";

// FLYER TEMPLATE
export default function Template1({
  callToAction,
  isMobile,
  switchToVertical,
  campaignTitle,
  background,
  logo,
  discount,
  campaignDetail,
  campaignPeriod,
  productImage,
  website,
  phoneNumber,
  address,
  fontStyleProp,
  templateRef,
  inOperator = false
}) {
  const addressToGoogleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  /**
   * formats the date objects to display on the flyer
   * @param {object} timePeriod
   * @returns {string}
   */
  const formatPeriod = (timePeriod) => {
    if (timePeriod === null) {
      return "";
    }
    
    if (timePeriod.start_date === null || timePeriod.end_date === null) {
      return "";
    }

    const start_date = new Date(timePeriod.start_date);
    const end_date = new Date(timePeriod.end_date);

    const formatDate = (date) => {
      const month = date.getUTCMonth() + 1; // Months are zero-indexed
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      return `${month}/${day}/${year}`;
    };

    return `${formatDate(start_date)} - ${formatDate(end_date)}`;
  };
  
  return (
    <div
      className={`${inOperator == false ? "relative w-[816px] h-[1056px]" : "absolute w-[816px] mt-9 ml-[34px] h-[1056px] scale-[0.2] origin-top-left"}`}
      style={
        isMobile && !inOperator
          ? { transform: "scale(0.55)", transformOrigin: "top left" }
          : switchToVertical && !inOperator
          ? { transform: "scale(0.75)", transformOrigin: "top left" }
          : !inOperator ? { transform: "scale(0.80)", transformOrigin: "top left" } : {}
      }
      ref={templateRef}
    >
      <>
      <img
        src={backgroundImg}
        className="absolute object-cover w-full h-full"
      ></img>

      {/* COMPONENT: product image */}
      {/*outline outline-left outline-4 outline-brown outline-offset-4*/}
      {/* <img src={productImage} className="absolute right-0 bottom-0 object-cover w-1/2 h-3/4 [clip-path:ellipse(90%_90%_at_50%_100%)]"></img> */}

      <div className="relative h-full inset-0 flex flex-col justify-between py-14 items-center text-center">
        <div className="flex flex-col items-center gap-3 ">
          {/* COMPONENT: companyLogo */}
          {/* <img src={logo}></img> */}

          {/* COMPONENT: campaignTitle */}
          <h1 className="text-7xl font-serif font-light uppercase text-[#42311C] w-4/5">
            {campaignTitle}
          </h1>

          {/* COMPONENT: campaignPeriod */}
          <p className="text-xl font-black font-serif text-[#42311C]">
            {formatPeriod(campaignPeriod)}
          </p>
        </div>

        <div className="flex gap-5 flex-col justify-center items-center z-10">
          {/* COMPONENT: discount */}
          <p className="relative max-w-[700px] text-[#8c7c68] font-serif font-bold text-7xl text-center">
            {discount ? discount.toUpperCase() : ""}
          </p>
          {/* <div 
                        className={`relative w-[400px] rounded-full bg-red-400 flex flex-col justify-center`}
                    > */}
          {/* <img src={brownRibbon} className="object-cover absolute" /> */}

          {/* </div> */}

          {/* COMPONENT: campaign details */}
          <p className="relative max-w-[600px] text-[#1F1F1F] text-xl font-serif">
            {campaignDetail}
          </p>
        </div>

        {/* COMPONENT: call to actiion */}
        <p className="rounded-lg p-4 bg-[#8C5C35] text-white text-2xl font-serif px-10 tracking-wider z-10">
          {callToAction}
        </p>

        {/* CONTACT INFO */}
        <div className="flex flex-col items-center text-[#42311C] z-10">
          {phoneNumber !== "" && (
            <div className="flex gap-3 items-center">
              <LocalPhoneIcon className="!text-3xl" />
              <p className="text-xl">{phoneNumber}</p>
            </div>
          )}
          {address !== "" && (
            <div className="flex gap-3 items-center">
              <PlaceIcon className="!text-4xl" />
              <div className="text-xl">
                <a
                  href={addressToGoogleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {address}
                </a>
              </div>
            </div>
          )}
        </div>

        <div class="absolute bottom-0 right-0 w-[400px] h-[700px] z-0 rounded-t-full overflow-hidden opacity-35">
          <img
            src={productImage}
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      </>
    </div>
  );
}
