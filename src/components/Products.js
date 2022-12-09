import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProductsData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredList(data);
      });
  };
  

  useEffect(() => {
    fetchProductsData();
  }, []);

  //modal
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const Modal = () => (
    <Dialog
      open={showModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{activeObject.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <img
            style={{ maxWidth: "50%", maxHeight: "calc(100vh - 64px)" }}
            src={activeObject.image}
            alt="image"
          />
          <br></br> <br></br>
          Description: {activeObject.description} <br></br> <br></br>
          Price: {activeObject.price} € <br></br>
          <br></br>
          Category: {activeObject.category}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  //filtru
  const [filteredList, setFilteredList] = new useState(products);

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...products];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  return (
    <div className="App">
      <div className="search-header">
        <div className="search-text">Search:</div>
        <TextField
          id="outlined-basic"
          variant="standard"
          onChange={filterBySearch}
        />
      </div>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 20 }}
      >
        {filteredList.map((product) => (
          <Grid key={product.id} item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                image={product.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="h6"></Typography>
              </CardContent>
              <CardActions>
                <div>
                  <Button
                    size="small"
                    onClick={() => {
                      setActiveObject(product);
                      setShowModal(true);
                    }}
                  >
                    Details
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {showModal ? <Modal object={activeObject} /> : null}
    </div>
  );
};

export default Products;
