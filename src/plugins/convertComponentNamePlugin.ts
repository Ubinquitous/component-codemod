import { type SourceFile, SyntaxKind } from "ts-morph";
import { ConvertPropsType } from "./types";

export const convertComponentNamePlugin =
  ({ before, after }: ConvertPropsType) =>
  (sourceFile: SourceFile) => {
    const { Identifier } = SyntaxKind;
    const descendantsOfKind = sourceFile.getDescendantsOfKind(Identifier);

    descendantsOfKind.forEach((identifier) => {
      if (identifier.getText() === before) {
        const parent = identifier.getParent();
        const isJSXComponent =
          parent?.isKind(SyntaxKind.JsxOpeningElement) ||
          parent?.isKind(SyntaxKind.JsxSelfClosingElement);
        if (isJSXComponent) {
          identifier.replaceWithText(after);
        }
      }
    });
  };
