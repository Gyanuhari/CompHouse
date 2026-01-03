import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Inventory, Logout, Person, History } from "@mui/icons-material";
import { useLogOutMutation } from "../../features/account/accountApi";
import type { UserResponse } from "../models/user";

type Props = {
  user: UserResponse;
};

export default function UserMenu({ user }: Props) {
  const [logout] = useLogOutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  return (
    <Box marginLeft={2}>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        startIcon={<Person />}
      >
        {user.fullName}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText>My Orders</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <ListItemText>Inventory</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
