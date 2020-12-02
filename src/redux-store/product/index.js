const initialState = {
  list: [],
  currentProduct: {
    name: null,
    id: null,
    price: null
  },
  loading: false
};

const actionHandlers = {};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
