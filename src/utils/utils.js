// This is a utility file for the project

//From "2025-07-22T14:24:33.084Z", to "22 July 2025"

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};
