import React from 'react'
import Box from "@material-ui/core/Box";

const Home = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{
          background: "#151628",
          width: "100%",
          height: "90vh",
        }}
      >
        <img
          className="animate__animated animate__zoomIn"
          src="https://cdn.pixabay.com/photo/2014/12/21/23/35/parcel-575623_960_720.png"
          style={{
            height: "10rem",
            width: "10rem",
          }}
          alt="img"
        />
        <div
          className="animate__animated animate__fadeIn"
          style={{ textAlign: "center" }}
        >
          <p
            style={{
              color: "#fff",
              fontSize: "2rem",
            }}
          >
            {/* Table */}
            Lootbox
          </p>
          <p
            style={{
              color: "#fff",
              opacity: 0.6,
              fontSize: "1rem",
            }}
          >
            lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
        </div>
      </Box>
    );
}

export default Home
