/** @jsxImportSource @emotion/react */
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  PopoverProps,
  Typography,
} from "@mui/material";

import { Edit, Add, Delete } from "@mui/icons-material";

import { menuPaper } from "./styles";

interface PopoverMenuProps extends PopoverProps {
  onEdit?: () => void;
  onAdd?: () => void;
  onDelete?: () => void;
}

function PopoverMenu({
  onAdd,
  onEdit,
  onDelete,
  ...popOverProps
}: PopoverMenuProps) {
  return (
    <Popover {...popOverProps}>
      <Paper css={menuPaper}>
        <MenuList>
          <MenuItem onClick={onEdit}>
            <ListItemIcon>
              <Edit fontSize="small" color="inherit" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          <MenuItem onClick={onAdd}>
            <ListItemIcon>
              <Add fontSize="small" color="inherit" />
            </ListItemIcon>
            <ListItemText>Adicionar componente</ListItemText>
          </MenuItem>
          <MenuItem onClick={onDelete}>
            <ListItemIcon>
              <Delete fontSize="small" color="inherit" />
            </ListItemIcon>
            <ListItemText>Excluir</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Popover>
  );
}

export default PopoverMenu;
