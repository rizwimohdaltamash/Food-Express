import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { UtensilsCrossed, Rocket } from "lucide-react";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All fields are required!");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

            const q = query(
                collection(fireDB, "user"),
                where("uid", "==", users?.user?.uid)
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let user;
                QuerySnapshot.forEach((doc) => (user = doc.data()));
                localStorage.setItem("users", JSON.stringify(user));
                setUserLogin({ email: "", password: "" });
                toast.success("Login Successful �️");
                setLoading(false);

                if (user.role === "user") navigate("/");
                else navigate("/admin-dashboard");
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed ❌");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100">
            {loading && <Loader />}

            <div className="login_Form bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl border-2 border-orange-300 w-[85%] sm:w-[60%] lg:w-[30%] transition-transform hover:scale-[1.01] duration-300">

                {/* Heading */}
                <div className="mb-5 text-center">
                    <h2 className="text-3xl font-extrabold text-orange-600 flex items-center justify-center gap-2"><UtensilsCrossed className="w-8 h-8" /> FoodExpress Login</h2>
                    <p className="text-gray-600 text-sm mt-1">Welcome back! Ready to order?</p>
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={userLogin.email}
                        onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                        className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        value={userLogin.password}
                        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                        className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
                    />
                </div>

                {/* Login Button */}
                <div className="mb-5">
                    <button
                        type="button"
                        onClick={userLoginFunction}
                        className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-all w-full text-white py-2.5 font-semibold rounded-md shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        Login <Rocket className="w-5 h-5" />
                    </button>
                </div>

                {/* Signup Redirect */}
                <div className="text-center">
                    <p className="text-gray-700">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-orange-600 font-bold hover:underline">
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
