import { createSchema } from "sanity";
import submissions from "./submissions";
import banner from "./banner";

export default createSchema({
    name: 'default',
    types: [submissions, banner]
})