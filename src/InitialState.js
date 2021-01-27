export const initialUserListState = {
  users: [],
  user: {},
  color: "red",
  active: false,
  activeEdit: false,
  count: 1,
  showLessButton: false,
};

export const initialUserState = {
  user: {
    name: "",
    surname: "",
    confirmPassword: {
      first: "",
      second: "",
    },
    phoneNumber: "",
    email: "",
  },
  error: {
    confirmPasswordFirst: [],
    email: [],
  },
};

export const initialUserOrderState = {
  userOrder: {
    number: "",
    description: "",
    comments: "",
    headquarters: "",
    package: {
      weight: "",
      width: "",
      height: "",
      length: "",
    },
    senderDetails: {
      name: "",
      surname: "",
      city: "",
      street: "",
      houseNumber: "",
      apartmentNumber: "",
      email: "",
      district: "",
      phoneNumber: "",
    },
    recipientDetails: {
      name: "",
      surname: "",
      city: "",
      street: "",
      houseNumber: "",
      apartmentNumber: "",
      email: "",
      district: "",
      phoneNumber: "",
    },
  },
  allHeadquarters: [],
  allDistrict: [],
  changeArrow: true,
  hrLine: true,
};

export const initialCourierrListState = {
  couriers: [],
  active: false,
  activeEdit: false,
  count: 1,
  showLessButton: false,
};

export const initialCourierEditState = {
  courier: {
    user: {
      id: "",
      name: "",
      surname: "",
      confirmPassword: {
        first: "",
        second: "",
      },
      phoneNumber: "",
      email: "",
    },
    district: "",
  },
  error: {
    confirmPasswordFirst: [],
    email: [],
  },
};
