import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Context from "../context/Context"
import { ArrowRight } from 'lucide-react'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
        navigate('/')
    }

    return (
        <section className="pt-16 md:pt-20 lg:pt-24 relative px-4 sm:px-6">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="bg-gray-200 rounded-xl md:rounded-2xl px-6 py-3 md:px-8 md:py-3.5 font-semibold text-xs sm:text-sm transition-all hover:opacity-90 cursor-pointer font-poppins text-center absolute top-4 left-4 sm:left-6"
            >
                Back
            </button>

            {/* Title */}
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-edu font-bold mb-5 sm:mb-6 md:mb-8">
                Login
            </h1>

            {/* Login Form */}
            <form
                className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl bg-gray-300 mx-auto py-5 sm:py-6 md:py-7 rounded-xl sm:rounded-2xl my-6 sm:my-8 md:my-10 px-5 sm:px-6 md:px-7 gap-3 sm:gap-4"
                onSubmit={handleSubmit}
            >
                {/* Email Input */}
                <div className="flex gap-1 sm:gap-2 flex-col">
                    <label htmlFor="email" className="text-sm sm:text-[1rem] font-medium text-gray-500">
                        Enter your Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="bg-white py-2 px-3 rounded-md transition-all border border-transparent focus:border-blue-400 outline-none text-sm sm:text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="flex gap-1 sm:gap-2 flex-col">
                    <label htmlFor="password" className="text-sm sm:text-[1rem] font-medium text-gray-500">
                        Enter your Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="bg-white py-2 px-3 rounded-md transition-all border border-transparent focus:border-blue-400 outline-none text-sm sm:text-base"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center mt-4 sm:mt-5">
                    <button className="bg-red-500 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 font-semibold text-lg sm:text-xl transition-all hover:opacity-90 cursor-pointer text-white font-poppins text-center rounded-lg">
                        Login
                    </button>
                </div>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm sm:text-base flex flex-col sm:flex-row justify-center items-center">
                <span>Don't have an account?</span>
                <button
                    className="text-blue-500 flex items-center text-center justify-center gap-1 sm:gap-2 ml-1"
                    onClick={() => navigate('/register')}
                >
                    Register <ArrowRight className="inline-block" size={14} sm:size={16} />
                </button>
            </p>
        </section>
    )
}

export default Login