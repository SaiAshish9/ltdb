import createDataContext from "./createDataContext";
import Api from "../api";
import S3 from "react-aws-s3";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "SET_GAMES":
      return {
        ...state,
        games: action.payload,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_ITEM":
      return {
        ...state,
        item_details: action.payload,
      };
    case "SET_LABELS":
      return {
        ...state,
        labels: action.payload,
      };
    case "SET_BANNERS":
      return {
        ...state,
        banners: action.payload,
      };
    case "SET_BANNER_DETAILS":
      return {
        ...state,
        banner_details: action.payload,
      };
    case "SET_GAME":
      return {
        ...state,
        game_details: action.payload,
      };
    case "SET_ITEM_COUNT":
      return {
        ...state,
        items_count: action.payload,
      };
    case "SET_USERS_COUNT":
      return {
        ...state,
        user_count: action.payload,
      };
    case "SET_PAGE_COUNT":
      return {
        ...state,
        page_count: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "SET_USER_PROFILE":
      return {
        ...state,
        user_profile: action.payload,
      };
    case "SET_RESOLUTION_LIST":
      return {
        ...state,
        resolution_list: action.payload,
      };
    case "SET_GAME_PAGE_COUNT":
      return {
        ...state,
        game_page_count: action.payload,
      };
    case "SET_GAME_COUNT":
      return {
        ...state,
        game_count: action.payload,
      };
    case "SET_GAME_PACKAGES":
      return {
        ...state,
        game_packages: action.payload,
      };
    case "SET_PACKAGE":
      return {
        ...state,
        package_details: action.payload,
      };
    case "SET_LINKABLE_ITEMS":
      return {
        ...state,
        linkableItems: action.payload,
      };
    case "SET_SUB_CATEGORY":
      return {
        ...state,
        sub_category: action.payload,
      };
    default:
      return state;
  }
};

const fetchItems = (dispatch) => async (page, limit, search, status) => {
  var url;
  dispatch({
    type: "SET_MESSAGE",
    payload: null,
  });
  if (page && limit) {
    url = `admin/item/list?limit=${limit}&&page=${page}`;
  } else {
    url = "admin/item/list?limit=10";
  }
  if (search) {
    url = `admin/item/list?limit=10&&page=1&&search=${search}`;
  }
  if (status === 1) {
    url = `admin/item/list?limit=10&&page=1&&status=1`;
  }

  if (status === 0) {
    url = `admin/item/list?limit=10&&page=1&&status=0`;
  }

  if (status === 0 && search) {
    url = `admin/item/list?limit=10&&page=1&&search=${search}&&status=0`;
  }

  if (status === 1 && search) {
    url = `admin/item/list?limit=10&&page=1&&search=${search}&&status=1`;
  }

  if (page || limit) {
    dispatch({
      type: "SET_ITEMS",
      payload: null,
    });
  }
  const data = await Api(url);
  if (data) {
    dispatch({
      type: "SET_PAGE_COUNT",
      payload: JSON.parse(data.request.response)["parameter"]["last_page"],
    });

    dispatch({
      type: "SET_ITEM_COUNT",
      payload: JSON.parse(data.request.response)["parameter"]["total"],
    });
    dispatch({
      type: "SET_ITEMS",
      payload: data.data.data,
    });
  }
};

const fetchGames = (dispatch) => async (page, limit, search, status) => {
  var url;
  if (page && limit) {
    url = `admin/game/get-game-list?limit=${limit}&&page=${page}`;
  } else {
    url = "admin/game/get-game-list?limit=10&&page=1";
  }
  if (search) {
    url = `admin/game/get-game-list?limit=10&&page=1&&search=${search}`;
  }

  if (status === 1) {
    url = `admin/game/get-game-list?limit=10&&page=1&&status=1`;
  }

  if (status === 0) {
    url = `admin/game/get-game-list?limit=10&&page=1&&status=0`;
  }
  if (status === 0 && search) {
    url = `admin/game/get-game-list?limit=10&&page=1&&search=${search}&&status=0`;
  }

  if (status === 1 && search) {
    url = `admin/game/get-game-list?limit=10&&page=1&&search=${search}&&status=1`;
  }
  if (page || limit) {
    dispatch({
      type: "SET_GAMES",
      payload: null,
    });
  }

  const data = await Api(url);
  if (data) {
    dispatch({
      type: "SET_GAME_PAGE_COUNT",
      payload: JSON.parse(data.request.response)["parameter"]["last_page"],
    });

    dispatch({
      type: "SET_GAME_COUNT",
      payload: JSON.parse(data.request.response)["parameter"]["total"],
    });
    dispatch({
      type: "SET_GAMES",
      payload: data.data.data,
    });
  }
};

