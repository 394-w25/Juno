import brownRibbon from "../../assets/brown-ribbon.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";

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
      className={`${
        inOperator == false
          ? "absolute w-[816px] h-[1056px]"
          : "absolute w-[816px] mt-9 ml-[34px] h-[1056px] scale-[0.2] origin-top-left"
      }`}
      style={
        isMobile && !inOperator
          ? { transform: "scale(0.55)", transformOrigin: "top left" }
          : switchToVertical && !inOperator
          ? { transform: "scale(0.75)", transformOrigin: "top left" }
          : !inOperator
          ? { transform: "scale(0.80)", transformOrigin: "top left" }
          : {}
      }
    >
      <img
        src={background}
        className="absolute object-cover w-full h-full "
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
          <h1 className="text-8xl text-left font-[Chewy] uppercase text-[#708395] w-4/5">
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
                  className={`absolute text-[#708395] font-[Chewy] text-center ${
                    discount.split(" ").length > 3 ? "text-4xl" : "text-7xl"
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
        <div className="flex flex-col items-center text-[#42311C]">
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
      </div>
    </div>
  );
}
