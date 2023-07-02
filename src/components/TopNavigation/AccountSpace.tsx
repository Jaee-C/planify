import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Skeleton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function AccountSpace(): JSX.Element {
  const { data: session, status } = useSession();
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open: boolean = Boolean(profileAnchor);

  const expandProfile = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setProfileAnchor(event.currentTarget);
  };
  const handleClose = (): void => {
    setProfileAnchor(null);
  };
  const handleSignOut = (): void => {
    handleClose();
    signOut();
  };

  if (status === "loading") {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  if (status === "unauthenticated" || !session) {
    return (
      <Button variant="contained" onClick={(): Promise<any> => signIn()}>
        Sign in
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={expandProfile}>
        Hi, {session.user.name}
      </Button>
      <Menu
        anchorEl={profileAnchor}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </>
  );
}
