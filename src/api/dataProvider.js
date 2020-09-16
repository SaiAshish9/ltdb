import createDataContext from "./createDataContext";
import Api from "../api";
import Cookie from "js-cookie";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "SET_ITEM_COUNT":
      return {
        ...state,
        items_count: action.payload,
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
      console.log(e);
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
    await fetchItems();
  });
};

const addItem = (dispatch) => async (data) => {
  await Api.post("admin/item/add", {
    category_id: data.category_id,
    sub_category_id: data.sub_category_id,
    brand_id: data.brand_id,
    name_en: data.name_en,
    name_ar: data.name_ar,
    description_en: data.description_en,
    description_ar: data.description_ar,
    item_custom_values: data.item_custom_values,
    image: data.image,
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
      console.log(error);
    });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    fetchItems,
    addItem,
    toggleItemStatus,
    fetchUser,
  },
  {
    items: [],
    items_count: 0,
    page_count: 0,
    message: null,
    user_profile: null,
  }
);
