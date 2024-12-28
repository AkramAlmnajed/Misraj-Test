import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../button/button";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    category: Yup.string().required("Category is required"),
  });
  const initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
  };
  const handleSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStatus({ success: true });
        resetForm();
        setNotification("Product added successfully!");
      })
      .catch((error) => {
        console.log("Error:", error);
        setStatus({ success: false });
        setNotification("Failed to add product. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const handleCancel = () => {
    setNotification("Operation canceled.");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-800">
      <div className="w-[400px] mx-auto p-6 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg rounded-lg">
        {notification && (
          <div className="fixed top-4 right-4 p-3 bg-green-500 text-white rounded-md">
            {notification}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-4 text-black">Add Product</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-black"
                >
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  className="mt-1 block w-full border-gray-600 bg-gray-200 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-black"
                >
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className="mt-1 block w-full border-gray-600 bg-gray-200 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-black"
                >
                  Price
                </label>
                <Field
                  name="price"
                  type="number"
                  className="mt-1 block w-full border-gray-600 bg-gray-200 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-black"
                >
                  Category
                </label>
                <Field
                  name="category"
                  type="text"
                  className="mt-1 block w-full border-gray-600 bg-gray-200 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  size="regular"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
              {status?.success && (
                <div className="text-green-500 text-sm mt-2">
                  Product added successfully!
                </div>
              )}

              {status?.success === false && (
                <div className="text-red-500 text-sm mt-2">
                  Failed to add product. Please try again.
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
