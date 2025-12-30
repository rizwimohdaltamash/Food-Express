import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from '../../components/admin/ProductDetails';
import UserDetail from '../../components/admin/UserDetail';
import UpdateOrderStatus from '../../components/admin/UpdateOrderStatus';
import { useContext } from 'react';
import myContext from '../../context/myContext';
import { CgProfile } from "react-icons/cg";
import { UtensilsCrossed } from "lucide-react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllProduct, getAllOrder, getAllUser } = context;
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-8">
                {/* Top Section */}
                <div className="px-5 mb-8">
                    <div className="bg-white/90 border-2 border-orange-300 rounded-2xl shadow-lg py-5 backdrop-blur-sm">
                        <div
                            className="text-orange-600 hover:text-orange-700 ml-6 cursor-pointer transition-colors"
                            onClick={() => navigate('/')}
                        >
                            <FaCircleArrowLeft size={28} />
                        </div>
                        <h1 className="text-center text-3xl font-extrabold text-orange-600 mt-2 flex items-center justify-center gap-2">
                            <UtensilsCrossed className="w-8 h-8" /> Restaurant Admin Panel
                        </h1>
                    </div>
                </div>

                {/* Admin Profile Card */}
                <div className="px-5 mb-10">
                    <div className="bg-white/80 border-2 border-orange-200 rounded-2xl shadow-lg py-6 px-4 text-gray-800 backdrop-blur-sm">
                        <div className="flex justify-center mb-3">
                            <CgProfile size={92} className="text-orange-600" />
                        </div>

                        <div className="space-y-2 text-center">
                            <h1 className="text-lg font-medium">
                                <span className="text-orange-600 font-semibold">Name: </span>{user?.name}
                            </h1>
                            <h1 className="text-lg font-medium">
                                <span className="text-orange-600 font-semibold">Email: </span>{user?.email}
                            </h1>
                            <h1 className="text-lg font-medium">
                                <span className="text-orange-600 font-semibold">Date: </span>{user?.date}
                            </h1>
                            <h1 className="text-lg font-medium">
                                <span className="text-orange-600 font-semibold">Role: </span>{user?.role}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Stats Tabs */}
                <div className="px-5">
                    <Tabs>
                        <TabList className="flex flex-wrap justify-center -m-4">
                            {/* Total Products */}
                            <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                                <div className="bg-white border-2 border-orange-200 hover:bg-orange-100 px-5 py-4 rounded-2xl shadow-md hover:shadow-xl transition-all text-center">
                                    <div className="text-orange-600 w-12 h-12 mb-2 inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket">
                                            <path d="m5 11 4-7" />
                                            <path d="m19 11-4-7" />
                                            <path d="M2 11h20" />
                                            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                            <path d="m9 11 1 9" />
                                            <path d="M4.5 15.5h15" />
                                            <path d="m15 11-1 9" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold text-orange-600">{getAllProduct.length}</h2>
                                    <p className="text-orange-600 font-semibold">Total Menu Items</p>
                                </div>
                            </Tab>

                            {/* User Orders */}
                            <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                                <div className="bg-white border-2 border-orange-200 hover:bg-orange-100 px-5 py-4 rounded-2xl shadow-md hover:shadow-xl transition-all text-center">
                                    <div className="text-orange-600 w-12 h-12 mb-2 inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-ordered">
                                            <line x1={10} x2={21} y1={6} y2={6} />
                                            <line x1={10} x2={21} y1={12} y2={12} />
                                            <line x1={10} x2={21} y1={18} y2={18} />
                                            <path d="M4 6h1v4" />
                                            <path d="M4 10h2" />
                                            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold text-orange-600">{getAllOrder.length}</h2>
                                    <p className="text-orange-600 font-semibold">Customer Orders</p>
                                </div>
                            </Tab>

                            {/* Total Users */}
                            <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                                <div className="bg-white border-2 border-orange-200 hover:bg-orange-100 px-5 py-4 rounded-2xl shadow-md hover:shadow-xl transition-all text-center">
                                    <div className="text-orange-600 w-12 h-12 mb-2 inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx={9} cy={7} r={4} />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold text-orange-600">{getAllUser.length}</h2>
                                    <p className="text-orange-600 font-semibold">Total Customers</p>
                                </div>
                            </Tab>
                        </TabList>

                        {/* Tab Panels */}
                        <TabPanel>
                            <ProductDetail />
                        </TabPanel>

                        <TabPanel>
                            <UpdateOrderStatus />
                        </TabPanel>

                        <TabPanel>
                            <UserDetail />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
