import { useContext, useEffect, useState } from "react"
import Context from "../context/Context"
import { useNavigate } from "react-router-dom"
import { PlusCircle, ShoppingBasket, BarChart } from "lucide-react"
import CreateProduct from "../components/admin/CreateProduct"
import Products from "../components/admin/Products"
import Analytics from "../components/admin/Analytics"


const tabs = [
    { id: 'create', label: 'Create Product', icon: PlusCircle },
    { id: 'products', label: 'Products', icon: ShoppingBasket },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
]

const AdminPage = () => {

    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('create')

    useEffect(() => {
        if (!user || !user.isAdmin) navigate('/')
    }, [])

    return (
        <div className="min-h-screen h-full relavtive bg-gray-800 text-white">
            <div className="flex flex-col gap-4 items-center p-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-4">
                    {tabs.map((tab) => (
                        <button
                            onClick={() => setActiveTab(tab.id)}
                            key={tab.id}
                            className={`flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-emerald-400 text-white hover:bg-emerald-500' : 'bg-gray-600 text-gray-300 hover:bg-gray-700'} p-2 rounded-md cursor-pointer`}>
                            <tab.icon />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
                {activeTab === 'create' && <CreateProduct />}
                {activeTab === 'products' && <Products />}
                {activeTab === 'analytics' && <Analytics />}
            </div>
        </div>
    )
}

export default AdminPage