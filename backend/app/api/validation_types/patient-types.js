const patientListDtoInType = shape({
    sortBy: string(),
    order: string(),
    pageIndex: integer(),
    pageSize: integer(),
});

const patientGetDtoInType = shape({
    id: id().isRequired(),
});

const patientCreateDtoInType = shape({
    name: string(),
    buttonId: string(),
});