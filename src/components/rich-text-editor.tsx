"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
	Bold,
	Italic,
	UnderlineIcon,
	List,
	ListOrdered,
	LinkIcon,
	Heading2,
	Heading3,
	Undo,
	Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export function RichTextEditor({
	value,
	onChange,
	placeholder,
}: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
			Underline,
			Link.configure({
				openOnClick: false,
				validate: (href) => /^https?:\/\//.test(href),
			}),
			Placeholder.configure({
				placeholder: placeholder || "Start typing...",
			}),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	if (!editor) {
		return null;
	}

	const addLink = () => {
		const previousUrl = editor.getAttributes("link").href;
		const url = window.prompt("URL", previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}

		// update link
		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};

	return (
		<div className="border rounded-md overflow-hidden border-[#e4e2e0] focus-within:border-[#2557a7] focus-within:ring-1 focus-within:ring-[#2557a7]">
			<div className="flex flex-wrap gap-1 p-2 border-b bg-[#f9f9f9]">
				<div className="flex items-center gap-1 mr-2">
					<Toggle
						size="sm"
						pressed={editor.isActive("heading", { level: 2 })}
						onPressedChange={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						aria-label="Heading 2"
						className="rounded-md data-[state=on]:bg-[#f3f2f1] data-[state=on]:text-[#2557a7]"
					>
						<Heading2 className="h-4 w-4" />
					</Toggle>
					<Toggle
						size="sm"
						pressed={editor.isActive("heading", { level: 3 })}
						onPressedChange={() =>
							editor.chain().focus().toggleHeading({ level: 3 }).run()
						}
						aria-label="Heading 3"
						className="rounded-md data-[state=on]:bg-[#f3f2f1] data-[state=on]:text-[#2557a7]"
					>
						<Heading3 className="h-4 w-4" />
					</Toggle>
				</div>

				<div className="h-6 w-px bg-[#e4e2e0] mx-1" />

				<div className="flex items-center gap-1 mr-2">
					<Toggle
						size="sm"
						pressed={editor.isActive("bold")}
						onPressedChange={() => editor.chain().focus().toggleBold().run()}
						aria-label="Bold"
						className="rounded-md data-[state=on]:bg-[#f3f2f1] data-[state=on]:text-[#2557a7]"
					>
						<Bold className="h-4 w-4" />
					</Toggle>
					<Toggle
						size="sm"
						pressed={editor.isActive("italic")}
						onPressedChange={() => editor.chain().focus().toggleItalic().run()}
						aria-label="Italic"
						className="rounded-md data-[state=on]:bg-[#f3f2f1] data-[state=on]:text-[#2557a7]"
					>
						<Italic className="h-4 w-4" />
					</Toggle>
					<Toggle
						size="sm"
						pressed={editor.isActive("underline")}
						onPressedChange={() =>
							editor.chain().focus().toggleUnderline().run()
						}
						aria-label="Underline"
						className="rounded-md data-[state=on]:bg-[#f3f2f1] data-[state=on]:text-[#2557a7]"
					>
						<UnderlineIcon className="h-4 w-4" />
					</Toggle>
				</div>

				<div className="h-6 w-px bg-[#e4e2e0] mx-1" />

				<div className="flex items-center gap-1 mr-2">
					<Toggle
						size="sm"
						pressed={editor.isActive("bulletList")}
						onPressedChange={() =>
							editor.chain().focus().toggleBulletList().run()
						}
						aria-label="Bullet List"
						className="rounded-md data-[state=on]:bg-[#f3f2f1] data-[state=on]:text-[#2557a7]"
					>
						<List className="h-4 w-4" />
					</Toggle>
					<Toggle
						size="sm"
						pressed={editor.isActive("orderedList")}
						onPressedChange={() =>
							editor.chain().focus().toggleOrderedList().run()
						}
						aria-label="Ordered List"
						className="rounded-md data-[state=on]:bg-[#f3f2f1] data-[state=on]:text-[#2557a7]"
					>
						<ListOrdered className="h-4 w-4" />
					</Toggle>
				</div>

				<div className="h-6 w-px bg-[#e4e2e0] mx-1" />

				<div className="flex items-center gap-1 mr-2">
					<Toggle
						size="sm"
						pressed={editor.isActive("link")}
						onPressedChange={addLink}
						aria-label="Link"
						className="rounded-md data-[state=on]:bg-[#f3f2f1] data-[state=on]:text-[#2557a7]"
					>
						<LinkIcon className="h-4 w-4" />
					</Toggle>
				</div>

				<div className="ml-auto flex gap-1">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}
						aria-label="Undo"
						className="h-7 w-7 text-[#595959]"
					>
						<Undo className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().redo()}
						aria-label="Redo"
						className="h-7 w-7 text-[#595959]"
					>
						<Redo className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<div className="p-3 min-h-[200px] bg-white">
				<EditorContent
					editor={editor}
					className={cn(
						"prose max-w-none focus:outline-none",
						"prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg",
						"prose-p:my-2 prose-ul:my-2 prose-ol:my-2",
						"prose-li:my-0.5 prose-blockquote:my-2 prose-blockquote:border-l-[#2557a7]/50",
					)}
				/>
			</div>
		</div>
	);
}
