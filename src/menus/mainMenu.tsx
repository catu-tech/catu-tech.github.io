import {
  HomeTwoTone,
  LogoutTwoTone,
  PinDropTwoTone,
  TerminalTwoTone,
} from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const mainMenu = (
  <>
    <ListItemButton component={RouterLink} to={"/"}>
      <ListItemIcon>
        <HomeTwoTone />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to={"/serial-dumper"}>
      <ListItemIcon>
        <TerminalTwoTone />
      </ListItemIcon>
      <ListItemText primary="Serial Dump" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to={"/serial-sender"}>
      <ListItemIcon>
        <TerminalTwoTone />
      </ListItemIcon>
      <ListItemText primary="Serial Send" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to={"/serial-dumper-routine"}>
      <ListItemIcon>
        <TerminalTwoTone />
      </ListItemIcon>
      <ListItemText primary="Serial Routine" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to={"/logout"}>
      <ListItemIcon>
        <LogoutTwoTone />
      </ListItemIcon>
      <ListItemText color="warning" primary="Logout" />
    </ListItemButton>

    {/* <ListItemButton component={RouterLink} to={"/map-editor"}>
      <ListItemIcon>
        <PinDropTwoTone />
      </ListItemIcon>
      <ListItemText primary="Map Editor" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to={"/map-viewer"}>
      <ListItemIcon>
        <PinDropTwoTone />
      </ListItemIcon>
      <ListItemText primary="Map Viewer" />
    </ListItemButton> */}
  </>
);
