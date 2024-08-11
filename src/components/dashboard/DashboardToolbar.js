import { category, priority, status } from "@/utils/fixedValue";
import { ALL_PATHS } from "@/utils/path";
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function DashboardToolbar({
  filters,
  handleFilterChange,
  handleSearch,
}) {
  const router = useRouter();
  function handleViewOrUpdate() {
    router.push(ALL_PATHS.ticket);
  }

  return (
    <Stack direction={{xs:"column",md:"row"}} justifyContent={"space-between"} padding={1}>
      <Box>
        <Stack direction={{xs:"column",md:"row"}} alignItems="center" spacing={1}>
          <Box>
            <Typography>Search By Title</Typography>
            <TextField
              placeholder="Search tickets..."
              size="small"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              InputProps={{
                endAdornment: filters.search ? (
                  <>
                    <Button
                      onClick={() => {
                        handleSearch("close");
                      }}
                    >
                      <Icon icon="gridicons:cross" />
                    </Button>
                    <Button onClick={handleSearch}>
                      <Icon icon="ic:baseline-search" />
                    </Button>
                  </>
                ) : (
                  <Button>
                    <Icon icon="ic:baseline-search" />
                  </Button>
                ),
              }}
            />
          </Box>
          <Box>
            <Typography>Filter By Status</Typography>
            <Select
              value={filters.status || "select_status"}
              name="status"
              onChange={handleFilterChange}
              size="small"
            >
              <MenuItem value="select_status">
                Select Status
              </MenuItem>
              {status.map((el) => (
                <MenuItem value={el.value} key={el.label}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography>Filter By Priority</Typography>
            <Select
              value={filters.priority || "select_priority"}
              name="priority"
              onChange={handleFilterChange}
              size="small"
            >
              <MenuItem value="select_priority">
                Select Priority
              </MenuItem>
              {priority.map((el) => (
                <MenuItem value={el.value} key={el.label}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography>Filter By Category</Typography>
            <Select
              value={filters.category || "select_category"}
              name="category"
              onChange={handleFilterChange}
              size="small"
            >
              <MenuItem value="select_category">
                Select Category
              </MenuItem>
              {category.map((el) => (
                <MenuItem value={el.value} key={el.label}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>
      </Box>
        <Box>
          <Stack direction="row">
            <Box>
              <LoadingButton
                variant="contained"
                sx={{
                  backgroundColor: "#607D8B",
                }}
                onClick={handleViewOrUpdate}
              >
                Raise New Ticket
              </LoadingButton>
            </Box>
          </Stack>
        </Box>
    </Stack>
  );
}
