import DeleteIcon from "@mui/icons-material/Delete"
import ImportExportIcon from "@mui/icons-material/ImportExport"
import MoveUpIcon from "@mui/icons-material/MoveUp"
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import { Box, LinearProgress, Menu, MenuItem } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Search from "../Search"
import CancelIcon from "@mui/icons-material/Cancel"
import { FilterAlt } from "@mui/icons-material"
import { IconButton } from "../IconButton"
import { toast } from "../Toast"

const TableToolbar = ({
  isPageLoading,
  queryLoading,
  downloadParameters,
  download,
  setFiltersOpen,
  setDeleteManyModalOpen,
  setCancelManyModalOpen,
  showDelete = true,
  showCancel = true,
  process,
  sortingOptions,
}: {
  isPageLoading?: boolean
  queryLoading?: boolean
  downloadParameters?: Record<
    string,
    number | string | boolean | Date | undefined | null | number[]
  >
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  download?: (data: any) => void
  setFiltersOpen?: (open: boolean) => void
  setDeleteManyModalOpen?: (open: boolean) => void
  setCancelManyModalOpen?: (open: boolean) => void
  showDelete?: boolean
  showCancel?: boolean
  process?: () => void
  sortingOptions?: {
    label: string
    sortBy: string
    sortDirection: string
  }[]
  release?: () => void
}) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <>
      {queryLoading && <LinearProgress />}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          py: 2,
        }}
      >
        <Box sx={{ flex: "1 1 auto", minWidth: "200px" }}>
          <Search disabled={isPageLoading} sx={{ width: "100%" }} />
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {typeof download === "function" && (
            <IconButton
              disabled={isPageLoading}
              icon={<SaveAltIcon />}
              label={"Download"}
              onClick={() => {
                toast.info("Downloading. Please wait...")
                download(downloadParameters)
              }}
            />
          )}

          {typeof setFiltersOpen === "function" && (
            <IconButton
              disabled={isPageLoading}
              icon={<FilterAlt />}
              label={"Filter"}
              onClick={() => setFiltersOpen(true)}
            />
          )}

          {sortingOptions && sortingOptions.length > 0 && (
            <IconButton
              disabled={isPageLoading}
              icon={<ImportExportIcon />}
              label={"Sort"}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
          )}

          {typeof process === "function" && (
            <IconButton
              disabled={isPageLoading}
              icon={<MoveUpIcon />}
              label={"Process"}
              onClick={() => process()}
            />
          )}

          {typeof setCancelManyModalOpen === "function" && showCancel && (
            <IconButton
              disabled={!showDelete || isPageLoading}
              icon={<CancelIcon />}
              label={"Cancel"}
              onClick={() => setCancelManyModalOpen(true)}
            />
          )}

          {typeof setDeleteManyModalOpen === "function" && showDelete && (
            <IconButton
              disabled={!showDelete || isPageLoading}
              icon={<DeleteIcon />}
              label={"Delete"}
              onClick={() => setDeleteManyModalOpen(true)}
            />
          )}
        </Box>

        {sortingOptions && sortingOptions.length > 0 && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {sortingOptions?.map((sorting) => (
              <MenuItem
                key={sorting.label}
                onClick={() => {
                  const params = new URLSearchParams({
                    sortBy: sorting.sortBy,
                    sortDirection: sorting.sortDirection,
                  })

                  const newPath = `${
                    window.location.pathname
                  }?${params.toString()}`
                  router.push(newPath)
                  setAnchorEl(null)
                }}
              >
                {sorting.label}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Box>
    </>
  )
}

export default TableToolbar
