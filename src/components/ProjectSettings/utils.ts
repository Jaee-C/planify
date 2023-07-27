import { Project } from "@/lib/shared";
import { ProjectFormValues } from "@/components/Projects/FormConstants";

export function convertProjectToFormValues(
  project?: Project
): ProjectFormValues {
  if (!project)
    return {
      key: "",
      name: "",
    };
  return {
    key: project.key,
    name: project.name,
  };
}
