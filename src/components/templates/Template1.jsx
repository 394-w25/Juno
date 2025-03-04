import brownRibbon from "../../assets/brown-ribbon.png"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';

// FLYER TEMPLATE
export default function Template1({ callToAction, isMobile, switchToVertical, campaignTitle, background, logo, discount, campaignDetail, campaignPeriod, productImage, website, phoneNumber, address, fontStyleProp, templateRef }) {
    const addressToGoogleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    
    /**
     * formats the date objects to display on the flyer
     * @param {object} timePeriod 
     * @returns {string}
     */
    const formatPeriod = (timePeriod) => {
        if (timePeriod === null) {
            return ""
        }

        if (timePeriod.start_date === null || timePeriod.end_date === null) {
            return ""
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
    }

    return (
        <div 
            ref={templateRef}
            className="absolute w-[816px] h-[1056px]"
            style={isMobile ? { transform: "scale(0.55)", transformOrigin: "top left" } : switchToVertical ? {transform: "scale(0.75)", transformOrigin: "top left"} : {}}
        >
            
            <img src={background} className="absolute object-cover w-full h-full"></img>

            {/* COMPONENT: product image */}
            {/*outline outline-left outline-4 outline-brown outline-offset-4*/}
            {/* <img src={productImage} className="absolute right-0 bottom-0 object-cover w-1/2 h-3/4 [clip-path:ellipse(90%_90%_at_50%_100%)]"></img> */}

            <div className="relative h-full inset-0 flex flex-col justify-between py-10 items-center text-center">
                <div className="flex flex-col items-center gap-3 ">
                    {/* COMPONENT: companyLogo */}
                    <img src={logo}></img>

                    {/* COMPONENT: campaignTitle */}
                    <h1 className="text-7xl font-serif font-light uppercase text-[#42311C] w-4/5">{campaignTitle}</h1>

                    {/* COMPONENT: campaignPeriod */}
                    <p className="text-xl font-black font-serif text-[#42311C]">{formatPeriod(campaignPeriod)}</p>
                </div>

                <div className="flex gap-5 flex-col justify-center items-center">
                    {/* COMPONENT: discount */}
                    <p 
                        className="relative max-w-[700px] text-[#A6937C] font-serif font-semibold text-7xl text-center"
                    >
                        {discount ? discount.toUpperCase() : ""}
                    </p>
                    {/* <div 
                        className={`relative w-[400px] rounded-full bg-red-400 flex flex-col justify-center`}
                    > */}
                        {/* <img src={brownRibbon} className="object-cover absolute" /> */}

                        
                    {/* </div> */}

                    {/* COMPONENT: campaign details */}
                    <p className="relative max-w-[600px] text-[#665E58] text-xl font-serif ">{campaignDetail}</p>
                </div>

                

                {/* COMPONENT: call to actiion */}
                <p className="rounded-lg p-4 bg-[#8C5C35] text-white text-2xl font-serif px-10 tracking-wider">{callToAction}</p>

                {/* CONTACT INFO */}
                <div className="flex flex-col items-center text-[#42311C]">
                    <div className="flex gap-3 items-center">
                        <LocalPhoneIcon className="!text-3xl"/> 
                        <p className="text-xl">{phoneNumber}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <PlaceIcon className="!text-4xl"/>
                        <div className="text-xl">
                            <a href={addressToGoogleMapsLink} target="_blank" rel="noopener noreferrer">{address}</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}