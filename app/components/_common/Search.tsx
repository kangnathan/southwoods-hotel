"use client"

import SearchIcon from "@mui/icons-material/Search"
import { Box, SxProps } from "@mui/material"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Search = ({
  helperText,
  disabled,
  sx,
}: {
  helperText?: string
  disabled?: boolean
  sx?: SxProps
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const querySearchText = searchParams.get("searchText") || ""

  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
    setSearchText(querySearchText)
  }, [querySearchText])

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("searchText", searchText)
    params.set("page", "0") // Reset page on new search
    router.push(`?${params.toString()}`)
  }

  return (
    <Box sx={sx}>
      <TextField
        sx={{ backgroundColor: "white", border: "none" }}
        variant={"outlined"}
        placeholder={"Search"}
        value={searchText}
        helperText={helperText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          },
          startAdornment: (
            <InputAdornment position={"start"}>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={handleSearch}
              disabled={disabled}
              sx={{ my: 1 }}
            >
              {"Search"}
            </Button>
          ),
        }}
      />
    </Box>
  )
}

export default Search
