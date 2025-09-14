import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";

export default function BorrowBook() {
  const params = useParams();
  const navigation = useNavigate();
  const form = useForm();
  const [createBorrow] = useBorrowBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const borrowData = {
      book: params?.id,
      quantity: data.quantity,
      dueDate: format(new Date(data.dueDate), "P"),
    };

    try {
      const res = await createBorrow(borrowData).unwrap();
      if (res?.success === true) {
        toast.success(res.message, {
          position: "top-center",
        });
        navigation("/borrow-summary");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center text-3xl mb-5">Add Book</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 border p-5"
        >
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input {...field} required={true} type="number" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <Button type="submit" className="cursor-pointer w-28">
            Borrow Book
          </Button>
        </form>
      </Form>
    </div>
  );
}
