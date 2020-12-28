import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { ViewMode } from "../../redux/actions/actionTypes";
//import tileData from './tileData';
import "./Photo.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: 800,
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

export default function PictureGridList({
  photos,
  setSelectedPicture,
  setViewMode,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={"auto"} cols={3}>
        {photos.map((photo) => (
          <GridListTile
            key={photo.thumbnail}
            cols={photo.orientation === "L" ? 2 : 1}
          >
            <img src={photo.thumbnail} alt={photo.caption} className="photo" />
            <GridListTileBar
              title={photo.caption}
              titlePosition="bottom"
              actionIcon={
                <IconButton
                  aria-label={`star ${photo.caption}`}
                  className={classes.icon}
                  onClick={() => {
                    setSelectedPicture(photo.id);
                    setViewMode(ViewMode.SHOW_PICTURE_DETAIL);
                  }}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
