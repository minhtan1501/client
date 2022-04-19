import { Box } from "@material-ui/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import HistoryDetail from "./page/HistoryDetail";
import HistoryList from "./page/HistoryList";

function HistoryOder() {
  return (
    <Box pt={3}>
      <Routes>
        <Route path="/*" element={<HistoryList />} />
        <Route path=":historyId" element={<HistoryDetail />} />
      </Routes>
    </Box>
  );
}

export default HistoryOder;
