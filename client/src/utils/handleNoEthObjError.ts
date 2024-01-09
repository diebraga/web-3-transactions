export const handleNoEthObjError = (error: unknown) => {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("An unexpected error occurred");
    alert("An unexpected error occurred");
  }
  throw new Error("No eth object");
};
