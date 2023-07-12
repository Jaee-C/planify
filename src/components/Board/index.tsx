import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { PartialAutoScrollerOptions } from "@hello-pangea/dnd/src/state/auto-scroller/fluid-scroller/auto-scroller-options-types";
import Board from "@/components/Board/Board";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/data/query";

interface Props {
  autoScrollerOptions?: PartialAutoScrollerOptions;
  useClone?: boolean;
  containerHeight?: string;
  isCombineEnabled?: boolean;
  withScrollableColumns?: boolean;
}

export default function Index(props: Props): JSX.Element {
  const onDragEnd = (result: DropResult): void => {
    console.log("dragged", result);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <DragDropContext
        onDragEnd={onDragEnd}
        autoScrollerOptions={props.autoScrollerOptions}>
        <Board
          isCombineEnabled={props.isCombineEnabled}
          ignoreContainerClipping={Boolean(props.containerHeight)}
          withScrollableColumns={props.withScrollableColumns}
          useClone={props.useClone}
        />
      </DragDropContext>
    </QueryClientProvider>
  );
}
