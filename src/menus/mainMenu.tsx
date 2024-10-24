import {
  HomeTwoTone,
  LogoutTwoTone,
  PinDropTwoTone,
  PrintTwoTone,
  TerminalTwoTone,
} from "@mui/icons-material";
import { Box, Chip, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
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

    <ListItemButton component={RouterLink} to={"/neo-serial-dumper-routine"}>
      <ListItemIcon>
      <Box display="flex" sx={{ position: "relative" }}>
        <TerminalTwoTone />
        <Chip
          label="Beta"
          size="small"
          color="warning"
          sx={{
            position: "absolute",
            bottom: 0,
            right: -8,
            fontSize: "8px",
            minWidth: 0,
            minHeight: 0,
            height: "fit-content",
            ".MuiChip-label": {
              px: "2px",
            }
          }}
        />
      </Box>
      </ListItemIcon>
        <ListItemText primary="New Serial Routine" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to={"/pdf-print-test"}>
      <ListItemIcon>
        <PrintTwoTone />
      </ListItemIcon>
      <ListItemText primary="Pdf Print Test" />
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
