"use client";

import React from 'react'
import { useFormStatus } from 'react-dom';

interface Props {
  label: string;
}

const FormButton: React.FC<Props> = ({ label }) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {pending ? "Loading..." : label}
    </button>
  )
}

export default FormButton