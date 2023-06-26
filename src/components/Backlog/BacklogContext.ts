import "react";
import { Context, createContext } from "react";

export const BacklogContext: Context<number> = createContext<number>(-1);
