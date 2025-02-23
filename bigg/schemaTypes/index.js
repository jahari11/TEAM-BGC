import { createSchema } from "sanity";
import submissions from "./submissions";

export default createSchema({
    name: 'default',
    types: [submissions]
})