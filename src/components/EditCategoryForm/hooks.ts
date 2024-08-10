import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/schemas";
import { z } from "zod";
import editCategory from "@/server/categories/edit";

type Category = z.infer<typeof categorySchema>;

type Params = {
  id: number;
  name: string
  type: string
  close: () => void
}

const useEditCategoryForm = ({ id, name, type, close }: Params) => {
  const { toast } = useToast();

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name,
      type
    }
  });

  const onSubmit = async (data: Category) => {
    const result = await editCategory(id, data);

    // show an error toast if the request fails
    if (!result.success) {
      toast({
        title: "Error!",
        description: result.error.message || "Failed to edit the category.",
        variant: "destructive"
      });

      return;
    }

    // close the drawer and reset the form
    close();
    form.reset();

    // show a success toast
    toast({
      title: "Success!",
      description: "Category edited.",
    });
  }

  const handleSubmit = () => {
    form.handleSubmit(onSubmit)();
  }

  return {
    form,
    handleSubmit,
  }
}

export default useEditCategoryForm