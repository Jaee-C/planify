export interface FormValues {
  title: string;
  description?: string;
  status: number;
  priority?: number;
}

export const EMPTY_FORM: FormValues = {
  title: "",
  description: "",
  status: 1,
};
