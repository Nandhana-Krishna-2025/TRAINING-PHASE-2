import { useState, useRef } from "react";

function OrderForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    quantity: 1,
    address: "",
    delivery: "Standard",
    termsAccepted: false,
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("Please upload your receipt or ID.");
      return;
    }

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    console.log("Submitted data:", { ...formData, file });
    alert("Order submitted successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-indigo-600">
        Product Order Form
      </h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="product"
        value={formData.product}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Product</option>
        <option value="shoes">Shoes</option>
        <option value="tshirt">T-shirt</option>
        <option value="bag">Bag</option>
      </select>

      <input
        type="number"
        name="quantity"
        min="1"
        value={formData.quantity}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="address"
        placeholder="Shipping Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows="3"
        required
      />

      <div>
        <label className="block text-sm mb-1 font-medium">
          Upload Receipt or ID Proof
        </label>
        <input ref={fileInputRef} type="file" className="w-full" required />
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
