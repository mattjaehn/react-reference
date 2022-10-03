

var {
  createEntityAdapter,
  createSlice,
  configureStore } = require('@reduxjs/toolkit')


const booksAdapter = createEntityAdapter({
  selectId: (book) => book.bookId,
  sortComparer: (a,b) => a.title.localeCompare(b.title),
})

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(),
  reducers: {

    booksAdded: booksAdapter.addOne,
    booksReceived(state, action) {
      booksAdapter.setAll(state, action.payload.books)
    },
  },
})

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  }
})

const booksSelectors = booksAdapter.getSelectors((state) => state.books)
module.exports.allBooks = booksSelectors.selectAll(store.getState())

module.exports.booksAdapter = booksAdapter
module.exports.booksSlice = booksSlice
module.exports.store = store
module.exports.booksSelectors = booksSelectors


const xx = () => {
  const { booksAdded } = booksSlice.actions

  store.dispatch(booksAdded({bookId: 2, title: 'whatever'}))
  store.dispatch(booksAdded({bookId: 4, title: 'whatever 2'}))
  store.dispatch(booksAdded({bookId: 5, title: 'whateve 3r'}))
  
  console.log(`booksAdapter ~> ${JSON.stringify(booksAdapter)}\n\nstore ~> ${JSON.stringify(store.getState())}\n\n`)

}


xx()

