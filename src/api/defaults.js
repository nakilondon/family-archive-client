const newDate = {
  year: 0,
  month: 0,
  day: 0,
};

const newListPerson = {
  id: 0,
  Label: "",
};

const newPerson = {
  id: 0,
  gender: "Male",
  preferredName: "",
  givenNames: "",
  surName: "",
  nickName: "",
  birth: newDate,
  placeOfBirth: "",
  status: "Living",
  death: newDate,
  placeOfDeath: "",
  portrait: "",
  note: "",
  spouses: [],
  parents: [],
  children: [],
};

module.exports = {
  newPerson,
  newDate,
  newListPerson,
};
