exports.selectorsObject = {
  title: "#editpane_title",
  label: "#editpane_skuNumber",
  brand: "#Listing\\.Item\\.ItemSpecific\\[Brand\\]",
  style: "#Listing\\.Item\\.ItemSpecific\\[Style\\]",
  color: "#Listing\\.Item\\.ItemSpecific\\[Frame\\ Color\\]",
  material: "#Listing\\.Item\\.ItemSpecific\\[Frame\\ Material\\]",
  made: "#Listing\\.Item\\.ItemSpecific\\[Country\\/Region\\ of\\ Manufacture\\]",
  temple: "#Listing\\.Item\\.ItemSpecific\\[Temple\\ Length\\]",
  vintage: {
    width: "#_st_CustomTag_18Val",
    height: "#_st_CustomTag_19Val",
    bridge: "#_st_CustomTag_20Val",
  },
  modern: {
    width: "#Listing\\.Item\\.ItemSpecific\\[Lens\\ Width\\]",
    height: "#_st_CustomTag_28Val",
    bridge: "#_st_CustomTag_29Val",
  },
  vintageOriginalDescription: "body > div:nth-child(1) > font",
  vintageFramesDescription: "body > font",
  modernDescription: "body > div:nth-child(1)",
  frameDescriptionVintage: "#v4-59txtEdit_st",
  frameDescriptionModern: "#v4-89txtEdit_st",
  deletePhotosButton:
    "#tm-topMsg > div.recommendedCount.msg > div.single > div.text.row-fluid > div.copyfrom > a.deleteAll",
  confirmDelete: "#puDlg_0 > span > div.dlg > div > a.b1.btn.btn-m.btn-ter",
  price: "#binPrice",
  photos: "#uploader_iframe",
  upload: "#inpWrapper > span",
  listButton: "#actionbar > input.pbtn",
};

exports.urlAndIdsObject = {
  ebay: "https://www.ebay.com",
  vintage: {
    prescription: "6000494011",
    original: "6000510011",
    frames: "6000505011",
  },
  modern: {
    prescription: {
      male: "6000541011",
      female: "6000538011",
    },
    original: {
      male: "6000545011",
      female: "6000547011",
    },
    frames: {
      male: "6000553011",
      female: "6000552011",
    },
  },
};
