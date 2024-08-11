import { useToast } from "@/components/ui/use-toast";
import { DEFAULT_NUM } from "@/constants";
import { categorySchema } from "@/schemas";
import { addCategory } from "@/server/categories";
import editCategory from "@/server/categories/edit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type Category = z.infer<typeof categorySchema>;

type Params = {
  id: number
  name: string
  type: string,
  close: () => void
}

const useCategoryForm = ({ id, name, type, close }: Params) => {
  const { toast } = useToast();

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name,
      type
    }
  });

  const onSubmit = async (data: Category) => {
    const isActionEdit = id !== DEFAULT_NUM;

    const result = isActionEdit
      ? await editCategory(id, data)
      : await addCategory(data);

    // show an error toast if the request fails
    if (!result.success) {
      let description = result.error.message;
      if (!description) {
        description = isActionEdit
          ? "Failed to edit the category."
          : "Failed to add new category."
      }

      toast({
        title: "Error!",
        description,
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
      description: isActionEdit ? "Category edited." : "New category added.",
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

export default useCategoryForm;