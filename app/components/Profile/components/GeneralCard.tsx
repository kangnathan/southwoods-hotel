// import { Card } from "../../_common/Card"
// import { TextField } from "@mui/material"

// export const GeneralCard = () => {
//   return (
//     <>
//       <Card>
//         <Card.Header title={"General"}>
//           <Card.Content>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <TextField
//                 label="Name"
//                 fullWidth
//                 sx={{ mb: 2 }}
//                 error={!!errors.number}
//                 helperText={errors.number?.message}
//                 {...register("number")}
//               />

//               <TextField
//                 label="Email"
//                 fullWidth
//                 sx={{ mb: 2 }}
//                 error={!!errors.name}
//                 helperText={errors.name?.message}
//                 {...register("name")}
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 disabled={isLoading}
//               >
//                 {mode === "create" ? "Create Room" : "Update Room"}
//               </Button>
//             </form>
//           </Card.Content>
//         </Card.Header>
//       </Card>
//     </>
//   )
// }
