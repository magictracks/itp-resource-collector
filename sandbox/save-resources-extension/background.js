function getword(info,tab) {
  console.log(info.selectionText);
}

chrome.contextMenus.create({
  title: "Save Ressource: %s",
  contexts:["selection"],
  onclick: getword
});
