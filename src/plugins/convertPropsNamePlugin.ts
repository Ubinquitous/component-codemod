import { type SourceFile, SyntaxKind } from "ts-morph";
import { ConvertPropsType } from "./types";

interface ConvertPropsNamePluginPropsType {
  componentName: string;
  target: Array<ConvertPropsType>;
}

export const convertPropsNamePlugin =
  ({ target, componentName }: ConvertPropsNamePluginPropsType) =>
  (sourceFile: SourceFile) => {
    const { Identifier } = SyntaxKind;
    const descendantsOfKind = sourceFile.getDescendantsOfKind(Identifier);

    descendantsOfKind.forEach((identifier) => {
      if (identifier.getText() === componentName) {
        const parent = identifier.getParent();

        if (
          parent?.isKind(SyntaxKind.JsxOpeningElement) ||
          parent?.isKind(SyntaxKind.JsxSelfClosingElement)
        ) {
          parent.getAttributes().forEach((attr) => {
            const props = attr.getText();
            const [propsName] = props.split("=");
            target.forEach(({ before, after }) => {
              if (before === propsName) {
                if (after === "") attr.remove();
                else attr.getNodeProperty("name")?.replaceWithText(after);
              }
            });
          });
        }
      }
    });
  };
