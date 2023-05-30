import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.jpg";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Line
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    height: "100vh",
    width: "100vw",
    borderTopStyle: "solid",
    borderTopColor: "#000",
    borderTopWidth: "3px",
    padding: "30px"
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "15px"
  },
  companyName: {
    color: "#000",
    fontSize: "15px",
    fontWeight: 900
  },
  addInfo: {
    fontSize: "15px",
    color: "#000"
  },
  est: {
    fontSize: "18px",
    fontWeight: 1000
  },
  date: {
    fontSize: "15px",
    fontWeight: 700
  },
  img: {
    width: "300px",
    height: "70px"
  },
  line: {
    marginTop: 3,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D7E9B9",
    marginLeft: 20,
    marginRight: 10,
    width: "120%"
  },
  secondSection: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  otherInfo: {
    flexDirection: "column"
  },
  address: {},
  table: {
    flexDirection: "column",
    marginTop: 15
  },

  row1: {
    fontSize: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    color: "#ffffff",
    height: 40,
    alignItems: "center"
  },
  num: {
    width: "80"
  },
  row2: {
    flexDirection: "column",
    fontSize: "10px",
    justifyContent: "space-evenly",
    height: 45,
    backgroundColor: "#F8F6F4",
    alignItems: "center",
    marginBottom: 10
  },
  services: {
    flexDirection: "row",
    fontSize: "10px",
    justifyContent: "space-evenly"
  },
  serviceInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  row3: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 15,
    height: 45
  },
  thirdSection: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "flex-start",
    marginLeft: "auto",
    marginTop: 25
  },
  fourthSection: {
    marginTop: 35
  },
  info: {
    color: "#647E68",
    fontSize: "12px",
    fontWeight: 500,
    marginBottom: 6
  }
});

