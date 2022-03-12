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
    descriptionPrescription: "body > div:nth-child(1)",
    descriptionOriginal: "body > div:nth-child(1)",
    descriptionFrames1: "body > font",
    descriptionFrames2: "body > div:nth-child(1) > font",
  },
  modern: {
    descriptionPrescription: "body > div:nth-child(1)",
    descriptionOriginal: "body > div:nth-child(1)",
    descriptionFrames: "body > div:nth-child(1)",
  },
  frameDescriptionVintage: "#v4-59txtEdit_st",
  frameDescriptionModern: "#v4-89txtEdit_st",
  deletePhotosButton:
    "#tm-topMsg > div.recommendedCount.msg > div.single > div.text.row-fluid > div.copyfrom > a.deleteAll",
  confirmDelete: "#puDlg_0 > span > div.dlg > div > a.b1.btn.btn-m.btn-ter",
  price: "#binPrice",
  photos: "#uploader_iframe",
  upload: "#inpWrapper > span",
  submit: "#actionbar > input.pbtn",
  relist: "#confirm_button_wrap > form > input.pbtn",
  list: "#confirm_layer_wrap > div:nth-child(4) > div.cfm-cnt > div:nth-child(5) > div:nth-child(2) > span > form:nth-child(1) > a",
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
