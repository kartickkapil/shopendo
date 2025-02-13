import { useState } from "react";
import Button from "../ui/button";

interface CheckoutFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; terms?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; phone?: string; terms?: string } = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10,}$/.test(phone)) {
      newErrors.phone = "Enter a valid phone number (at least 10 digits).";
    }

    if (!termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

      {/* Email */}
      <div className="mt-6">
        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      {/* Phone */}
      <div className="mt-6">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone number
        </label>
        <div className="mt-2">
          <input
            id="phone"
            name="phone"
            type="text"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600 sm:text-sm"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>

      {/* Accept terms */}
      <div className="mt-6 flex gap-3">
        <div className="flex h-5 shrink-0 items-center">
          <div className="group grid size-4 grid-cols-1">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-green-600 checked:bg-green-600 indeterminate:border-green-600 indeterminate:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
            />
            <svg
              fill="none"
              viewBox="0 0 14 14"
              className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 group-has-[:checked]:opacity-100"
              />
              <path
                d="M3 7H11"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 group-has-[:indeterminate]:opacity-100"
              />
            </svg>
          </div>
        </div>
        <label htmlFor="terms" className="text-sm text-gray-500">
          I have read the terms and conditions.
        </label>
      </div>
      {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}

      <Button variant="secondary" className="mt-6 px-4 py-2 text-sm">
        Continue to shipping and payment
      </Button>
    </form>
  );
};

export default CheckoutForm;