const fetchLinkableItems = (dispatch) => async () => {
  try {
    const data = await Api("admin/item/get-linkable-items");
    dispatch({
      type: "SET_LINKABLE_ITEMS",
      payload: data.data.data,
    });
  } catch (e) {}
};

const fetchUsers = (dispatch) => async (page, limit, search, status) => {
  var url;
  if (page) {
    url = `admin/user/list?page=${page}&&limit=10`;
  } else {
    url = `admin/user/list?limit=10`;
  }
  if (search) {
    url = `admin/user/list?limit=10&&page=1&&search=${search}`;
  }
  if (status === 1) {
    url = `admin/user/list?limit=10&&page=1&&status=1`;
  }

  if (status === 0) {
    url = `admin/user/list?limit=10&&page=1&&status=0`;
  }

  if (status === 0 && search) {
    url = `admin/user/list?limit=10&&page=1&&search=${search}&&status=0`;
  }

  if (status === 1 && search) {
    url = `admin/user/list?limit=10&&page=1&&search=${search}&&status=1`;
  }
  const data = await Api(url);
  if (data) {
    dispatch({
      type: "SET_USERS_COUNT",
      payload: JSON.parse(data.request.response)["parameter"]["total"],
    });
    dispatch({
      type: "SET_USERS",
      payload: data.data.data,
    });
  }
};

const fetchUser = (dispatch) => async (id) => {
  dispatch({
    type: "SET_USER_PROFILE",
    payload: null,
  });
  await Api.post(`admin/user/getuser`, {
    user_id: id,
  })
    .then((data) => {
      dispatch({
        type: "SET_USER_PROFILE",
        payload: data.data.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: "SET_USER_PROFILE",
        payload: null,
      });
    });
};

const fetchGameSubCategoryList = (dispatch) => async () => {
  try {
    const data = await Api("admin/game/sub-category-list");
    return data.data.data;
  } catch (e) {}
};

const togglePackage = (dispatch) => async (id, action) => {
  clearMessage();
  const x = {
    packages: [id],
    action_type: +action,
  };
  try {
    await Api.post(`admin/game/package-block-unblock`, {
      ...x,
    }).then(async (data) => {});

    dispatch({
      type: "SET_MESSAGE",
      payload: "Package Updated Successfully",
    });

    await fetchGamePackages();
  } catch (e) {}
};

const toggleItemStatus = (dispatch) => async (id, action) => {
  const x = {
    items: [id],
    action_type: action,
  };
  clearMessage();

  await Api.post(`admin/item/block-unblock`, { ...x }).then(async (data) => {});

  dispatch({
    type: "SET_MESSAGE",
    payload: "Item Updated Successfully",
  });

  await fetchItems();
};

const toggleGameStatus = (dispatch) => async (id, action) => {
  const x = {
    games: [id],
    action_type: action,
  };
  clearMessage();

  await Api.post(`admin/game/block-unblock`, { ...x }).then(async (data) => {});

  dispatch({
    type: "SET_MESSAGE",
    payload: "Game Updated Successfully",
  });

  await fetchGames();
};

const clearMessage = (dispatch) => async () => {
  dispatch({
    type: "SET_MESSAGE",
    payload: null,
  });
};

const toggleUserStatus = (dispatch) => async (id, action) => {
  const x = {
    users: [id],
    action_type: action,
  };
  clearMessage();
  await Api.post(`admin/user/block-unblock`, { ...x }).then(async (data) => {});
  dispatch({
    type: "SET_MESSAGE",
    payload: "User Updated Successfully",
  });
  await fetchUsers();
};

