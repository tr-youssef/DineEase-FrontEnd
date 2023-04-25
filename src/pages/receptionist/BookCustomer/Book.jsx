import React from 'react'

function Book() {
    
  function BookCustomer() {
    const data = {
      bookedId: booked,
      tableId: restaurantId.id,
      userId: user?.userId,
      items: order,
      subTotalAmount: item,
      tax: Math.round((item * 0.05 + Number.EPSILON) * 100) / 100,
      totalAmount: Math.round((item + item * 0.05 + Number.EPSILON) * 100) / 100,
      status: "New",
    };
    callAPI("http://localhost:5001/orders", "POST", data, user?.token).then(() => {
      navigate("/server");
    });
  }

  return (
    <div>Book</div>
  )
}

export default Book;