import dev from "./dev";
import prod from "./prod";

const baseUrl = (function getBaseUrl() {
   switch (process.env.NODE_ENV) {
      case "development":
         return dev;
      case "production":
         return prod;
      default:
         return dev;
   }
})();
export default { baseUrl };
