import Pagination from "@mui/material/Pagination";
import type { Pagination as PaginationType } from "../../models/pagination";
import { Box, Typography } from "@mui/material";

type Props = {
  meta: PaginationType;
  onPageChange: (page: number) => void;
};

export default function AppPagination({ meta, onPageChange }: Props) {
  const { totalPages, currentPage, pageSize, totalCount } = meta;
  const startItem = pageSize * (currentPage - 1) + 1;
  const endItem = Math.min(pageSize * currentPage, totalCount);

  return (
    <Box
      display="flex"
      justifyContent="end"
      alignItems="center"
      marginTop={3}
      gap={5}
    >
      <Typography>
        Displaying {startItem} - {endItem} of {totalCount} Items
      </Typography>
      <Pagination
        color="primary"
        size="large"
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
      />
    </Box>
  );
}
