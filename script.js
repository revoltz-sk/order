document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const orderId = document.getElementById('orderId').value;
    const email = document.getElementById('email').value;

    fetch(`https://apiprotegida.com/4400/lg-order/?orderId=${orderId}&email=${email}`)
        .then(response => response.json())
        .then(data => {
            const order = data.data.orderTracking.OrderDetail[0];

            document.getElementById('orderNumber').innerText = order.number;
            document.getElementById('orderStatus').innerText = order.status;
			document.getElementById('orderCodeStatus').innerText = order.status_code;
            document.getElementById('orderDate').innerText = order.order_date;
            document.getElementById('orderTotal').innerText = order.total_segments.find(segment => segment.code === "grand_total").value;
            document.getElementById('productName').innerText = order.items[0].product_name;
            document.getElementById('paymentMethod').innerText = order.payment_methods[0].name;
            document.getElementById('shippingAddress').innerText = `${order.shipping_address.street.join(', ')}, ${order.shipping_address.city}, ${order.shipping_address.region}, ${order.shipping_address.country_code}`;

            document.getElementById('orderDetails').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Erro ao consultar o pedido:', error);
        });
});
