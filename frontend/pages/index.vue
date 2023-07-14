<script>
export default {
    middleware({ route, redirect, from }) {
    if(route.path == "/"){
     return redirect("/login")
    }
  },
    data() {
        return {

        }
    },
}
</script>