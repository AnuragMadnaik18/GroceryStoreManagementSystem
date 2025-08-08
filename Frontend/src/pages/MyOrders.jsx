import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserOrders, getOrderDetailsByOrderId } from '../services/MyOrders';
import { Card, Table, Spinner, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const MyOrders = ({ products }) => {
  const [orders, setOrders] = useState([]);
  const [orderDetailsMap, setOrderDetailsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      toast.error("Please log in to view your orders");
      navigate("/user/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const allOrders = await getUserOrders();
        const userOrders = allOrders.data.filter((order) => order.userId === user.id);
        setOrders(userOrders);

        const detailsMap = {};
        for (const order of userOrders) {
          const res = await getOrderDetailsByOrderId(order.orderId);
          detailsMap[order.orderId] = res.data;
        }

        setOrderDetailsMap(detailsMap);
      } catch (err) {
        console.error('Error loading orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <>
      <Navbar products={products} />

      <div className="container mt-5">
        <h2 className="text-center mb-4 fw-bold text-primary">🧾 My Orders</h2>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center fs-5 text-muted">You have no orders yet.</div>
        ) : (
          <Row>
            {orders.map((order) => (
              <Col md={12} key={order.orderId} className="mb-4">
                <Card className="shadow-sm border-primary">
                  <Card.Header className="bg-primary text-white">
                    <div className="d-flex justify-content-between">
                      <span><strong>Order ID:</strong> {order.orderId}</span>
                      <span><strong>Status:</strong> {order.status}</span>
                    </div>
                  </Card.Header>

                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                      <strong>Date:</strong> {order.orderDate}
                    </Card.Subtitle>
                    <Card.Text className="fw-bold">
                      <strong>Total Price:</strong> ₹{order.totalPrice}
                    </Card.Text>

                    <Table striped bordered hover responsive className="mt-3">
                      <thead className="table-dark">
                        <tr>
                          <th>Sr No</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price (Each)</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(orderDetailsMap[order.orderId] || []).map((detail, index) => (
                          <tr key={detail.id}>
                            <td>{index + 1}</td>
                            <td>{detail.productName}</td>
                            <td>{detail.quantity}</td>
                            <td>₹{detail.price}</td>
                            <td>₹{detail.quantity * detail.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default MyOrders;
