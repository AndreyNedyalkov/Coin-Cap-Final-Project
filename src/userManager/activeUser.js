export function getActiveUser() {
  return JSON.parse(localStorage.getItem("activeUser"));
}

export function getActiveUserWatchlist() {
  let activeUser = getActiveUser();
  let getActiveUserWatchlist = activeUser.watchlistIDs;
  return getActiveUserWatchlist;
}

export function addToWatchlist(uuid) {
  let activeUser = getActiveUser();
  if (getActiveUserWatchlist().includes(uuid)) {
    return false;
  } else {
    activeUser.watchlistIDs.push(uuid);
    localStorage.setItem("activeUser", JSON.stringify(activeUser));

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
        user => user.username === activeUser.username
    );
    user.watchlistIDs.push(uuid)
    localStorage.setItem("users", JSON.stringify(users));
  }
}

export function removeFromWatchlist(uuid) {
  const activeUser = getActiveUser();

  if (activeUser.watchlistIDs.includes(uuid)) {
    const finalWatchlist = getActiveUserWatchlist();
    const selectedIndex = getActiveUserWatchlist().indexOf(uuid);
    finalWatchlist.splice(selectedIndex, 1);
    activeUser.watchlistIDs = finalWatchlist;
    localStorage.setItem("activeUser", JSON.stringify(activeUser));

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
        user => user.username === activeUser.username
    );
    const selectedIndexActiveUser = user.watchlistIDs.indexOf(uuid);
    user.watchlistIDs.splice(selectedIndexActiveUser, 1);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    return false;
  }
}
