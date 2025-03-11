import { type SourceFile } from "ts-morph";
import { ConvertPropsType } from "./types";

interface ConvertImportNamePluginPropsType extends ConvertPropsType {
  importPath: string;
}

export const convertImportNamePlugin =
  ({ importPath, before, after }: ConvertImportNamePluginPropsType) =>
  (sourceFile: SourceFile) => {
    const importDeclarationList = sourceFile.getImportDeclarations();

    importDeclarationList.forEach((importDecl) => {
      const moduleSpecifierValue = importDecl.getModuleSpecifierValue();
      console.log(moduleSpecifierValue);
      if (
        moduleSpecifierValue === importPath &&
        importDecl.getDefaultImport()?.getText() === before
      ) {
        importDecl.setDefaultImport(after);
      }
    });
  };
