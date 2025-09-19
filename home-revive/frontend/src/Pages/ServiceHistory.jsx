import React, { useState, useEffect } from 'react'
import { NavigationBar } from '../components/NavigationBar'
import { ordersAPI, authUtils } from '../utils/api'
import date_icon from '../assets/date_icon.png'
import location_icon from '../assets/location_icon.png'
import { useLocation } from 'react-router-dom';


export const ServiceHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const user = authUtils.getCurrentUser();
      
      if (!user) {
        setError('Please login to view your service history');
        setLoading(false);
        return;
      }

      const response = await ordersAPI.getUserOrders(user.id);
      setOrders(response.data.orders);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load service history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'cleaning':
        return '🧹';
      case 'repair':
        return '🔧';
      case 'painting':
        return '🎨';
      case 'plumbing':
        return '🚰';
      case 'electrical':
        return '⚡';
      default:
        return '🏠';
    }
  };

  if (loading) {
    return (
      <>
        <div><NavigationBar /></div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl">Loading your service history...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div><NavigationBar /></div>
      <div className="px-6 py-8 ml-[100px] mt-[30px]">
        <h1 className="[font-family:'Istok Web'] font-extrabold tracking-tight text-[40px] mb-[40px]">
          My Service History
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl text-gray-600 mb-2">No service history found</h3>
            <p className="text-gray-500">Your completed and scheduled services will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#A6A0B2]/26 rounded-lg w-[819px] h-[180px] shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                      <div className="text-4xl">
                      {getServiceIcon(order.serviceType)}
                    </div>                      
                    <div className="flex-1 ">
                      <p className="text-[20px] [font-family:'Istok web']  text-black mb-2">
                        {order.serviceName}
                      </p>
                      <div className="space-y-2 text-black">
                          <p className="flex items-center">
                            <span className="text-[20px] mr-2">
                              <img 
                               src={date_icon}
                               className="h-6 w-6 object-contain"
                                />
                            </span>
                            {formatDate(order.bookingDate)}
                          </p>
                          <div className="flex justify-start gap-[200px]">
                            <p className="flex text-[32px] [font-family:'Istok Web'] text-black items-center">
                             
                              ₹{order.price}
                            </p>
                            <p className="flex items-center text-[20px]">
                              <span className="font-medium mr-2">
                                <img 
                               src={location_icon}
                               className="h-6 w-6 object-contain"
                                />
                              </span>
                              {order.location}
                            </p>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Booked on {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};