const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative h-32 w-32">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-20 animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-30 animate-spin" style={{ animationDirection: 'reverse' }}></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-50 animate-spin"></div>
            </div>
        </div>
    )
}

export default Spinner