import { Clock, Truck, Shield } from "lucide-react";

const Track = () => {
    return (
        <section className="bg-gradient-to-b from-orange-50 to-white py-10">
            <div className="container mx-auto px-5 py-10 md:py-14">
                {/* Heading */}
                <h2 className="text-center text-3xl font-bold text-orange-600 mb-10">
                    Why Choose <span className="text-red-500">FoodExpress?</span>
                </h2>
                
                {/* main */}
                <div className="flex flex-wrap -m-4 text-center">
                    {/* Track 1 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 hover:shadow-2xl hover:shadow-orange-200 border-orange-200 bg-white shadow-lg px-4 py-6 rounded-lg transition-all duration-300 hover:-translate-y-2">
                            <Clock className="text-orange-500 w-12 h-12 mb-3 mx-auto" />
                            <h2 className="title-font font-bold text-lg text-gray-900 mb-2">Fast Delivery</h2>
                            <p className="leading-relaxed text-gray-600">
                                Get your food delivered hot and fresh within 30 minutes or less!
                            </p>
                        </div>
                    </div>

                    {/* Track 2 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 hover:shadow-2xl hover:shadow-orange-200 border-orange-200 bg-white shadow-lg px-4 py-6 rounded-lg transition-all duration-300 hover:-translate-y-2">
                            <Truck className="text-orange-500 w-12 h-12 mb-3 mx-auto" />
                            <h2 className="title-font font-bold text-lg text-gray-900 mb-2">Live Tracking</h2>
                            <p className="leading-relaxed text-gray-600">
                                Track your order in real-time from restaurant to your doorstep.
                            </p>
                        </div>
                    </div>

                    {/* Track 3 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 hover:shadow-2xl hover:shadow-orange-200 border-orange-200 bg-white shadow-lg px-4 py-6 rounded-lg transition-all duration-300 hover:-translate-y-2">
                            <Shield className="text-orange-500 w-12 h-12 mb-3 mx-auto" />
                            <h2 className="title-font font-bold text-lg text-gray-900 mb-2">Quality Assured</h2>
                            <p className="leading-relaxed text-gray-600">
                                100% hygienic food from verified restaurants and cloud kitchens.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Track;