import createDataContext from "./createDataContext";
import Api from "../api";
import Cookie from "js-cookie";
import { uploadFile } from "react-s3";
// import S3 from "react-aws-s3";

// const config = {
//   // dirName: "media" /* optional */,
//   bucketName: "lootbox-s3",
//   region: "us-east-2",
//   accessKeyId: "AKIA3JWMPNMIYUFSR54M",
//   secretAccessKey: "SklpCNgMo4arYfrcDOvLaeFw6xbLxHizCtAQt0YF",
//   // s3Url: "https:/your-custom-s3-url.com/" /* optional */,
// };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
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
    default:
      return state;
  }
};

const fetchItems = (dispatch) => async (page, limit) => {
  var url;
  if (page && limit) {
    url = `admin/item/list?limit=${limit}&&page=${page}`;
  } else {
    url = "admin/item/list?limit=10";
  }

  if (page || limit) {
    dispatch({
      type: "SET_ITEMS",
      payload: null,
    });
  }

  await Api(url)
    .then((data) => {
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
    })
    .catch((error) => console.log(error));
};

const fetchUsers = (dispatch) => async (page) => {
  var url;
  if (page) {
    url = `admin/user/list?page=${page}&&limit=10`;
  } else {
    url = `admin/user/list?limit=10`;
  }
  if (page) {
    dispatch({
      type: "SET_USERS",
      payload: null,
    });
  }

  await Api(url).then((data) => {
    dispatch({
      type: "SET_USERS_COUNT",
      payload: JSON.parse(data.request.response)["parameter"]["total"],
    });
    dispatch({
      type: "SET_USERS",
      payload: data.data.data,
    });
  });
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

const toggleItemStatus = (dispatch) => async (id, action) => {
  const x = {
    items: [id],
    action_type: action,
  };

  await Api.post(`admin/item/block-unblock`, { ...x }).then(async (data) => {
    console.log(data);
    dispatch({
      type: "SET_MESSAGE",
      payload: "Item Updated Successfully",
    });
  });

  fetchItems();
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
  await Api.post(`admin/user/block-unblock`, { ...x }).then(async (data) => {
    console.log(data);
    dispatch({
      type: "SET_MESSAGE",
      payload: "User Updated Successfully",
    });
  });
  fetchUsers();
};

const fetchItem = (dispatch) => async (id) => {
  dispatch({
    type: "SET_ITEM",
    payload: null,
  });
  await Api(`admin/item/getitem?item_id=${id}`)
    .then((data) => {
      dispatch({
        type: "SET_ITEM",
        payload: data.data.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

const addItem = (dispatch) => async (data) => {



   

  //   data.image
// File {name: "bootsplash_logo@1,5x.png", lastModified: 1596235414323, lastModifiedDate: Sat Aug 01 2020 04:13:34 GMT+0530 (India Standard Time), webkitRelativePath: "", size: 28192, …}
// lastModified: 1596235414323
// lastModifiedDate: Sat Aug 01 2020 04:13:34 GMT+0530 (India Standard Time) {}
// name: "bootsplash_logo@1,5x.png"
// size: 28192
// type: "image/png"
// webkitRelativePath: ""

  const config = {
    bucketName: "lootbox-s3",
    region: "us-east-2",
    dirName: "media",
    accessKeyId: "AKIA3JWMPNMIYUFSR54M",
    secretAccessKey: "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",
  };
  uploadFile(data.image, config)
    .then((data) => console.log(data))
    .catch((err) => console.error(err));





  // const ReactS3Client = new S3(config);

  // ReactS3Client.uploadFile(data.image)
  //   .then((data) => console.log(data))
  //   .catch((err) => console.error(err));

  // await Api.post("admin/item/add", {
  //   category_id: data.category_id,
  //   sub_category_id: data.sub_category_id,
  //   brand_id: data.brand_id,
  //   name_en: data.name_en,
  //   name_ar: data.name_ar,
  //   description_en: data.description_en,
  //   description_ar: data.description_ar,
  //   item_custom_values: data.item_custom_values,
  //   image: data.image,
  //   price: data.price,
  //   status: data.status,
  // })
  //   .then(async (data) => {
  //     dispatch({
  //       type: "SET_MESSAGE",
  //       payload: "Item Added Successfully",
  //     });
  //     await fetchItems();
  //   })
  //   .catch((error) => {
  //     dispatch({
  //       type: "SET_MESSAGE",
  //       payload: "Some error occurred while adding new item",
  //     });
  //     console.log(error);
  //   });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    fetchItems,
    addItem,
    toggleItemStatus,
    fetchUser,
    fetchUsers,
    fetchItem,
    toggleUserStatus,
    clearMessage,
  },
  {
    items: [],
    items_count: 0,
    page_count: 0,
    message: null,
    user_profile: null,
    item_details: null,
    users: [],
    user_count: 0,
  }
);
