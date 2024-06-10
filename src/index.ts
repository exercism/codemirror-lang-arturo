import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const arturoLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: "]", align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      styleTags({
        Word: t.variableName,
        Logical: t.bool,
        String: t.string,
        Comment: t.lineComment,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: ";" },
  },
});

export function arturo() {
  return new LanguageSupport(arturoLanguage);
}
