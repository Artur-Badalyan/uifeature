import { apiEndpoints } from "config";


export default {
    getItems: async () => {
        const options = { url: apiEndpoints.items };
        return get(options);
    },
}