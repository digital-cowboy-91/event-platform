const composeEventDateTime = (dateTime: Date) => {
  const date = new Date(dateTime).toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = new Date(dateTime).toLocaleTimeString("en-GB", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return date + " ∙ " + time;
};

export default composeEventDateTime;
