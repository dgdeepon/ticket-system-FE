import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DashboardToolbar from "./DashboardToolbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "@/redux/slicers/ticket";
import { Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { ALL_PATHS } from "@/utils/path";
import { formDateDDMMYYYY } from "@/utils/fixedValue";
import DeleteDialog from "../DeleteDialog";

const heading = [
  "Id",
  "Title",
  "Status",
  "Priority",
  "Category",
  "Created",
  "View/Edit",
  "Delete",
];

export default function DashboardTable() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [filters, setFilters] = React.useState({
    search: "",
    status: "",
    priority: "",
    assignedAgent: "",
    dateRange: {
      from: null,
      to: null,
    },
  });
  const [table, setTable] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  async function getTickets() {
    const response = await dispatch(getAllTickets());
    if (response?.status == 200) {
      setTable(response.data.tickets);
      setFilteredData(response.data.tickets);
    }
  }

  function handleFilterChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    if (e.target.name !== "search") {
      const isDefaultValue =
        e.target.value == "select_status" ||
        e.target.value == "select_priority" ||
        e.target.value == "select_category"
          ? true
          : false;
      setFilteredData(
        isDefaultValue
          ? table
          : table.filter(
              (el) =>
                el.status == e.target.value ||
                el.priority == e.target.value ||
                el.category == e.target.value
            )
      );
    }
  }

  function handleSearch({ key }) {
    if (key == "close") {
      setFilteredData(table);
      setFilters({ ...filters, search: "" });
    } else {
      setFilteredData(
        table.filter((el) =>
          el.title.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }
  }

  React.useEffect(() => {
    getTickets();
  }, []);

  return (
    <Box>
      <DashboardToolbar
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleSearch={(key) => handleSearch({ key })}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {heading.map((el) => (
                <TableCell key={el}>{el}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.length
              ? filteredData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">
                      <Typography>{row.title}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      {row.status.toUpperCase()}
                    </TableCell>
                    <TableCell align="left">
                      {row.priority.toUpperCase()}
                    </TableCell>
                    <TableCell align="left">
                      {row.category.toUpperCase()}
                    </TableCell>
                    <TableCell>{formDateDDMMYYYY(row.createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          router.push(ALL_PATHS.viewOrEdit(row.id));
                        }}
                      >
                        <Icon icon={"lucide:edit"} />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <DeleteDialog id={row.id} getTickets={getTickets} />
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
