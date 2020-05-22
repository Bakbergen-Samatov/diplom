import axios from "axios";

const instance = axios.create();
instance.defaults.baseURL = "https://cupcake-builder.firebaseio.com";

export default instance;
