export default function ({ store, redirect, error }) {
    if (!store.state.token) {
      return redirect('/login')
    }
  }