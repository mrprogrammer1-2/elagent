import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from '../api/axios'
import { ArrowRight } from 'lucide-react'

const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (password !== reEnterPassword) {
                alert("Passwords do not match")
                return
            }

            const user = { name, email, password }
            await api.post('/users/register', user)
                .then(res => navigate('/login'))
                .catch(err => {
                    console.error(err)
                    alert("Registration failed. Please try again.")
                })
        } catch (error) {
            console.error("Error during registration:", error)
            alert("An error occurred. Please try again.")
        }
    }

    return (
        <section className="min-h-screen pt-16 md:pt-20 lg:pt-24 relative px-4 sm:px-6 pb-10">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="bg-gray-200 rounded-xl md:rounded-2xl px-6 py-3 md:px-8 md:py-3.5 font-semibold text-xs sm:text-sm transition-all hover:opacity-90 cursor-pointer font-poppins text-center absolute top-4 left-4 sm:left-6"
            >
                Back
            </button>

            {/* Title */}
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-edu font-bold mb-6 sm:mb-8 md:mb-10">
                Register
            </h1>

            {/* Registration Form */}
            <form
                className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl bg-gray-300 mx-auto py-5 sm:py-6 md:py-7 rounded-xl sm:rounded-2xl my-6 sm:my-8 md:my-10 px-5 sm:px-6 md:px-7 gap-3 sm:gap-4"
                onSubmit={handleSubmit}
            >
                {/* Username Input */}
                <div className="flex gap-1 sm:gap-2 flex-col">
                    <label htmlFor="name" className="text-sm sm:text-[1rem] font-medium text-gray-500">
                        Enter your username:
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Username"
                        className="bg-white py-2 px-3 rounded-md transition-all border border-transparent focus:border-blue-400 outline-none text-sm sm:text-base"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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

                {/* Confirm Password Input */}
                <div className="flex gap-1 sm:gap-2 flex-col">
                    <label htmlFor="repassword" className="text-sm sm:text-[1rem] font-medium text-gray-500">
                        Confirm your Password:
                    </label>
                    <input
                        type="password"
                        id="repassword"
                        placeholder="Re-enter Password"
                        className="bg-white py-2 px-3 rounded-md transition-all border border-transparent focus:border-blue-400 outline-none text-sm sm:text-base"
                        value={reEnterPassword}
                        onChange={(e) => setReEnterPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center mt-4 sm:mt-5">
                    <button
                        type="submit"
                        className="bg-red-500 w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 font-semibold text-lg sm:text-xl transition-all hover:opacity-90 cursor-pointer text-white font-poppins text-center rounded-lg"
                    >
                        Sign up
                    </button>
                </div>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm sm:text-base flex flex-col sm:flex-row justify-center items-center">
                <span>Already have an account?</span>
                <button
                    className="text-blue-500 flex items-center justify-center gap-1 sm:gap-2 ml-1"
                    onClick={() => navigate('/login')}
                >
                    Login <ArrowRight className="inline-block" size={14} sm:size={16} />
                </button>
            </p>
        </section>
    )
}

export default Register