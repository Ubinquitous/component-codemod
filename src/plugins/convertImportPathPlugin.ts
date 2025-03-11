import { type SourceFile } from "ts-morph";
import { ConvertPropsType } from "./types";

export const convertImportPathPlugin =
  ({ before, after }: ConvertPropsType) =>
  (sourceFile: SourceFile) => {
    const importDeclarationList = sourceFile.getImportDeclarations();

    importDeclarationList.forEach((importDecl) => {
      const moduleSpecifierValue = importDecl.getModuleSpecifierValue();
      if (moduleSpecifierValue === before) {
        importDecl.setModuleSpecifier(after);
      }
    });
  };
