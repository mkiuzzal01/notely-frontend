import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

interface AppFormProps<
  T extends FieldValues = FieldValues,
> extends UseFormProps<T> {
  children: React.ReactNode;
  onSubmit: (values: T, reset: () => void) => void | Promise<void>;
}

const AppForm = <T extends FieldValues>({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: AppFormProps<T>) => {
  const methods = useForm<T>({
    resolver,
    defaultValues,
  });

  const handleFormSubmit: SubmitHandler<T> = async (values) => {
    await onSubmit(values, methods.reset);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default AppForm;