const App = () => {
  const [name, setName] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quantity, setQuantity] = useState(0);
  const [details, setDetails] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);

  const [tableDetails, setTableDetails] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const items = {
    quantity,
    details,
    unitPrice
  };

  useEffect(() => {
    const total = tableDetails.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    setGrandTotal(total);
  }, [tableDetails]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24); // Update the date every 24 hours

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const addItem = () => {
    setTableDetails([...tableDetails, items]);
    setGrandTotal(grandTotal + quantity * unitPrice);
    setQuantity(0);
    setUnitPrice(0);
    setDetails("");
  };

  const removeItem = (index) => {
    const updatedTableDetails = [...tableDetails];
    const removedItem = updatedTableDetails.splice(index, 1)[0];
    setTableDetails(updatedTableDetails);
    setGrandTotal(grandTotal - removedItem.quantity * removedItem.unitPrice);
  };

  const generatePDF = () => {
    const MyDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.topSection}>
            <Image
              src={logo}
              alt="logo"
              style={{
                width: 150,
                height: 90
              }}
            />
            <View style={styles.address}>
              <Text style={styles.companyName}>
                Prabisha Consulting Limited
              </Text>
              <Text style={styles.addInfo}>71-75 Shelton Street</Text>
              <Text style={styles.addInfo}>Convent Garden</Text>
              <Text style={styles.addInfo}>London</Text>
              <Text style={styles.addInfo}>WC2H 9JQ</Text>
              <Text style={styles.addInfo}>https://prabisha.co.uk</Text>
              <Text style={styles.addInfo}>Email:info@prabisha.com</Text>
            </View>
          </View>
          <Line style={styles.line} />
          <View style={styles.secondSection}>
            <Text>{name}</Text>
            <View style={styles.otherInfo}>
              <Text style={styles.est}>ESTIMATE 017</Text>
              <Text style={styles.date}>{formattedDate}</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row1}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 13,
                    marginLeft: 5,
                    marginRight: 10,
                    width: 50
                  }}
                >
                  Quantity
                </Text>
                <Text style={{ fontSize: 13, width: "68%" }}>Details</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 13,
                    width: 90,
                    marginRight: 5
                  }}
                >
                  Unit Price(£)
                </Text>
                <Text style={{ fontSize: 13, width: 90, marginRight: 9 }}>
                  Net Price(£)
                </Text>
              </View>
            </View>
            <View style={styles.row2}>
              {tableDetails.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: "15px",
                    paddingTop: 15,
                    paddingBottom: 15
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      marginLeft: 5,
                      marginRight: 10,
                      width: 50
                    }}
                  >
                    {item.quantity}
                  </Text>
                  <Text style={{ fontSize: 13, width: "70%" }}>
                    {item.details}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginRight: 8,
                      width: 50,
                      marginLeft: -40
                    }}
                  >
                    {item.unitPrice}
                  </Text>
                  <Text style={{ fontSize: 13, width: 50 }}>
                    {item.quantity * item.unitPrice}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.row3}>
              <Text
                style={{
                  fontWeight: 1000,
                  fontSize: 12,
                  marginRight: 10,
                  marginLeft: -30
                }}
              >
                TOTAL
              </Text>
              <Text style={{ fontWeight: 1000, fontSize: 12 }}>
                £{grandTotal}.00
              </Text>
            </View>
            <Line style={styles.line} />
          </View>
          <View style={styles.thirdSection}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 1000, fontSize: 13 }}>
                Company Registration Number:
                <Text style={{ fontSize: 12 }}>14345951</Text>
              </Text>
            </View>
          </View>
          <View style={styles.fourthSection}>
            <Text style={styles.info}>Payment Details:</Text>
            <Text style={styles.info}>Prabisha Consulting Limited</Text>
            <Text style={styles.info}>HSBC Bank, Harrow, UK</Text>
            <Text style={styles.info}>Bank/Sort Code: 402313</Text>
            <Text style={styles.info}>Account Number:82544164</Text>
            <Text style={styles.info}>IBAN: GB35HBUK40231382544164</Text>
            <Text style={styles.info}>SWIFT: HBUKGB4B</Text>
            <Text>{"   "}</Text>
            <Text style={styles.info}>Thank you for your interest.</Text>
            <Text style={styles.info}>
              We really appreciate you choosing Prabisha Consulting and we look
              forward to an ongoing engagement with <br />
              your organisation.
            </Text>
            <Text style={styles.info}>
              Key Services: IT Solutions | Digital Marketing | Corporate
              Branding
            </Text>
            <Text style={styles.info}>Email:info@prabisha.com</Text>
            <Text>{"   "}</Text>
            <Text style={styles.info}>
              Please visit our website for more details on our offerings.
            </Text>
            <Text style={styles.info}>www.prabisha.co.uk</Text>
          </View>
        </Page>
      </Document>
    );
    return (
      <button className="download_btn" style={{ marginLeft: "50px" }}>
        <PDFDownloadLink
          className="download_link"
          document={<MyDocument />}
          fileName="invoice.pdf"
        >
          {({ blob, url, loading, error }) => "Download PDF"}
        </PDFDownloadLink>
      </button>
    );
  };

  return (
    <div className="container">
      <div className="company-details">
        <img className="logo" src={logo} alt="logo" />
        <div className="company-address">
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            Prabisha Consulting Limited
          </p>
          <p className="addInfo">71-75 Shelton Street</p>
          <p className="addInfo">Convent Garden</p>
          <p className="addInfo">London</p>
          <p className="addInfo">WC2H 9JQ</p>
          <p className="addInfo">https://prabisha.co.uk</p>
          <p className="addInfo">Email:info@prabisha.com</p>
        </div>
      </div>
      <hr className="line" />
      <div className="form-container">
        <h1 className="main-img-tag">INVOICE</h1>
        <div className="form">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Client Name"
            name="name"
            value={name}
            className="input"
          />
          <label className="label" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="Enter quantity"
            name="quantity"
            value={quantity}
            className="input"
          />
          <label className="label" htmlFor="price">
            Unit Price
          </label>
          <input
            type="number"
            onChange={(event) => setUnitPrice(event.target.value)}
            placeholder="Enter Price"
            name="price"
            value={unitPrice}
            className="input"
          />

          <label className="label" htmlFor="details">
            Details
          </label>
          <textarea
            className="details"
            rows="4"
            onChange={(event) => setDetails(event.target.value)}
            type="text"
            placeholder="Type here..."
          />
        </div>
        <button
          style={{
            height: 35,
            width: 122,
            marginTop: 25,
            border: "none",
            cursor: "pointer",
            color: "#FFf",
            fontFamily: "Helvetica",
            backgroundColor: "#C99B3B",
            marginLeft: -0.1
          }}
          onClick={addItem}
        >
          Add Items
        </button>
        <div className="item">
          {tableDetails.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                margin: 15,
                minWidth: 100
              }}
            >
              <p>Quantity: {item.quantity}</p>
              <p style={{ flexWrap: "wrap" }}>Details: {item.details}</p>
              <p>Unit Price: {item.unitPrice}</p>
              <p>Net Subtotal: {item.quantity * item.unitPrice}</p>

              <button
                style={{
                  height: 40,
                  width: 122,
                  marginTop: 15,
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer"
                }}
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      {generatePDF()}
    </div>
  );
};

export default App;
