import { BarChart3, DollarSign, Plus, ShoppingCart, TrendingUp } from "lucide-react";
import { DashboardCard, Table } from "./DashboardContent";
import { useEffect, useState } from "react";
import { getAllCustomer } from "../Api/customer";
import { getAllItem } from "../Api/item";
import { placeorder } from "../Api/sales";
const Modal: React.FC<any> = ({
    isOpen,
    onClose,
    onSubmit,
    typeOfForm,
    customerData = {},
}) => {
    const [customer, setCustomer] = useState([]);
    const [item, setItem] = useState([]);
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getAllCustomer()
                const resItem = await getAllItem()
                console.log('the item', resItem)
                console.log('the custoemr', response)
                setItem(resItem)
                setCustomer(response)
            } catch (error) {

            }
        }
        fetchCustomers()
    }, [])
    const [selectedItemStock, setSelectedItemStock] = useState(null);
    const [selectedItemPrice,setSelectedItemPrice]=useState(null)
    const [stockCount,setStockCount]=useState(null)
    const handleItemChange = (event) => {
        const selectedItemId = event.target.value;
        const selectedItem = item.find((item) => item.id === selectedItemId);
        setSelectedItemStock(selectedItem?.stock || 0); // Update stock value or set to 0 if no item is found
        setSelectedItemPrice(selectedItem?.price||0);
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">{typeOfForm} Customer</h3>
                <form
                    onSubmit={async (e: any) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const customer = Object.fromEntries(formData.entries());
                        await onSubmit(customer, typeOfForm);
                    }}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Customer
                            </label>
                            <select

                                name="customer"

                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                {customer.length && customer.map(val => (


                                    <option value={val.id}>{val.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Item</label>
                            <select
                                name="item"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                onChange={handleItemChange} // Handle item change
                            >
                                <option value="">Select an item</option>
                                {item.length &&
                                    item.map((val) => (
                                        <option key={val.id} value={val.id}>
                                            {val.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                min={0}
                                onChange={(e)=>setStockCount(e.target.value)}
                                max={selectedItemStock} // Dynamically set max value
                                defaultValue={typeOfForm === "Edit" ? customerData.stock : ""}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            {selectedItemStock !== null && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Available stock: {selectedItemStock}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                 Price
                            </label>
                            <input
                                type="text"
                                name="price"
                                defaultValue={typeOfForm === 'Edit' ? customerData.price : ''}
                                required
                                value={selectedItemPrice}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                               Total Price
                            </label>
                            <input
                                type="text"
                                name="totalPrice"
                                defaultValue={typeOfForm === 'Edit' ? customerData.price : ''}
                                required
                                value={selectedItemPrice*stockCount}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {typeOfForm === 'Edit' ? 'Save Changes' : 'Apply'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const SalesContent = () => {
    const [modalType, setModalType] = useState<'Add' | 'Edit'>('Add');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const sales = [
        { id: 'SL001', customer: 'John Doe', items: 3, total: '$899', date: '2024-03-15' },
        { id: 'SL002', customer: 'Jane Smith', items: 2, total: '$459', date: '2024-03-14' },
        { id: 'SL003', customer: 'Mike Johnson', items: 5, total: '$1,299', date: '2024-03-13' },
    ];
    const handleAddCustomer = async (saleData: any, typeOfForm: string) => {
        console.log(saleData)
        if (typeOfForm === 'Add') {
          const response = await placeorder(saleData,saleData.customer);
            console.log(response,':placeorder')
      
        } 
        // else if (typeOfForm === 'Edit') {
        //   // Update logic for customer goes here
        //   console.log('Edit customer:', customer);
        //   const response = await editCustomer(customer,selectedCustomer.id)
        //   if(response){
        //     const res = await getAllCustomer();
        //     setCustomers(res);
        //   }
        // }
        setIsModalOpen(false);
    };
    const handleEditCustomer = (customer: any) => {
        setSelectedCustomer(customer);
        setModalType('Edit');
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Sales Overview</h2>
                <div className="flex space-x-4">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Reports</span>
                    </button>
                    <button onClick={() => {
                        setModalType('Add');
                        setSelectedCustomer(null);
                        setIsModalOpen(true);
                    }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>New Sale</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Total Sales"
                    value="$54,235"
                    trend="up"
                    trendValue="+14.5%"
                    icon={DollarSign}
                />
                <DashboardCard
                    title="Average Order Value"
                    value="$285"
                    trend="up"
                    trendValue="+5.2%"
                    icon={TrendingUp}
                />
                <DashboardCard
                    title="Orders"
                    value="854"
                    trend="up"
                    trendValue="+8.2%"
                    icon={ShoppingCart}
                />
            </div>

            <Table
                headers={['ID', 'Customer', 'Items', 'Total', 'Date']}
                data={sales}
                editModal={handleEditCustomer}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddCustomer}
                typeOfForm={modalType}
                customerData={selectedCustomer}
            />
        </div>
    );
};