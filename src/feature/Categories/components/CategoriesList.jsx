import { Box } from "@material-ui/core";
import React from "react";
import CategoriesItem from "./CategoriesItem";

function CategoriesList({ list, handleDeleteCategory, handleClickEdit }) {
  return (
    <Box>
      {list.map((item) => (
        <CategoriesItem
          item={item}
          key={item._id}
          handleDeleteCategory={handleDeleteCategory}
          handleClickEdit={handleClickEdit}
        />
      ))}
    </Box>
  );
}

CategoriesList.propTypes = {};

export default CategoriesList;
