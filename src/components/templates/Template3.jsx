import brownRibbon from "../../assets/brown-ribbon.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import image from "../../assets/ProductImageTest.png";
import backgroundImg3 from "../../assets/template-background-4.png"

// FLYER TEMPLATE #2
export default function Template3({
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
  inOperator = false,
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
    console.log("time period: ", timePeriod);
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
    const formattedPeriod = `${formatDate(start_date)} - ${formatDate(
      end_date
    )}`;
    console.log("Final formatted period:", formattedPeriod); // Log the final period
    return `${formatDate(start_date)} - ${formatDate(end_date)}`;
  };

  return (
    <div
      ref={templateRef}
      className={`${inOperator == false ? "relative w-[816px] h-[1056px]" : "absolute w-[816px] mt-9 ml-[34px] h-[1056px] scale-[0.2] origin-top-left"}`}
      style={
        isMobile && !inOperator
        isMobile && !inOperator
          ? { transform: "scale(0.55)", transformOrigin: "top left" }
          : switchToVertical && !inOperator
          : switchToVertical && !inOperator
          ? { transform: "scale(0.75)", transformOrigin: "top left" }
          : !inOperator
          ? { transform: "scale(0.80)", transformOrigin: "top left" }
          : {}
      }
    >
      <img
        src={backgroundImg3}
        className="absolute object-cover w-full h-full"
      ></img>

      {/* COMPONENT: product image */}
      {/*outline outline-left outline-4 outline-brown outline-offset-4*/}
      {/* <img src={productImage} className="absolute right-0 bottom-0 object-cover w-1/2 h-3/4 [clip-path:ellipse(90%_90%_at_50%_100%)]"></img> */}

      <div className="relative h-full inset-0 flex flex-col justify-between py-14 items-center text-center">
        <div className="flex flex-col items-center gap-3 ">
          {/* COMPONENT: companyLogo */}
          {/* <img src={logo}></img> */}

          {/* COMPONENT: campaignPeriod */}
          <p className="text-xl font-[Chewy] text-[#42311C]">
            {formatPeriod(campaignPeriod)}
          </p>

          {/* COMPONENT: campaignTitle */}
          <h1 className="text-8xl text-left font-[Chewy] uppercase text-[#708395] max-w-[500px] break-words mt-8 mr-30">
            {campaignTitle}
          </h1>
        </div>

        <div className="flex flex-row">
          <div className="flex gap-5 justify-center items-center">
            <div className="relative w-[337px] h-[450px] flex flex-col justify-center items-center">
              <div className="relative w-100 h-100 flex items-center justify-center">
                <img
                  src={brownRibbon}
                  className="object-cover absolute w-100 h-100"
                />
                <p
                  className={`absolute text-[#708395] max-w-[300px] font-[Chewy] text-center ${
                    discount.split(" ").length > 3 ? "text-5xl" : "text-7xl"
                  }`}
                >
                  {discount}
                </p>
              </div>
            </div>

            {/* COMPONENT: campaign details */}
            <p className="pl-5 relative max-w-[250px] text-[#665E58] text-3xl font-[Chewy]">
              {campaignDetail}
            </p>
          </div>
        </div>
        {/* COMPONENT: call to actiion */}
        <p className="rounded-lg p-4 bg-[#f7cd6f] font-bold text-[#708395] text-2xl font-[Chewy] px-10 tracking-wider">
          {callToAction}
        </p>
        {/* CONTACT INFO */}
        <div className="flex flex-col items-center text-[#42311C] z-10">
          {phoneNumber !== "" && (
            <div className="flex gap-3 font-[Chewy] items-center">
              <LocalPhoneIcon className="!text-3xl" />
              <p className="text-xl">{phoneNumber}</p>
            </div>
          )}
          {address !== "" && (
            <div className="flex gap-3 font-[Chewy] font-light items-center">
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
        {productImage &&
        <div className="absolute bottom-0 right-0 w-[500px] h-[700px] overflow-hidden z-0 opacity-80">
          <div className="relative w-full h-full">
            <img
              src={productImage}
              className="object-cover w-full h-full"
              style={{
                clipPath: "path('M843.5661,587.1768c-4.2149-12.42-9.8699-27.8048-22.5371-32.7155c-0.6557-4.6918-0.9312-9.6286-2.8051-14.0629c18.9047-36.692,30.8483-84.1292,12.4396-123.2863c-6.2498-10.4922-14.6782-16.4003-25.2859-17.7249c-24.155,0.6358-48.3099,1.2715-72.4648,1.9071c22.8494-31.1424,37.9383-70.3003,38.3142-109.498c19.9748-73.5565,3.0109-137.4036-83.9756-136.1713c3.0488-28.9504-16.2932-70.0318-50.2829-58.055c-58.6433,13.6334-117.2877,27.2671-175.9319,40.9007c-91.3762,21.2431-182.7523,42.4863-274.1284,63.7294c-26.6419,9.3111-45.839,33.9311-58.6677,58.8443c-18.2313,9.8583-38.8575,14.1825-54.1462,29.1289c-39.3873,32.942-63.7713,99.885-53.8991,150.7601c4.6616,16.0171,14.2048,34.276,32.035,35.389c26.6593-1.2455,53.3178-2.5552,79.9743-3.917c-14.542,34.0073-29.2396,115.4331,20.39,125.6476c10.455,0.7775,20.9117,1.5156,31.3698,2.22c-6.5599,24.4846-5.7462,50.7122,5.1597,73.7324c9.3534,17.5956,26.3326,17.9656,43.0143,20.8163c-3.0047,26.3862,2.0536,69.1763,33.8084,73.7412c160.8733-4.4858,321.746-8.9707,482.6188-13.4557c25.021-50.3775-19.2893-133.7431-32.8057-187.5504z')",
                objectPosition: "center -100%",
              }}
              alt="Product"
            />
          </div>
        </div>}
      </div>
    </div>
  );
}
