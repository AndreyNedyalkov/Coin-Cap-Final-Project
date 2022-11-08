import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, getActiveUser, removeFromWatchlist } from "../userManager/activeUser";
import {addToWatchlistRedux, removeFromWatchlistRedux } from "../store/WatchlistSlice";

export default function CheckboxComponent(props) {
  const watchlist = useSelector((state) => state.watchlistSlice.watchlist);
  const isLogged = getActiveUser();
  const dispatch = useDispatch();

  function checkForCoin(uuid) {
    if (watchlist.includes(uuid)) {
      return true;
    }
    return false;
  }

  const handleClickAddToWatchlist = (event, uuid) => {
    event.stopPropagation();
    if (isLogged == null) {
      return;
    }

    const selectedIndex = watchlist.indexOf(uuid);
    let newSelected = [];
    if (selectedIndex === -1) {
      addToWatchlist(uuid);
      newSelected = [...watchlist, uuid];
      dispatch(addToWatchlistRedux(newSelected));
    } else {
      removeFromWatchlist(uuid);
      newSelected = newSelected.concat(
        watchlist.slice(0, selectedIndex),
        watchlist.slice(selectedIndex + 1)
      );
      dispatch(removeFromWatchlistRedux(newSelected));
    }
  };

  return (
    <>
      {isLogged ? (
        <Checkbox
          checked={checkForCoin(props.checkForUUID)}
          onClick={(event) =>
            handleClickAddToWatchlist(event, props.checkForUUID)
          }
          {...props.labelId}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      ) : (
        <Tooltip
          title="You need to be logged in for this feature"
          placement="right-start"
        >
          <Checkbox
            checked={checkForCoin(props.checkForUUID)}
            onClick={(event) =>
              handleClickAddToWatchlist(event, props.checkForUUID)
            }
            {...props.labelId}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        </Tooltip>
      )}
    </>
  );
}
