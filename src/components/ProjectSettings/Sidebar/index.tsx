import React from "react";
import { IconContext } from "react-icons";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import colors from "tailwindcss/colors";
import ReturnToProject from "@/components/ProjectSettings/Sidebar/ReturnToProject";
import { useRouter } from "next/router";
import { getSettingsPath, SettingPages, pagePaths } from "./utils";

export { SettingPages };

interface Props {
  activePage: SettingPages;
}

export default function SettingsSidebar(props: Props): JSX.Element {
  const router = useRouter();
  const settingsPath: string = getSettingsPath(router.asPath);

  return (
    <IconContext.Provider value={{ size: "14px" }}>
      <Sidebar width="200px" transitionDuration={200}>
        <div className="p-2.5">
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: active ? colors.blue[700] : colors.neutral[700],
                    backgroundColor: active ? colors.blue[100] : undefined,
                    fontSize: "1rem",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: colors.blue[100],
                    },
                  };
              },
            }}>
            <ReturnToProject />
            <MenuItem
              active={props.activePage === SettingPages.Details}
              href={settingsPath + pagePaths[SettingPages.Details]}>
              {SettingPages.Details}
            </MenuItem>
            <MenuItem
              active={props.activePage === SettingPages.Users}
              href={settingsPath + pagePaths[SettingPages.Users]}>
              {SettingPages.Users}
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </IconContext.Provider>
  );
}
