import React, { useContext, useState } from "react";
import {
  Backdrop,
  Paper,
  Box,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Clear } from "@material-ui/icons";
import { Context as DataContext } from "../../../../api/dataProvider";
import moment from "moment";
import OrderUsersTable from "./orderUsersTable";

const ViewOrderPopup = ({ open, setOpen, classes }) => {
  const { register, handleSubmit, reset } = useForm();
  const {
    state: { order_details, cart_items },
  } = useContext(DataContext);
  const onSubmit = () => {};

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Paper
        style={{
          position: "absolute",
          top: "7vh",
          maxHeight: "80vh",
          overflowY: "scroll",
          width: "70vw",
          minHeight: "80vh",
          padding: "2rem",
        }}
      >
        {order_details && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="row-reverse">
              <IconButton
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                <Clear />
              </IconButton>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Username :
              </p>
              <TextField
                variant="outlined"
                inputRef={register()}
                value={order_details.user_name}
                disabled
                name="name"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Email :
              </p>
              <TextField
                type="email"
                value={order_details.email}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Phone :
              </p>
              <TextField
                type="email"
                value={order_details.phone}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Payment Type :
              </p>
              <TextField
                type="email"
                value={order_details.payment_type_text}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Coupon Code :
              </p>
              <TextField
                type="email"
                value={
                  order_details.coupon_code ? order_details.coupon_code : ""
                }
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Items Count :
              </p>
              <TextField
                type="email"
                value={order_details.items_count}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Items Quantity :
              </p>
              <TextField
                type="email"
                value={order_details.items_qty}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Sub Total :
              </p>
              <TextField
                type="email"
                value={order_details.sub_total}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Discount :
              </p>
              <TextField
                type="email"
                value={order_details.discount_amount}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Delivery Charge :
              </p>
              <TextField
                type="email"
                value={order_details.delivery_charge}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Grand Total :
              </p>
              <TextField
                type="email"
                value={order_details.grand_total}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Payment Status :
              </p>
              <Select
                disabled
                style={{ width: "47%" }}
                defaultValue={order_details && order_details.payment_status}
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Success"}>Success</MenuItem>
                <MenuItem value={"Failed"}>Failed</MenuItem>
              </Select>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Order Status :
              </p>
              <Select
                disabled
                style={{ width: "47%" }}
                defaultValue={order_details && +order_details.order_status}
              >
                <MenuItem value={0}>Pending</MenuItem>
                <MenuItem value={1}>Confirmed</MenuItem>
                <MenuItem value={2}>On the way</MenuItem>
                <MenuItem value={3}>Success</MenuItem>
              </Select>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ margin: "1rem 0" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  fontWeight: 600,
                }}
              >
                Order Date :
              </p>
              <TextField
                type="email"
                value={moment(new Date(order_details.order_date)).format(
                  "DD-MM-YYYY"
                )}
                disabled
                variant="outlined"
                style={{ width: "47%" }}
              />
            </Box>
            {order_details.order_items && order_details.order_items.length > 0 && (
              <Box>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    fontWeight: 600,
                    textAlign: "center",
                    margin: "2rem 0",
                  }}
                >
                  Order Items :
                </p>
                <OrderUsersTable data={order_details.order_items} />
              </Box>
            )}

            {order_details.order_address && (
              <p
                style={{
                  fontSize: "1rem",
                  color: "#282b3c",
                  textAlign: "center",
                  margin: "2rem 0",
                  fontWeight: 600,
                }}
              >
                Order Address :
              </p>
            )}

            {order_details.order_user && (
              <Box>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#282b3c",
                    textAlign: "center",
                    margin: "2rem 0",
                    fontWeight: 600,
                  }}
                >
                  Order User :
                </p>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                        fontWeight: 600,
                      }}
                    >
                      First Name :
                    </p>
                    <TextField
                      variant="outlined"
                      disabled
                      style={{ width: "94%" }}
                      value={order_details.order_user.first_name}
                    />
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                        fontWeight: 600,
                      }}
                    >
                      Last Name :
                    </p>
                    <TextField
                      variant="outlined"
                      disabled
                      style={{ width: "94%" }}
                      value={order_details.order_user.last_name}
                    />
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                      }}
                    >
                      Full Name :
                    </p>
                    <TextField
                      style={{ width: "94%" }}
                      variant="outlined"
                      disabled
                      value={order_details.order_user.full_name}
                    />
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                        fontWeight: 600,
                      }}
                    >
                      Email :
                    </p>
                    <TextField
                      style={{ width: "94%" }}
                      variant="outlined"
                      disabled
                      value={order_details.order_user.email}
                    />
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                        fontWeight: 600,
                      }}
                    >
                      Phone :
                    </p>
                    <TextField
                      variant="outlined"
                      disabled
                      style={{ width: "94%" }}
                      value={order_details.order_user.phone}
                    />
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                        fontWeight: 600,
                      }}
                    >
                      Gender :
                    </p>
                    <TextField
                      variant="outlined"
                      disabled
                      style={{ width: "94%" }}
                      value={
                        order_details.order_user.gender === "1"
                          ? "Male"
                          : "Female"
                      }
                    />
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                        fontWeight: 600,
                      }}
                    >
                      Date Of Birth :
                    </p>
                    <TextField
                      style={{ width: "94%" }}
                      variant="outlined"
                      disabled
                      value={moment(
                        new Date(order_details.order_user.date_of_birth)
                      ).format("DD-MM-YYYY")}
                    />
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                        fontWeight: 600,
                      }}
                    >
                      Is Google Login :
                    </p>
                    <TextField
                      variant="outlined"
                      disabled
                      style={{ width: "94%" }}
                      value={
                        order_details.order_user.is_google_login === "0"
                          ? "No"
                          : "Yes"
                      }
                    />
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                        fontWeight: 600,
                      }}
                    >
                      Status :
                    </p>
                    <TextField
                      variant="outlined"
                      disabled
                      style={{ width: "94%" }}
                      value={
                        order_details.order_user.status === 0
                          ? "InActive"
                          : "Active"
                      }
                    />
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#282b3c",
                        margin: "1rem 0",
                        fontWeight: 600,
                      }}
                    >
                      Created At :
                    </p>
                    <TextField
                      variant="outlined"
                      disabled
                      style={{ width: "94%" }}
                      value={moment(
                        new Date(order_details.order_user.created_at)
                      ).format("DD-MM-YYYY")}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </form>
        )}
      </Paper>
    </Backdrop>
  );
};

export default ViewOrderPopup;
