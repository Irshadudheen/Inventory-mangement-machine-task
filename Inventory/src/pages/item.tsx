import { 
    Users, Package, TrendingUp, Home, Search, Plus, Filter,
    MoreVertical, Download, Trash2, Edit, Eye, ArrowUpRight,
    ArrowDownRight, DollarSign, ShoppingCart, BarChart3
  } from 'lucide-react';
  import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from 'recharts';
  const DashboardCard = ({ title, value, trend, icon: Icon, trendValue }) => (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
        </div>
        <div className="p-3 bg-gray-700 rounded-lg">
          <Icon className="h-6 w-6 text-blue-400" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {trend === 'up' ? (
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
        <span className={`text-sm ml-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trendValue}
        </span>
        <span className="text-gray-400 text-sm ml-2">vs last month</span>
      </div>
    </div>
  );
  const DataTable = ({ headers, data, onEdit, onDelete, onView }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-700">
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {cell}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onView(row)} className="text-gray-400 hover:text-white p-1">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button onClick={() => onEdit(row)} className="text-gray-400 hover:text-white p-1">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => onDelete(row)} className="text-gray-400 hover:text-white p-1">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
export const ItemsPage = () => {
    const items = [
      { id: 'ITM001', name: 'Product A', category: 'Electronics', stock: 45, price: '$299' },
      { id: 'ITM002', name: 'Product B', category: 'Furniture', stock: 12, price: '$599' },
      { id: 'ITM003', name: 'Product C', category: 'Clothing', stock: 89, price: '$49' },
    ];
  
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Inventory Items</h2>
          <div className="flex space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add Item</span>
            </button>
          </div>
        </div>
  
        {/* Item Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Items"
            value="432"
            trend="up"
            trendValue="+5.8%"
            icon={Package}
          />
          <DashboardCard
            title="Low Stock Items"
            value="12"
            trend="down"
            trendValue="-2.4%"
            icon={Package}
          />
          <DashboardCard
            title="Out of Stock"
            value="3"
            trend="down"
            trendValue="-1.2%"
            icon={Package}
          />
        </div>
  
        {/* Items Table */}
        <DataTable
          headers={['ID', 'Name', 'Category', 'Stock', 'Price']}
          data={items}
          onView={(item) => console.log('View', item)}
          onEdit={(item) => console.log('Edit', item)}
          onDelete={(item) => console.log('Delete', item)}
        />
      </div>
    );
  };
  