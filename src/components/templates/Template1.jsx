import brownRibbon from "../../assets/brown-ribbon.png"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';
export default function Template1({campaignTitle, background, logo, discount, campaignDetail, campaignPeriod, productImage, website, phoneNumber, address, fontStyleProp}) {
    const addressToGoogleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    return (
        <div className="relative w-[816px] h-[1056px]">
            
            <img src={background} className="absolute object-cover w-full h-full"></img>

            {/* COMPONENT: product image */}
            {/*outline outline-left outline-4 outline-brown outline-offset-4*/}
            <img src={productImage} className="absolute right-0 bottom-0 object-cover w-1/2 h-3/4 [clip-path:ellipse(90%_90%_at_50%_100%)]"></img>

            {/* COMPONENT: campaign details */}
            <p className="absolute text-[#665E58] w-1/4 left-10 top-112 text-xl font-serif ">{campaignDetail}</p>

            <div className="absolute inset-0 flex flex-col justify-between py-15 items-center text-center">
                <div className="flex flex-col items-center gap-3">
                    {/* COMPONENT: companyLogo */}
                    <img src={logo}></img>

                    {/* COMPONENT: campaignTitle */}
                    <h1 className="text-8xl font-serif font-light uppercase text-[#42311C] w-4/5">{campaignTitle}</h1>

                    {/* COMPONENT: campaignPeriod */}
                    <p className="text-xl font-black font-serif text-[#42311C]">{campaignPeriod}</p>
                </div>

                {/* COMPONENT: discount */}
                <div className="relative w-[225px] h-[300px] flex flex-col justify-center">
                    <img src={brownRibbon} className="object-cover absolute" />

                    
                    <p className="relative text-[#8C5C35] font-mono font-semibold text-6xl text-clip">{discount}</p>
                </div>

                {/* COMPONENT: website link */}
                <div className="rounded-lg p-4 bg-[#8C5C35] text-white text-2xl font-serif px-10 tracking-wider">
                    <a href={website} target="_blank" rel="noopener noreferrer">SHOP NOW AT: {website}</a>
                </div>

                {/* CONTACT INFO */}
                <div className="flex flex-col items-start self-start mt-2">
                    <div className="flex gap-3 items-center text-2xl mb-3 ml-2">
                        <LocalPhoneIcon className="!text-4xl"/> 
                        <p>{phoneNumber}</p>
                    </div>
                    <div className="flex gap-0 items-center">
                        <PlaceIcon className="!text-5xl"/>
                        <div className="text-2xl w-75 ml-[-40px]">
                            <a href={addressToGoogleMapsLink} target="_blank" rel="noopener noreferrer">{address}</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}