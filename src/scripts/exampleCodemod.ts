import { generateCodemod } from "../core/generateCodemod";
import { convertComponentNamePlugin } from "../plugins/convertComponentNamePlugin";
import { convertImportNamePlugin } from "../plugins/convertImportNamePlugin";
import { convertImportPathPlugin } from "../plugins/convertImportPathPlugin";
import { convertPropsNamePlugin } from "../plugins/convertPropsNamePlugin";

const { runCodemod } = generateCodemod({
  targetPath: "src/**",
  plugins: [
    convertImportPathPlugin({
      before: "@/components/v3/Legacy/Legacy",
      after: "@/components/v3/New/New",
    }),
    convertImportNamePlugin({
      importPath: "@/components/v3/New/New",
      before: "Legacy",
      after: "New",
    }),
    convertComponentNamePlugin({
      before: "Legacy",
      after: "New",
    }),
    convertPropsNamePlugin({
      componentName: "New",
      target: [{ before: "sssss", after: "prop2" }],
    }),
  ],
});

runCodemod();
