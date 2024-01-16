
const callCreate = shape({
  buttonId: string().isRequired(),
  pushType: string().isRequired(),
});

const callListDtoIn = shape({
  sortBy: string(),
  order: string(),
  pageIndex: integer(),
  pageSize: integer(),
});

const callUpdateDtoIn = shape({
  id: id().isRequired(),
  buttonId: string(),
  pushType: string(),
  date: date(),
  clientId: string(),
  answered: boolean(),
  answeredTime: date(),
  message: string()
});
