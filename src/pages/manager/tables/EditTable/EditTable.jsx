// import React, { useState, useEffect } from "react";
// import { Input, Button, Form } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import { callAPI } from "../../../../utils/FetchData.js";
// import "./EditForm.css";

// export function EditForm () {
    
// const token = JSON.parse(localStorage.getItem("user")).token;
// const [fields, setFields] = useState([]);
// const navigate = useNavigate();
// const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       callAPI(`http://localhost:5001/users/${id}`, "GET", {}, token)
//         .then((response) => {
//           setFields([
//             {
//               name: ["firstName"],
//               value: response.firstName,
//             },
//             {
//               name: ["lastName"],
//               value: response.lastName,
//             },
//             {
//               name: ["email"],
//               value: response.email,
//             },
//             {
//               name: ["role"],
//               value: response.role,
//             },
//             {
//               name: ["password"],
//               value: response.password,
//             },
//             {
//               name: ["restaurantId"],
//               value: response.restaurantId,
//             },
//           ]);
//         })
//         .catch((error) => console.log(error));
//     } else {
//       setFields([
//         {
//           name: ["firstName"],
//           value: "",
//         },
//         {
//           name: ["lastName"],
//           value: "",
//         },
//         {
//           name: ["email"],
//           value: "",
//         },
//         {
//           name: ["role"],
//           value: "",
//         },
//         {
//           name: ["password"],
//           value: "",
//         },
//         {
//           name: ["restaurantId"],
//           value: "",
//         },
//       ]);
//     }
//   }, [id]);

//   const onFinish = (values) => {
//     if (id) {
//       callAPI(`http://localhost:5001/users/${id}`, "PATCH", values, token)
//         .then((response) => {
//           navigate("/manager/users");
//         })
//         .catch((error) => console.log(error))
//     }
//   }; 

//   const handleClick = () => {
//     navigate("/manager/users");
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };


//   return (
//     <div className="Employee">
//       <Button icon={<ArrowLeftOutlined />} onClick={handleClick} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "Right", width: "100px" }} size={"large"} />
//       <div className="EmployeeForm">
//         <Form name="addEmployee"  fields={fields} style={{ maxWidth: 600, marginTop: "40px" }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
//           <div className="EmployeeInputLine">
//             <Form.Item
//               label="First name of the employee"
//               name="firstName"
//               style={{ fontSize: "24px" }}
//               rules={[
//                 {
//                   required: true,
//                   message: "The first name of the employee is required",
//                 },
//               ]}
//             >
//               <Input className="EmployeeInput" placeholder="Enter the first name of the employee" />
//             </Form.Item>
//             <Form.Item
//               label="Last name of the employee"
//               name="lastName"
//               style={{ fontSize: "24px" }}
//               rules={[
//                 {
//                   required: true,
//                   message: "The last name of the employee is required",
//                 },
//               ]}
//             >
//               <Input className="EmployeeInput" placeholder="Enter the last name of the employee" />
//             </Form.Item>
//             <Form.Item
//               label="Email of the employee"
//               name="email"
//               style={{ fontSize: "24px" }}
//               rules={[
//                 {
//                   required: true,
//                   message: "The email of the employee is required",
//                 },
//               ]}
//             >
//               <Input className="EmployeeInput" placeholder="Enter the email of the employee" />
//             </Form.Item>
//             <Form.Item
//               label="Role of the employee"
//               name="role"
//               style={{ fontSize: "24px" }}
//               rules={[
//                 {
//                   required: true,
//                   message: "The role of the employee is required",
//                 },
//               ]}
//             >
//               <Input className="EmployeeInput" placeholder="Enter the role of the employee" />
//             </Form.Item>
//             <Form.Item
//               label="Password of the employee"
//               name="password"
//               style={{ fontSize: "24px" }}
//               rules={[
//                 {
//                   required: true,
//                   message: "The password of the employee is required",
//                 },
//               ]}
//             >
//               <Input className="EmployeeInput" placeholder="Enter the password of the employee" />
//             </Form.Item>
//             <Form.Item
//               label="Restaurant ID of the employee"
//               name="restaurantId"
//               style={{ fontSize: "24px" }}
//               rules={[
//                 {
//                   required: true,
//                   message: "The restaurantId of the employee is required",
//                 },
//               ]}
//             >
//               <Input className="EmployeeInput" placeholder="Enter the restaurantId of the employee" />
//             </Form.Item>
            
//           </div>
//           <Button style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "right", marginTop: "35px" }} size={"large"} htmlType="submit">
//             Save Changes
//           </Button>


//         </Form>
//       </div>
//     </div>
//   );
// }

// export default EditForm;