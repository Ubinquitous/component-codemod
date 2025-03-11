import { Project, SourceFile } from "ts-morph";

type CodemodPluginType = (sourceFile: SourceFile) => void;

interface GenerateCodemodType {
  targetPath: string;
  plugins: Array<CodemodPluginType>;
}

export const generateCodemod = ({
  targetPath,
  plugins,
}: GenerateCodemodType) => {
  const runCodemod = () => {
    const project = new Project({ tsConfigFilePath: "tsconfig.json" });
    const sourceFileList: Array<SourceFile> =
      project.getSourceFiles(targetPath);

    sourceFileList.forEach((sourceFile) => {
      plugins.forEach((plugin) => {
        plugin(sourceFile);
      });
      sourceFile.saveSync();
    });
  };
  return { runCodemod };
};