const fetchItem = (dispatch) => async (id) => {
  dispatch({
    type: "SET_ITEM",
    payload: null,
  });
  try {
    const data1 = await Api(`admin/item/getitem?item_id=${id}`);
    dispatch({
      type: "SET_ITEM",
      payload: data1.data.data,
    });
    const {
      data: { data },
    } = await Api.post(`admin/subcategory/subcategory-by-id`, {
      sub_category_id: data1.data.data.sub_category_id,
    });
    dispatch({
      type: "SET_SUB_CATEGORY",
      payload: data,
    });
  } catch (e) {}
};

const fetchGame = (dispatch) => async (id) => {
  dispatch({
    type: "SET_GAME",
    payload: null,
  });
  await Api(`admin/game/getgame?game_id=${id}`)
    .then((data) => {
      dispatch({
        type: "SET_GAME",
        payload: data.data.data,
      });
    })
    .catch((e) => {});
};

const fetchSubCategory = (dispatch) => async (id) => {
  try {
    const {
      data: { data },
    } = await Api.post(`admin/subcategory/subcategory-by-id`, {
      sub_category_id: id,
    });
    dispatch({
      type: "SET_SUB_CATEGORY",
      payload: data,
    });
  } catch (e) {}
};

const editItem = (dispatch) => async (data) => {
  var image;
  dispatch({
    type: "SET_MESSAGE",
    payload: null,
  });
  if (data.newImage) {
    image = await uploadImage("media", data.newImage);
    await Api.post("admin/item/add", {
      category_id: data.category_id,
      sub_category_id: data.sub_category_id,
      brand_id: data.brand_id,
      name_en: data.name_en,
      name_ar: data.name_ar,
      description_en: data.description_en,
      description_ar: data.description_ar,
      link_item_id: data.link_item_id,
      image: image,
      price: data.price,
      status: data.status,
    });
  } else {
    image = data.image;
    await Api.post("admin/item/add", {
      category_id: data.category_id,
      sub_category_id: data.sub_category_id,
      brand_id: data.brand_id,
      name_en: data.name_en,
      name_ar: data.name_ar,
      description_en: data.description_en,
      description_ar: data.description_ar,
      link_item_id: data.link_item_id,
      image: image,
      price: data.price,
      status: data.status,
    });
  }
  dispatch({
    type: "SET_MESSAGE",
    payload: "Item Updated Successfully",
  });
  await fetchItems();
};

const addItem = (dispatch) => async (data) => {
  await uploadImage("media", data.image)
    .then(async (data1) => {
      if (data.link_item_id && data.link_item_id.length > 0) {
        if (data.item_custom_values && data.item_custom_values.length > 0) {
          await Api.post("admin/item/add", {
            category_id: data.category_id,
            sub_category_id: data.sub_category_id,
            brand_id: data.brand_id,
            name_en: data.name_en,
            name_ar: data.name_ar,
            description_en: data.description_en,
            description_ar: data.description_ar,
            item_custom_values: data.item_custom_values,
            link_item_id: data.link_item_id,
            image: data1,
            price: data.price,
            status: data.status,
          })
            .then(async (data) => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "Item Added Successfully",
              });
              await fetchItems();
            })
            .catch((error) => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "Some error occurred while adding new item",
              });
            });
        } else {
          await Api.post("admin/item/add", {
            category_id: data.category_id,
            sub_category_id: data.sub_category_id,
            brand_id: data.brand_id,
            name_en: data.name_en,
            name_ar: data.name_ar,
            description_en: data.description_en,
            description_ar: data.description_ar,
            link_item_id: data.link_item_id,
            image: data1 && data1.location.split("com/")[1],
            price: data.price,
            status: data.status,
          })
            .then(async (data) => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "Item Added Successfully",
              });
              await fetchItems();
            })
            .catch((error) => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "Some error occurred while adding new item",
              });
            });
        }
      } else {
        if (data.item_custom_values && data.item_custom_values.length > 0) {
          await Api.post("admin/item/add", {
            category_id: data.category_id,
            sub_category_id: data.sub_category_id,
            brand_id: data.brand_id,
            name_en: data.name_en,
            name_ar: data.name_ar,
            description_en: data.description_en,
            description_ar: data.description_ar,
            item_custom_values: data.item_custom_values,
            image: data1 && data1.location.split("com/")[1],
            price: data.price,
            status: data.status,
          })
            .then(async (data) => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "Item Added Successfully",
              });
              await fetchItems();
            })
            .catch((error) => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "Some error occurred while adding new item",
              });
            });
        } else {
          await Api.post("admin/item/add", {
            category_id: data.category_id,
            sub_category_id: data.sub_category_id,
            brand_id: data.brand_id,
            name_en: data.name_en,
            name_ar: data.name_ar,
            description_en: data.description_en,
            description_ar: data.description_ar,
            image: data1 && data1.location.split("com/")[1],
            price: data.price,
            status: data.status,
          })
            .then(async (data) => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "Item Added Successfully",
              });
              await fetchItems();
            })
            .catch((error) => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "Some error occurred while adding new item",
              });
            });
        }
      }
    })
    .catch((err) => console.error(err));
};

