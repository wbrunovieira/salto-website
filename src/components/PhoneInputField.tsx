"use client";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props {
  defaultCountry: string;
  value: string;
  onChange: (phone: string) => void;
  placeholder: string;
}

export default function PhoneInputField({ defaultCountry, value, onChange, placeholder }: Props) {
  return (
    <PhoneInput
      defaultCountry={defaultCountry}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="phone-input-container"
      inputProps={{
        autoComplete: "tel",
        name: "phone",
        id: "contact-phone",
      }}
    />
  );
}
