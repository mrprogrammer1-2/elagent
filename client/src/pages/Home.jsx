import Hero from "../components/sections/Hero"
import Bento from "../components/sections/Bento"
import BestSeller from "../components/sections/BestSeller"
import Offers from "../components/sections/Offers"
import Discover from "../components/sections/Discover"

const Home = () => {
    return (
        <div>
            <Hero />
            <Bento />
            <BestSeller />
            <Offers />
            <Discover />
        </div>
    )
}

export default Home