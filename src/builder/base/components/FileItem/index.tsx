/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */
import { MouseEventHandler, useCallback, useState } from "react";
import Image from "next/image";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";

interface FileItemProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onEdit?: () => void;
}

function FileItem({
  title,
  subtitle,
  imageUrl = "",
  onClick,
  onEdit,
}: FileItemProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [hoveringState, setHoveringState] = useState(false);

  const renderIcon = useCallback(() => {
    if (!imageUrl) {
      return <ArticleIcon sx={{ fontSize: 140 }} color="disabled" />;
    }

    if (imageFailed) {
      return <ArticleIcon sx={{ fontSize: 140 }} color="disabled" />;
    }

    return (
      <Image
        alt=""
        src={imageUrl}
        height={140}
        width={140}
        onError={() => setImageFailed(true)}
      />
    );
  }, [imageUrl, imageFailed]);

  return (
    <Card
      sx={{ position: "relative" }}
      onMouseOver={() => setHoveringState(true)}
      onMouseLeave={() => setHoveringState(false)}
    >
      {hoveringState && (
        <IconButton
          sx={{ position: "absolute", right: 4, top: 4 }}
          onClick={onEdit}
        >
          <EditIcon color="disabled" />
        </IconButton>
      )}
      <CardMedia>
        <Stack alignItems="center">{renderIcon()}</Stack>
      </CardMedia>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small" color="error">
          Excluir
        </Button>
        <Button size="small" color="info" onClick={onClick}>
          Ir para editor
        </Button>
      </CardActions>
    </Card>
  );
}

export default FileItem;
