import { useState, useRef } from "react";

function OrderForm() {
  const initialFormData = {
    name: "",
    email: "",
    product: "",
    quantity: 1,
    address: "",
    delivery: "Standard",
    termsAccepted: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Validation logic
  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && value.trim() === "") {
      error = "Name is required.";
    }

    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Invalid email address.";
    }

    if (name === "product" && value === "") {
      error = "Please select a product.";
    }

    if (name === "quantity" && (value < 1 || isNaN(value))) {
      error = "Quantity must be at least 1.";
    }

    if (name === "address" && value.trim() === "") {
      error = "Address is required.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    validateField(name, val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      validateField(key, value);
      if (errors[key]) {
        newErrors[key] = errors[key];
      }
    });

    const file = fileInputRef.current.files[0];
    if (!file) {
      newErrors.file = "Please upload your receipt or ID.";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitted:", { ...formData, file });
      alert("Order submitted successfully");
      setFormData(initialFormData);
      fileInputRef.current.value = null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-indigo-600">
        Product Order Form
      </h2>

      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className={`w-full p-2 border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`w-full p-2 border rounded ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div>
        <select
          name="product"
          value={formData.product}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.product ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Product</option>
          <option value="shoes">Shoes</option>
          <option value="tshirt">T-shirt</option>
          <option value="bag">Bag</option>
        </select>
        {errors.product && (
          <p className="text-red-500 text-sm">{errors.product}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.quantity ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity}</p>
        )}
      </div>

      <div>
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
          rows="3"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">
          Upload Receipt or ID Proof
        </label>
        <input ref={fileInputRef} type="file" className="w-full" />
        {errors.file && (
          <p className="text-red-500 text-sm">{errors.file}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Delivery Speed</label>
        <label className="mr-4">
          <input
            type="radio"
            name="delivery"
            value="Standard"
            checked={formData.delivery === "Standard"}
            onChange={handleChange}
          />
          <span className="ml-1">Standard</span>
        </label>
        <label>
          <input
            type="radio"
            name="delivery"
            value="Express"
            checked={formData.delivery === "Express"}
            onChange={handleChange}
          />
          <span className="ml-1">Express</span>
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
        />
        <span className="ml-2 text-sm">
          I agree to the terms and conditions
        </span>
      </div>
      {errors.termsAccepted && (
        <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Submit Order
      </button>
    </form>
  );
}

export default OrderForm;
