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
  name: "arturo",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      styleTags({
        Word: t.variableName,
        Logical: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        null: t.null,
        Type: t.typeName,
        Char: t.character,
        "Integer Version": t.number,
        Floating: t.float,
        Color: t.atom,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        Escape: t.escape,
        Regex: t.regexp,
        "Literal SymbolLiteral": t.atom,
        Function: t.function(t.definition(t.variableName)),
        Key: t.function(t.propertyName),
        Symbol: t.atom,
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
