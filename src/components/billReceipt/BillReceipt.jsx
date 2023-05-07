import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: "1cm",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: "0.5cm",
  },
  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "50%",
    textAlign: "left",
  },
  row2: {
    width: "50%",
    textAlign: "right",
  },
  title1: {
    width: "34%",
    textAlign: "left",
  },
  title2: {
    width: "33%",
    textAlign: "center",
  },
  title3: {
    width: "33%",
    textAlign: "right",
  },
});

const BillReceipt = ({ order }) => (
  <Document>
    <Page size="A6" style={styles.container}>
      <View style={styles.table}>
        <View style={[styles.row, styles.bold]}>
          <Text style={styles.title1}>Item</Text>
          <Text style={styles.title2}>Quantity</Text>
          <Text style={styles.title3}>Price</Text>
        </View>

        {order.items.map((item) => {
          return (
            <>
              <View style={styles.row}>
                <Text style={styles.title1}>{item.name}</Text>
                <Text style={styles.title2}>{item.quantity}</Text>
                <Text style={styles.title3}>{item.price * item.quantity}</Text>
              </View>
            </>
          );
        })}
      </View>

      <View style={styles.table}>
        <Text style={styles.subtitle}>---------------------------------------------------------------------------------------------------------------------</Text>
        <View style={styles.row}>
          <Text style={styles.row1}>Subtotal Amount:</Text>
          <Text style={styles.row2}>{order.subTotalAmount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row1}>Tax:</Text>
          <Text style={styles.row2}>{order.tax}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row1}>Total Amount:</Text>
          <Text style={styles.row2}>{order.totalAmount}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default BillReceipt;
