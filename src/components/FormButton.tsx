"use client";

import React from 'react'
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button"

interface Props {
  label: string;
}

const FormButton: React.FC<Props> = ({ label }) => {
  const { pending } = useFormStatus();

  return (
    <Button variant="default" disabled={pending}>
      {pending ? "Loading..." : label}
    </Button>
  )
}

export default FormButton