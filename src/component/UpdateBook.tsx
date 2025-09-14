import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

export default function UpdateBook() {
  const navigation = useNavigate();
  const params = useParams();

  // Fetch single book data
  const { data, isLoading } = useGetSingleBookQuery(params?.id);

  // Mutation for updating book
  const [updateBook, { isLoading: isSubmitting }] = useUpdateBookMutation();

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 1,
      available: true,
      description: "",
    },
  });

  //   Reset form values once data is loaded
  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        author: data.author,
        genre: data.genre,
        isbn: data.isbn,
        copies: data.copies,
        available: data.available,
        description: data.description,
      });
    }
  }, [data, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await updateBook({
        id: params?.id,
        ...data,
        copies: Number(data.copies),
      }).unwrap();

      console.log("res", res, params.id);
      if (res?.success) {
        toast.success(res.message, {
          position: "top-center",
        });
        navigation("/all-book");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to update book", {
        position: "top-center",
      });
    }
  };

  if (isLoading) return <p className="text-center">Loading book...</p>;

  return (
    <div className="py-10">
      <h1 className="text-center text-3xl mb-5">Update Book</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 border p-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input {...field} required type="number" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={String(field.value)}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Available" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          If this item not available now then select unavailable
                        </SelectLabel>
                        <SelectItem value="true">Available</SelectItem>
                        <SelectItem value="false">Unavailable</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} required className="h-28" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="cursor-pointer w-28">
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
