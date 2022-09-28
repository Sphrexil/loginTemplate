// @ts-ignore
import MakrdownIt from "markdown-it";
import MavonEditor from 'mavon-editor'
// @ts-ignore
import Md_Katex from '@iktakahiro/markdown-it-katex'

// import MarkdownItKatex from "markdown-it-katex";
import "github-markdown-css";
export function toHTML(s: string): string {
    console.log("66666666666666")
    let mk = MavonEditor.mavonEditor.getMarkdownIt()
    mk.use(Md_Katex);
    return mk.render(s);
}