const fetchResolutions = (dispatch) => () => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { data },
      } = await Api("admin/game/resolution-list");
      dispatch({
        type: "SET_RESOLUTION_LIST",
        payload: data,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const uploadImage = async (bucket, file) => {
  const config = {
    bucketName: "lootbox-s3",
    region: "us-east-2",
    dirName: bucket,
    accessKeyId: "AKIA3JWMPNMIYUFSR54M",
    secretAccessKey: "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",
  };
  const ReactS3Client = new S3(config);
  const data1 = await ReactS3Client.uploadFile(file);
  return data1.key;
};

const addPackage = (dispatch) => async (data) => {
  var image;
  var cover_images = [];
  image = await uploadImage("game/package", data.image);
  cover_images = await Promise.all(
    data.cover_images.map(async (x) => {
      try {
        var image1 = await uploadImage("game/package", x.file);
        return image1;
      } catch (err) {}
    })
  );
  try {
    const x = await Api.post("admin/game/add-package", {
      ...data,
      cover_images,
      image,
    });
  } catch (e) {}
};

const editPackage = (dispatch) => async (data) => {
  await Promise.all(
    data.deleted_cover_images.map(async (x) => {
      try {
        await Api.post("admin/game/package-delete-image", {
          image_id: x,
        });
      } catch (e) {}
    })
  );

  var image;
  var new_cover_images = [];

  if (data.newImgFile) {
    image = await uploadImage("game/package", data.newImgFile);
  } else image = data && data.image.split("com/")[1];

  new_cover_images = await Promise.all(
    data.new_cover_images.map(async (x) => {
      try {
        var image1 = await uploadImage("game/package", x.file);
        return image1;
      } catch (err) {}
    })
  );

  try {
    const x = await Api.post("admin/game/add-package", {
      image,
      game_id: data.game_id,
      package_id: data.package_id,
      name_en: data.name_en,
      name_ar: data.name_ar,
      graphic_quality: data.graphic_quality,
      status: data.status,
      package_item: data.package_item,
      cover_images: [...data.cover_images, ...new_cover_images],
    });
  } catch (e) {}
};

const addGame = (dispatch) => async (data) => {
  if (data.imgFile) {
    if (data.game_id) {
      const image = await uploadImage("games", data.imgFile);
      await Api.post("admin/game/add", {
        name_en: data.name_en,
        name_ar: data.name_ar,
        resolution: data.value,
        image,
        game_id: data.game_id,
        status: data.status ? data.status : 1,
      }).then((data) => {});
    } else {
      const image = await uploadImage("games", data.imgFile);
      await Api.post("admin/game/add", {
        name_en: data.name_en,
        name_ar: data.name_ar,
        resolution: data.value,
        image,
        status: data.status ? data.status : 1,
      }).then((data) => {});
    }
  } else {
    if (data.game_id) {
      await Api.post("admin/game/add", {
        name_en: data.name_en,
        name_ar: data.name_ar,
        resolution: data.value,
        game_id: data.game_id,
        image: data.file,
        status: data.status ? data.status : 1,
      });
    } else {
      await Api.post("admin/game/add", {
        name_en: data.name_en,
        name_ar: data.name_ar,
        resolution: data.value,
        image: data.file,
        status: data.status ? data.status : 1,
      });
    }
  }
  await fetchGames();
};

const fetchGamePackages = (dispatch) => async (id) => {
  try {
    const {
      data: { data },
    } = await Api(`admin/game/game-package-list?game_id=${id}`);

    dispatch({
      type: "SET_GAME_PACKAGES",
      payload: data,
    });
  } catch (e) {}
};

const fetchPackage = (dispatch) => async (id) => {
  try {
    const {
      data: { data },
    } = await Api(`admin/game/get-package?package_id=${id}`);

    const package_items = await Promise.all(
      data.package_items.map(async (i, k) => {
        try {
          const subcategory = await Api.post(
            `admin/subcategory/subcategory-by-id`,
            { sub_category_id: i.sub_category_id }
          );

          const item = await Api(`admin/item/getitem?item_id=${i.item_id}`);

          return {
            sub_category:
              subcategory.data.data.sub_category_id +
              "###" +
              subcategory.data.data.name_en,
            item: item.data.data.item_id + "###" + item.data.data.name_ar,
          };
        } catch (e) {}
      })
    );

    dispatch({
      type: "SET_PACKAGE",
      payload: { ...data, package_items },
    });
  } catch (e) {}
};

const fetchBanners = (dispatch) => async () => {
  try {
    const {
      data: { data },
    } = await Api("admin/banner/get-list");
    dispatch({
      type: "SET_BANNERS",
      payload: data,
    });
  } catch (e) {}
};

const editBanner = (dispatch) => async (data) => {
  try {
    dispatch({
      type: "SET_MESSAGE",
      payload: null,
    });
    var image = null;
    if (data.imgFile) {
      image = await uploadImage("banners", data.imgFile);
    } else {
      image = data.image;
    }
    await Api.post("admin/banner/store", {
      banner_id: data.banner_id,
      title_en: data.title_en,
      title_ar: data.title_ar,
      image: image,
      status: 1,
    });
    await fetchBanners();
    dispatch({
      type: "SET_MESSAGE",
      payload: "Banner Added Successfully",
    });
  } catch (e) {}
};

const addBanner = (dispatch) => async (data) => {
  try {
    dispatch({
      type: "SET_MESSAGE",
      payload: null,
    });
    var image = null;
    image = await uploadImage("banners", data.image);
    await Api.post("admin/banner/store", {
      ...data,
      image: image,
    });
    await fetchBanners();
    dispatch({
      type: "SET_MESSAGE",
      payload: "Banner Added Successfully",
    });
  } catch (e) {}
};

const fetchBannerDetails = (dispatch) => async (id) => {
  const {
    data: { data },
  } = await Api(`admin/banner/get-banner?banner_id=${id}`);

  dispatch({
    type: "SET_BANNER_DETAILS",
    payload: data,
  });
};

const toggleBannerStatus = (dispatch) => async (id, action) => {
  try {
    dispatch({
      type: "SET_MESSAGE",
      payload: null,
    });
    await Api.post("admin/banner/block-unblock", {
      banners: [id],
      action_type: action,
    });
    await fetchBanners();
    dispatch({
      type: "SET_MESSAGE",
      payload: "Banner Updated Successfully",
    });
  } catch (e) {}
};

const fetchLabels = (dispatch) => async () => {
  const {
    data: { data: {data} },
  } = await Api("admin/lable/list");
  dispatch({
    type: "SET_LABELS",
    payload: data,
  });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    fetchItems,
    addItem,
    fetchLabels,
    toggleItemStatus,
    fetchUser,
    toggleBannerStatus,
    fetchUsers,
    fetchBanners,
    fetchItem,
    fetchBannerDetails,
    toggleUserStatus,
    clearMessage,
    fetchResolutions,
    fetchGames,
    fetchPackage,
    addPackage,
    editPackage,
    addGame,
    addBanner,
    editBanner,
    editItem,
    fetchGame,
    togglePackage,
    toggleGameStatus,
    fetchGamePackages,
    fetchGameSubCategoryList,
    fetchLinkableItems,
    fetchSubCategory,
  },
  {
    items: [],
    items_count: 0,
    page_count: 0,
    message: null,
    user_profile: null,
    item_details: null,
    game_details: null,
    users: [],
    games: [],
    labels: [],
    banner_details: null,
    package_details: null,
    game_packages: [],
    game_package_items: [],
    user_count: 0,
    sub_category: null,
    game_count: 0,
    game_page_count: 0,
    resolution_list: null,
    linkableItems: [],
    banners: [],
  }
);
