import React,{ useState } from "react";
import { UtensilsCrossed, MapPin, CreditCard } from "lucide-react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleClickEffect = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 300); // Reset effect after animation
    };

    const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


    return (
        <>
            <button
                type="button"
                onClick={() => {
                    handleClickEffect();
                    handleOpen();
                }}
                className={`w-full px-4 py-3 text-center text-white bg-orange-500 border border-transparent hover:border-orange-600 hover:bg-orange-600 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 ${
                    clicked ? (isMobile() ? "animate-bounce" : "ripple-effect") : ""
                }`}
            >
                Place Order <UtensilsCrossed className="w-5 h-5" />
            </button>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">Delivery Details <MapPin className="w-6 h-6" /></h2>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="name"
                                value={addressInfo.name}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        name: e.target.value
                                    })
                                }}
                                placeholder="Enter your name"
                                className="bg-orange-50 border-2 border-orange-200 px-4 py-2 w-full rounded-md outline-none text-gray-800 placeholder-gray-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="address"
                                value={addressInfo.address}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        address: e.target.value
                                    })
                                }}
                                placeholder="Enter your address"
                                className="bg-orange-50 border-2 border-orange-200 px-4 py-2 w-full rounded-md outline-none text-gray-800 placeholder-gray-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                name="pincode"
                                value={addressInfo.pincode}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        pincode: e.target.value
                                    })
                                }}
                                placeholder="Enter your pincode"
                                className="bg-orange-50 border-2 border-orange-200 px-4 py-2 w-full rounded-md outline-none text-gray-800 placeholder-gray-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="mobileNumber"
                                value={addressInfo.mobileNumber}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        mobileNumber: e.target.value
                                    })
                                }}
                                placeholder="Enter your mobile number"
                                className="bg-orange-50 border-2 border-orange-200 px-4 py-2 w-full rounded-md outline-none text-gray-800 placeholder-gray-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="flex justify-between gap-3">
                            <button
                                type="button"
                                onClick={handleOpen}
                                className="px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleOpen();
                                    buyNowFunction();
                                }}
                                className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold shadow-md flex items-center gap-2"
                            >
                                Pay Now <CreditCard className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BuyNowModal;

