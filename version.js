import packageJson from "./package.json";
// read version from package.json
const { version } = packageJson;
// export to be used in other files
export default version;
