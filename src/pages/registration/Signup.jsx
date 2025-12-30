import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { UtensilsCrossed, PartyPopper } from "lucide-react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All fields are required!");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            const userRef = collection(fireDB, "user");
            await addDoc(userRef, user);

            localStorage.setItem("users", JSON.stringify(user));
            setUserSignup({ name: "", email: "", password: "" });

            toast.success("Signup Successful �");
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Signup Failed ❌");
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100">
            {loading && <Loader />}

            <div className="signup_Form bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl border-2 border-orange-300 w-[85%] sm:w-[60%] lg:w-[30%] transition-transform hover:scale-[1.01] duration-300">

                {/* Heading */}
                <div className="mb-5 text-center">
                    <h2 className="text-3xl font-extrabold text-orange-600 flex items-center justify-center gap-2"><UtensilsCrossed className="w-8 h-8" /> Join FoodExpress</h2>
                    <p className="text-gray-600 text-sm mt-1">Start ordering delicious food today!</p>
                </div>

                {/* Name Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userSignup.name}
                        onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                        className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
                    />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={userSignup.email}
                        onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                        className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        value={userSignup.password}
                        onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
                        className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
                    />
                </div>

                {/* Signup Button */}
                <div className="mb-5">
                    <button
                        type="button"
                        onClick={userSignupFunction}
                        className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-all w-full text-white py-2.5 font-semibold rounded-md shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        Sign Up <PartyPopper className="w-5 h-5" />
                    </button>
                </div>

                {/* Login Redirect */}
                <div className="text-center">
                    <p className="text-gray-700">
                        Already have an account?{" "}
                        <Link to="/login" className="text-orange-600 font-bold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
