import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ViewOrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8070/order');
                const data = await response.json();
                if (data.orders) {
                    setOrders(data.orders);
                    setFilteredOrders(data.orders);
                    // Calculate initial total price
                    const sum = data.orders.reduce((acc, order) => acc + Number(order.Price), 0);
                    setTotalPrice(sum);
                    // Store in localStorage
                    localStorage.setItem('orderTotalIncome', sum.toString());
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
        // Recalculate total price when filtered results change
        const sum = results.reduce((acc, order) => acc + Number(order.Price), 0);
        setTotalPrice(sum);
        // Update localStorage
        localStorage.setItem('orderTotalIncome', sum.toString());
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
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#f2f4f7'
            }}>
                Loading orders...
            </div>
        );
    }

    return (
        <div style={{
            fontFamily: 'Inter, sans-serif',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px',
            backgroundColor: '#f2f4f7',
            minHeight: '100vh',
            marginLeft: '140px',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
            }}>
                <button
                    onClick={handleGoBack}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#dee2e6',
                        color: '#212529',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 18px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ced4da'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dee2e6'}
                >
                    <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
                    Back
                </button>

                <h1 style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '30px',
                    fontWeight: '700',
                    color: '#2c3e50',
                    margin: 0
                }}>
                    Customer Orders
                </h1>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '25px'
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
                            padding: '12px 16px 12px 42px',
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            fontSize: '15px',
                            outline: 'none',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)'
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#6c757d',
                            fontSize: '16px'
                        }}
                    />
                </div>
            </div>

            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '15px'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#198754', color: 'white' }}>
                            <th style={headerStyle}>Full Name</th>
                            <th style={headerStyle}>Address</th>
                            <th style={headerStyle}>Contact</th>
                            <th style={headerStyle}>Email</th>
                            <th style={headerStyle}>Tea Type</th>
                            <th style={headerStyle}>Quantity</th>
                            <th style={headerStyle}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            <>
                                {filteredOrders.map((order, index) => (
                                    <tr
                                        key={order._id}
                                        style={{
                                            backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                            borderBottom: '1px solid #e5e5e5'
                                        }}
                                    >
                                        <td style={cellStyle}>{order.Full_Name}</td>
                                        <td style={cellStyle}>{order.Delivery_Address}</td>
                                        <td style={cellStyle}>{order.Contact_Number}</td>
                                        <td style={cellStyle}>{order.Email_Address}</td>
                                        <td style={cellStyle}>{order.Select_Tea_Type}</td>
                                        <td style={{ ...cellStyle, textAlign: 'center' }}>{order.Quantity}</td>
                                        <td style={{ ...cellStyle, color: '#28a745', fontWeight: '600' }}>
                                            Rs. {Number(order.Price).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                <tr style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold' }}>
                                    <td colSpan="6" style={{ ...cellStyle, textAlign: 'right' }}>
                                        Total:
                                    </td>
                                    <td style={{ ...cellStyle, color: '#28a745', fontWeight: '700' }}>
                                        Rs. {totalPrice.toLocaleString()}
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <tr>
                                <td colSpan="7" style={{
                                    padding: '25px',
                                    textAlign: 'center',
                                    color: '#6c757d',
                                    backgroundColor: '#f2f2f2',
                                    fontStyle: 'italic'
                                }}>
                                    No orders found matching your search criteria.
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
                padding: '16px 24px',
                marginTop: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
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

const headerStyle = {
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px'
};

const cellStyle = {
    padding: '16px',
    color: '#34495e',
    fontWeight: '500'
};

export default ViewOrderDetails;