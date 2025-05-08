import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ViewOrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8070/order');
                const data = await response.json();
                if (data.orders) {
                    setOrders(data.orders);
                    setFilteredOrders(data.orders);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        const results = orders.filter(order =>
            Object.values(order).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredOrders(results);
    }, [searchTerm, orders]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f8f9fa'
            }}>
                Loading orders...
            </div>
        );
    }

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
            marginLeft: '350px',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px',
                paddingBottom: '15px',
                borderBottom: '2px solid #e0e0e0'
            }}>
                <button 
                    onClick={handleGoBack}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 15px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
                >
                    <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
                    Back
                </button>
                
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#343a40',
                    margin: 0,
                    textAlign: 'center',
                    flex: 1
                }}>
                    Recent Orders
                </h1>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '20px'
            }}>
                <div style={{
                    position: 'relative',
                    width: '350px'
                }}>
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 15px 12px 40px',
                            borderRadius: '6px',
                            border: '1px solid #ced4da',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                            outline: 'none',
                            transition: 'all 0.3s',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                    />
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        style={{
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#6c757d',
                            fontSize: '16px'
                        }} 
                    />
                </div>
            </div>

            <div style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                marginBottom: '20px'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '15px'
                }}>
                    <thead>
                        <tr style={{
                            backgroundColor: '#28a745',
                            color: 'white'
                        }}>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Full Name</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Delivery Address</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Contact</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Tea Type</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Quantity</th>
                            <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, index) => (
                                <tr key={order._id} style={{
                                    borderBottom: '1px solid #e9ecef',
                                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                                    transition: 'background 0.2s'
                                }}>
                                    <td style={{ padding: '15px', color: '#495057', fontWeight: '500' }}>{order.Full_Name}</td>
                                    <td style={{ padding: '15px', color: '#495057' }}>{order.Delivery_Address}</td>
                                    <td style={{ padding: '15px', color: '#495057' }}>{order.Contact_Number}</td>
                                    <td style={{ padding: '15px', color: '#495057' }}>{order.Email_Address}</td>
                                    <td style={{ padding: '15px', color: '#495057' }}>{order.Select_Tea_Type}</td>
                                    <td style={{ padding: '15px', color: '#495057', textAlign: 'center' }}>{order.Quantity}</td>
                                    <td style={{ padding: '15px', color: '#28a745', fontWeight: '600' }}>
                                        Rs. {Number(order.Price).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{
                                    padding: '25px',
                                    textAlign: 'center',
                                    color: '#6c757d',
                                    fontStyle: 'italic',
                                    backgroundColor: '#f8f9fa'
                                }}>
                                    No orders found matching your search criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 15px',
                backgroundColor: '#e9ecef',
                borderRadius: '5px',
                fontSize: '14px',
                color: '#495057'
            }}>
                <div>
                    Showing <strong>{filteredOrders.length}</strong> of <strong>{orders.length}</strong> orders
                </div>
                <div style={{ fontStyle: 'italic' }}>
                    {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default ViewOrderDetails;
