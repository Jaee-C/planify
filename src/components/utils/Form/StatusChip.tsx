import { StatusType } from "@/lib/types";
import { Chip } from "@mui/material";

interface StatusChipProps {
  value?: StatusType;
}

export default function StatusChip(props: StatusChipProps): JSX.Element {
  if (!props.value) return <></>;
  const getChipColor = (
    status: StatusType
  ): "default" | "primary" | "success" => {
    return STATUS_COLOR_MAPPING[status.name];
  };

  return (
    <Chip
      color={getChipColor(props.value)}
      label={props.value.name}
      className="hover:cursor-pointer"
    />
  );
}

const STATUS_COLOR_MAPPING: Record<string, "default" | "primary" | "success"> =
  {
    None: "default",
    "To Do": "default",
    "In Progress": "primary",
    Done: "success",
  };
