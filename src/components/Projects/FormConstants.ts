export interface ProjectFormValues {
  name: string;
  key: string;
  description?: string;
}

export const EMPTY_PROJECT_FORM: ProjectFormValues = {
  name: "",
  key: "",
  description: "",
};
