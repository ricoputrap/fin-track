import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { categorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addCategory } from "@/server/categories";

type Category = z.infer<typeof categorySchema>;

const useAddCategoryForm = (close: () => void) => {
  const { toast } = useToast();

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: ""
    }
  });

  const onSubmit = async (data: Category) => {
    const result = await addCategory(data);

    // show an error toast if the request fails
    if (!result.success) {
      toast({
        title: "Error!",
        description: result.error.message || "Failed to add new category.",
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
      description: "New category added.",
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

export default useAddCategoryForm;