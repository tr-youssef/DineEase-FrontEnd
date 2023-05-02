import React from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: "1cm"
  },
  title: {
    fontSize: 18,
    marginBottom: "0.5cm"
  },
  subtitle: {
    fontSize: 14,
    marginBottom: "0.5cm"
  },
  text: {
    marginBottom: "0.2cm"
  }
});


const BillReceipt = ({ order }) => (

<Document>
    <Page size="A4" style={styles.container} >
      <View>
        {order.items.map((item) => {
        return (
        <>
            <Text style={styles.subtitle}>Item name:</Text>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.subtitle}>price:</Text>
            <Text style={styles.text}>{item.price}</Text>
            <Text style={styles.subtitle}>Quantity:</Text>
            <Text style={styles.text}>{item.Quantity}</Text> 
            </>
        )
        })}
        <Text style={styles.subtitle}>Subtotal Amount:</Text>
        <Text style={styles.text}>{order.subTotalAmount}</Text>
        <Text style={styles.subtitle}>Tax:</Text>
        <Text style={styles.text}>{order.tax}</Text>
        <Text style={styles.subtitle}>Total Amount:</Text>
        <Text style={styles.text}>{order.totalAmount}</Text>
      </View>
    </Page>
  </Document>
);

export default BillReceipt;
