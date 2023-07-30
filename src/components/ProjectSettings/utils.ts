import { ProjectData } from "@/lib/types";
import { ProjectFormValues } from "@/components/Projects/FormConstants";

export function convertProjectToFormValues(
  project?: ProjectData
): ProjectFormValues {
  if (!project)
    return {
      key: "",
      name: "",
    };
  return {
    key: project.key ?? "",
    name: project.name ?? "",
  };
}
