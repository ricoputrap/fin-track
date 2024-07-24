import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }).max(256, {
    message: "Name must be less than or equal to 256 characters",
  }),
  type: z.string().min(1, {
    message: "Type is required",
  }),
});



export default categorySchema;