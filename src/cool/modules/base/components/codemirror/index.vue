<template>
	<div class="cl-code">
		<codemirror
			ref="code"
			v-model="value2"
			:options="options2"
			:style="{
				height,
				width
			}"
		/>
	</div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import beautifyJs from "js-beautify";

import "codemirror/theme/cobalt.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/mode/javascript/javascript";

export default {
	name: "cl-codemirror",

	components: {
		codemirror
	},

	props: {
		value: String,
		height: String,
		width: String,
		options: Object
	},

	data() {
		return {
			value2: ""
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.value2 = val || "";
			}
		},
		value2(val) {
			this.$emit("input", val);
		}
	},

	computed: {
		options2() {
			return {
				mode: "javascript",
				theme: "ambiance",
				styleActiveLine: true,
				lineNumbers: true,
				lineWrapping: true,
				indentUnit: 4,
				...this.options
			};
		}
	},

	mounted() {
		this.$el.onkeydown = e => {
			let keyCode = e.keyCode || e.which || e.charCode;
			let altKey = e.altKey || e.metaKey;
			let shiftKey = e.shiftKey || e.metaKey;

			if (altKey && shiftKey && keyCode == 70) {
				this.setValue();
			}
		};

		this.setValue(this.value2);
	},

	methods: {
		setValue(val) {
			this.value2 = beautifyJs(val || this.value2);
		}
	}
};
</script>

<style lang="scss">
.cl-code {
	border-radius: 3px;
	border: 1px solid #dcdfe6;
	box-sizing: border-box;
	border-radius: 3px;
}

.CodeMirror {
	height: 100%;
}

.cm-s-ambiance * {
	font-family: "Consolas";
	font-size: 13px;
}

.cm-s-ambiance .cm-header {
	color: blue;
}

.cm-s-ambiance .cm-quote {
	color: #24c2c7;
}

.cm-s-ambiance .cm-keyword {
	color: #a626a4;
}

.cm-s-ambiance .cm-atom {
	color: #986801;
}

.cm-s-ambiance .cm-number {
	color: #986801;
}

.cm-s-ambiance .cm-def {
	color: #383a42;
}

.cm-s-ambiance .cm-variable {
	color: #4078f2;
}

.cm-s-ambiance .cm-variable-2 {
	color: #eed1b3;
}

.cm-s-ambiance .cm-variable-3,
.cm-s-ambiance .cm-type {
	color: #faded3;
}

.cm-s-ambiance .cm-property {
	color: #333333;
}

.cm-s-ambiance .cm-operator {
	color: #0184bc;
}

.cm-s-ambiance .cm-comment {
	color: #555;
	font-style: italic;
}

.cm-s-ambiance .cm-string {
	color: #50a14f;
}

.cm-s-ambiance .cm-string-2 {
	color: #9d937c;
}

.cm-s-ambiance .cm-meta {
	color: #d2a8a1;
}

.cm-s-ambiance .cm-qualifier {
	color: yellow;
}

.cm-s-ambiance .cm-builtin {
	color: #9999cc;
}

.cm-s-ambiance .cm-bracket {
	color: #24c2c7;
}

.cm-s-ambiance .cm-tag {
	color: #fee4ff;
}

.cm-s-ambiance .cm-attribute {
	color: #9b859d;
}

.cm-s-ambiance .cm-hr {
	color: pink;
}

.cm-s-ambiance .cm-link {
	color: #f4c20b;
}

.cm-s-ambiance .cm-special {
	color: #ff9d00;
}

.cm-s-ambiance .cm-error {
	color: #af2018;
}

.cm-s-ambiance .CodeMirror-matchingbracket {
	color: #0f0;
}

.cm-s-ambiance .CodeMirror-nonmatchingbracket {
	color: #f22;
}

.cm-s-ambiance div.CodeMirror-selected {
	background: rgba(0, 0, 0, 0.15);
}

.cm-s-ambiance.CodeMirror-focused div.CodeMirror-selected {
	background: rgba(0, 0, 0, 0.1);
}

.cm-s-ambiance .CodeMirror-line::selection,
.cm-s-ambiance .CodeMirror-line > span::selection,
.cm-s-ambiance .CodeMirror-line > span > span::selection {
	background: rgba(0, 0, 0, 0.1);
}

.cm-s-ambiance .CodeMirror-line::-moz-selection,
.cm-s-ambiance .CodeMirror-line > span::-moz-selection,
.cm-s-ambiance .CodeMirror-line > span > span::-moz-selection {
	background: rgba(0, 0, 0, 0.1);
}

/* Editor styling */
.cm-s-ambiance.CodeMirror {
	line-height: 1.4em;
	color: #383a42;
	background-color: #f7f7f7;
}

.cm-s-ambiance .CodeMirror-gutters {
	background: #f7f7f7;
}

.cm-s-ambiance .CodeMirror-linenumber {
	color: #666;
	padding: 0 5px;
}

.cm-s-ambiance .CodeMirror-guttermarker {
	color: #aaa;
}

.cm-s-ambiance .CodeMirror-guttermarker-subtle {
	color: #666;
}

.cm-s-ambiance .CodeMirror-cursor {
	border-left: 1px solid #999;
	margin-left: 2px;
}

.cm-s-ambiance .CodeMirror-activeline-background {
	background: none repeat scroll 0% 0% rgba(255, 255, 255, 0.031);
}
</style>
